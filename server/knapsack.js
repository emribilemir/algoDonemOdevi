// 0-1 Knapsack Algorithm Implementation

const CO2_FACTOR = 0.42;    // kg CO₂ per kWh (Turkey average)
const TREE_CO2_ANNUAL = 22; // kg CO₂ absorbed per tree per year

/**
 * Calculates the objective value for a device.
 * @param {Object} device - Device with energySaving and sustainabilityScore
 * @returns {number} The objective value (energySaving × sustainabilityScore)
 */
function objectiveValue(device) {
  return device.energySaving * device.sustainabilityScore;
}

/**
 * Solves the 0-1 Knapsack problem using bottom-up dynamic programming.
 *
 * @param {Array} devices - Array of device objects
 * @param {number} budget - Total available budget (TL)
 * @returns {Object} Solution containing selected devices and summary metrics
 */
function solveKnapsack(devices, budget) {
  const n = devices.length;

  if (n === 0 || budget <= 0) {
    return {
      selectedDevices: [],
      totalCost: 0,
      totalEnergySaving: 0,
      totalSustainabilityScore: 0,
      objectiveValue: 0,
      co2Reduction: 0,
      treeEquivalent: 0,
      budgetUsed: 0,
      budgetRemaining: budget,
    };
  }

  const SCALE = 100;
  const scaledBudget = Math.floor(budget / SCALE);
  const scaledCosts = devices.map((d) => Math.ceil(d.cost / SCALE));

  const dp = Array.from({ length: n + 1 }, () =>
    new Float64Array(scaledBudget + 1)
  );

  for (let i = 1; i <= n; i++) {
    const device = devices[i - 1];
    const weight = scaledCosts[i - 1];
    const value = objectiveValue(device);

    for (let w = 0; w <= scaledBudget; w++) {
      dp[i][w] = dp[i - 1][w];

      if (weight <= w) {
        const withItem = dp[i - 1][w - weight] + value;
        if (withItem > dp[i][w]) {
          dp[i][w] = withItem;
        }
      }
    }
  }

  const selected = [];
  let w = scaledBudget;

  for (let i = n; i >= 1; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(devices[i - 1]);
      w -= scaledCosts[i - 1];
    }
  }

  let actualCost = selected.reduce((sum, d) => sum + d.cost, 0);

  while (actualCost > budget && selected.length > 0) {
    selected.sort((a, b) => objectiveValue(a) - objectiveValue(b));
    const removed = selected.shift();
    actualCost -= removed.cost;
  }

  selected.sort((a, b) => objectiveValue(b) - objectiveValue(a));

  const totalCost = selected.reduce((sum, d) => sum + d.cost, 0);
  const totalEnergySaving = selected.reduce(
    (sum, d) => sum + d.energySaving,
    0
  );
  const totalObjValue = selected.reduce(
    (sum, d) => sum + objectiveValue(d),
    0
  );

  const weightedSustainability =
    totalEnergySaving > 0
      ? totalObjValue / totalEnergySaving
      : 0;

  const co2Reduction = totalEnergySaving * CO2_FACTOR;
  const treeEquivalent = Math.round(co2Reduction / TREE_CO2_ANNUAL);

  return {
    selectedDevices: selected,
    totalCost,
    totalEnergySaving,
    totalSustainabilityScore: Math.round(weightedSustainability * 100) / 100,
    objectiveValue: totalObjValue,
    co2Reduction: Math.round(co2Reduction * 100) / 100,
    treeEquivalent,
    budgetUsed: totalCost,
    budgetRemaining: budget - totalCost,
  };
}

module.exports = { solveKnapsack, objectiveValue, CO2_FACTOR, TREE_CO2_ANNUAL };
