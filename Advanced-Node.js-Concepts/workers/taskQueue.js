const { Worker } = require("worker_threads");
const path = require("path");
const Job = require("../models/Job");

const CONCURRENCY_LIMIT = 2;
let activeWorkers = 0;
let isPolling = false;

const startQueue = () => {
    console.log("Background Task Queue Worker started polling...");
    // Poll every 5 seconds
    setInterval(pollJobs, 5000);
    // Run immediately on startup
    pollJobs();
};

const pollJobs = async () => {
    if (isPolling) return;
    if (activeWorkers >= CONCURRENCY_LIMIT) return;

    isPolling = true;

    try {
        const limit = CONCURRENCY_LIMIT - activeWorkers;
        if (limit <= 0) {
            isPolling = false;
            return;
        }

        // Fetch pending jobs whose scheduled time has arrived
        const jobs = await Job.find({
            status: "pending",
            runAt: { $lte: new Date() },
        })
            .sort({ createdAt: 1 })
            .limit(limit);

        for (const job of jobs) {
            activeWorkers++;
            job.status = "processing";
            job.attempts += 1;
            await job.save();

            console.log(`[Queue] Spawning worker for job: ${job.name} (ID: ${job._id})`);

            // Spawn worker thread
            const worker = new Worker(path.join(__dirname, "jobWorker.js"), {
                workerData: {
                    jobId: job._id.toString(),
                    name: job.name,
                    data: job.data,
                    mongoUri: process.env.MONGO_URI,
                },
            });

            worker.on("message", async (message) => {
                try {
                    const dbJob = await Job.findById(job._id);
                    if (!dbJob) return;

                    if (message.success) {
                        dbJob.status = "completed";
                        dbJob.error = null;
                        await dbJob.save();
                        console.log(`[Queue] Job completed successfully: ${dbJob.name} (ID: ${dbJob._id})`);
                    } else {
                        await handleFailure(dbJob, message.error || "Unknown worker error");
                    }
                } catch (err) {
                    console.error(`[Queue] Error updating completed job state: ${err.message}`);
                }
            });

            worker.on("error", async (error) => {
                console.error(`[Queue] Worker thread error for job ID ${job._id}:`, error);
                try {
                    const dbJob = await Job.findById(job._id);
                    if (dbJob) {
                        await handleFailure(dbJob, error.message || "Worker thread crashed");
                    }
                } catch (err) {
                    console.error(`[Queue] Error updating failed job state: ${err.message}`);
                }
            });

            worker.on("exit", (code) => {
                activeWorkers--;
                console.log(`[Queue] Worker thread exited with code ${code}. Active workers: ${activeWorkers}`);
                // Poll again immediately in case more slots are free
                isPolling = false;
                pollJobs();
            });
        }
    } catch (error) {
        console.error("[Queue] Error polling jobs:", error);
    } finally {
        isPolling = false;
    }
};

const handleFailure = async (job, errorMessage) => {
    job.error = errorMessage;
    if (job.attempts < job.maxAttempts) {
        job.status = "pending";
        // linear/exponential backoff: retry in 30 seconds
        job.runAt = new Date(Date.now() + 30000);
        console.log(`[Queue] Job failed: ${job.name} (ID: ${job._id}). Rescheduling in 30s. Attempts: ${job.attempts}/${job.maxAttempts}`);
    } else {
        job.status = "failed";
        console.log(`[Queue] Job permanently failed: ${job.name} (ID: ${job._id}). Max attempts reached.`);
    }
    await job.save();
};

module.exports = {
    startQueue,
    pollJobs,
};
