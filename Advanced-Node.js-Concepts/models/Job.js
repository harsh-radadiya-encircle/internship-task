const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Job name is required"],
        },
        data: {
            type: mongoose.Schema.Types.Mixed,
            required: [true, "Job data is required"],
        },
        status: {
            type: String,
            enum: ["pending", "processing", "completed", "failed"],
            default: "pending",
        },
        attempts: {
            type: Number,
            default: 0,
        },
        maxAttempts: {
            type: Number,
            default: 3,
        },
        error: {
            type: String,
        },
        runAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Index to quickly fetch jobs that are due for running
jobSchema.index({ status: 1, runAt: 1 });

module.exports = mongoose.model("Job", jobSchema);
