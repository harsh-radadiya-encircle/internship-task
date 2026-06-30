const fs = require("fs/promises");
const path = require("path");

// ==================== Utility Module ====================

// Filter array by a key-value pair
function filterByKey(data, key, value) {
    return data.filter(
        (item) => String(item[key]).toLowerCase() === String(value).toLowerCase()
    );
}

// Sort array by a given key
function sortByKey(data, key, order = "asc") {
    return [...data].sort((a, b) => {
        if (typeof a[key] === "number") {
            return order === "asc" ? a[key] - b[key] : b[key] - a[key];
        }
        return order === "asc"
            ? String(a[key]).localeCompare(String(b[key]))
            : String(b[key]).localeCompare(String(a[key]));
    });
}

// Get basic statistics from a numeric field
function getStats(data, key) {
    const values = data.map((item) => item[key]).filter((v) => typeof v === "number");
    if (values.length === 0) return null;

    const total = values.reduce((sum, v) => sum + v, 0);
    return {
        count: values.length,
        total: total,
        average: (total / values.length).toFixed(2),
        min: Math.min(...values),
        max: Math.max(...values),
    };
}

// ==================== Display Helpers ====================

function displayTable(data) {
    if (!Array.isArray(data) || data.length === 0) {
        console.log("  No records found.\n");
        return;
    }

    const keys = Object.keys(data[0]);

    // Calculate column widths
    const widths = {};
    keys.forEach((key) => {
        widths[key] = Math.max(
            key.length,
            ...data.map((row) => String(row[key]).length)
        );
    });

    // Header
    const header = keys.map((k) => k.toUpperCase().padEnd(widths[k])).join(" | ");
    const separator = keys.map((k) => "-".repeat(widths[k])).join("-+-");

    console.log(`  ${header}`);
    console.log(`  ${separator}`);

    // Rows
    data.forEach((row) => {
        const line = keys.map((k) => String(row[k]).padEnd(widths[k])).join(" | ");
        console.log(`  ${line}`);
    });
    console.log();
}

function displayStats(stats, label) {
    if (!stats) {
        console.log(`  No numeric data found for "${label}".\n`);
        return;
    }
    console.log(`  Count   : ${stats.count}`);
    console.log(`  Total   : ${stats.total}`);
    console.log(`  Average : ${stats.average}`);
    console.log(`  Min     : ${stats.min}`);
    console.log(`  Max     : ${stats.max}\n`);
}

// ==================== Async File Reader ====================

async function readJsonFile(filePath) {
    const fullPath = path.resolve(filePath);
    console.log(`\n  Reading "${path.basename(fullPath)}" asynchronously...`);

    const raw = await fs.readFile(fullPath, "utf8");
    const data = JSON.parse(raw);

    console.log(`  Successfully loaded ${data.length} records.\n`);
    return data;
}

// ==================== Command Handlers ====================

async function handleList(files) {
    for (const file of files) {
        const data = await readJsonFile(file);
        console.log(`========== ${path.basename(file).toUpperCase()} ==========`);
        displayTable(data);
    }
}

async function handleFilter(files, key, value) {
    for (const file of files) {
        const data = await readJsonFile(file);
        const filtered = filterByKey(data, key, value);

        console.log(`========== FILTER: ${key} = "${value}" in ${path.basename(file)} ==========`);
        console.log(`  Found ${filtered.length} out of ${data.length} records.\n`);
        displayTable(filtered);
    }
}

async function handleSort(files, key, order) {
    for (const file of files) {
        const data = await readJsonFile(file);
        const sorted = sortByKey(data, key, order);

        console.log(`========== SORT BY "${key}" (${order}) in ${path.basename(file)} ==========`);
        displayTable(sorted);
    }
}

async function handleStats(files, key) {
    for (const file of files) {
        const data = await readJsonFile(file);
        const stats = getStats(data, key);

        console.log(`========== STATS FOR "${key}" in ${path.basename(file)} ==========`);
        displayStats(stats, key);
    }
}

async function handleSearch(files, keyword) {
    for (const file of files) {
        const data = await readJsonFile(file);
        const results = data.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(keyword.toLowerCase())
            )
        );

        console.log(`========== SEARCH "${keyword}" in ${path.basename(file)} ==========`);
        console.log(`  Found ${results.length} matching records.\n`);
        displayTable(results);
    }
}

// ==================== Read Multiple Files with Promise.all ====================

async function handleMultiRead(files) {
    console.log(`\n  Reading ${files.length} files in parallel using Promise.all...\n`);

    const startTime = Date.now();

    const results = await Promise.all(
        files.map((file) => readJsonFile(file))
    );

    const elapsed = Date.now() - startTime;

    results.forEach((data, i) => {
        console.log(`========== ${path.basename(files[i]).toUpperCase()} ==========`);
        displayTable(data);
    });

    console.log(`  All files read in ${elapsed}ms (parallel async).\n`);
}

// ==================== Help ====================

function showHelp() {
    console.log(`
  ============================================
   JSON CLI App - Async Data Processor
  ============================================

  Usage:
    node app.js <command> <file(s)> [options]

  Commands:
    list    <file>             List all records from a JSON file
    filter  <file> <key> <val> Filter records where key = value
    sort    <file> <key> [asc|desc]  Sort records by a key
    stats   <file> <key>       Show statistics for a numeric field
    search  <file> <keyword>   Search for keyword across all fields
    multi   <file1> <file2>    Read multiple files in parallel

  Examples:
    node app.js list users.json
    node app.js filter users.json city Rajkot
    node app.js sort products.json price desc
    node app.js stats products.json price
    node app.js search users.json Harsh
    node app.js multi users.json products.json
`);
}

// ==================== Main ====================

async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        showHelp();
        return;
    }

    const command = args[0].toLowerCase();

    try {
        switch (command) {
            case "list":
                if (!args[1]) throw new Error("Please provide a JSON file.");
                await handleList([args[1]]);
                break;

            case "filter":
                if (!args[1] || !args[2] || !args[3])
                    throw new Error("Usage: filter <file> <key> <value>");
                await handleFilter([args[1]], args[2], args[3]);
                break;

            case "sort":
                if (!args[1] || !args[2])
                    throw new Error("Usage: sort <file> <key> [asc|desc]");
                await handleSort([args[1]], args[2], args[3] || "asc");
                break;

            case "stats":
                if (!args[1] || !args[2])
                    throw new Error("Usage: stats <file> <key>");
                await handleStats([args[1]], args[2]);
                break;

            case "search":
                if (!args[1] || !args[2])
                    throw new Error("Usage: search <file> <keyword>");
                await handleSearch([args[1]], args[2]);
                break;

            case "multi":
                const files = args.slice(1);
                if (files.length < 2)
                    throw new Error("Please provide at least 2 JSON files.");
                await handleMultiRead(files);
                break;

            default:
                console.log(`  Unknown command: "${command}"\n`);
                showHelp();
        }
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log(`\n  Error: File not found - "${error.path}"\n`);
        } else {
            console.log(`\n  Error: ${error.message}\n`);
        }
    }
}

main();