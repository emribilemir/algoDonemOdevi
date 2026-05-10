const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { solveKnapsack } = require("./knapsack");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files in production
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

// Load device data from JSON file
const dataPath = path.join(__dirname, "data.json");
const devices = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

/**
 * GET /api/devices
 * Returns all devices in the dataset.
 * Optional query params: category, minSustainability
 */
app.get("/api/devices", (req, res) => {
  let result = [...devices];

  // Filter by category if provided
  if (req.query.category) {
    const categories = req.query.category.split(",");
    result = result.filter((d) => categories.includes(d.category));
  }

  // Filter by minimum sustainability score
  if (req.query.minSustainability) {
    const minScore = parseInt(req.query.minSustainability, 10);
    result = result.filter((d) => d.sustainabilityScore >= minScore);
  }

  res.json({
    total: result.length,
    devices: result,
    categories: [...new Set(devices.map((d) => d.category))],
  });
});

/**
 * POST /api/optimize
 * Runs the knapsack algorithm with optional filters.
 *
 * Request body:
 *   - budget (required): Total budget in TL
 *   - minSustainability (optional): Minimum sustainability score filter (1-5)
 *   - categories (optional): Array of category strings to include
 *   - ecoMode (optional): Boolean — if true, only includes devices with score >= 4
 */
app.post("/api/optimize", (req, res) => {
  const { budget, minSustainability, categories, ecoMode } = req.body;

  // Validate budget
  if (!budget || typeof budget !== "number" || budget <= 0) {
    return res.status(400).json({
      error: "Geçerli bir bütçe değeri giriniz (pozitif sayı).",
    });
  }

  // Apply filters
  let filteredDevices = [...devices];

  // Eco mode: only devices with sustainability score >= 4
  if (ecoMode) {
    filteredDevices = filteredDevices.filter(
      (d) => d.sustainabilityScore >= 4
    );
  }

  // Filter by minimum sustainability score
  if (minSustainability && minSustainability > 0) {
    filteredDevices = filteredDevices.filter(
      (d) => d.sustainabilityScore >= minSustainability
    );
  }

  // Filter by categories
  if (categories && Array.isArray(categories) && categories.length > 0) {
    filteredDevices = filteredDevices.filter((d) =>
      categories.includes(d.category)
    );
  }

  // Run knapsack algorithm
  const result = solveKnapsack(filteredDevices, budget);

  res.json({
    ...result,
    budget,
    filtersApplied: {
      ecoMode: !!ecoMode,
      minSustainability: minSustainability || null,
      categories: categories || [],
    },
    totalDevicesConsidered: filteredDevices.length,
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Catch-all route to serve the frontend's index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(` Yeşil Şehir API sunucusu çalışıyor: http://localhost:${PORT}`);
  console.log(` ${devices.length} cihaz yüklendi.`);
});
