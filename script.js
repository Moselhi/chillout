function calculate() {
  const fuels = [
    { name: "Fuel 80", litersId: "liters80", amountId: "amount80" },
    { name: "Fuel 92", litersId: "liters92", amountId: "amount92" },
    { name: "Fuel 95", litersId: "liters95", amountId: "amount95" },
    { name: "Diesel", litersId: "litersDiesel", amountId: "amountDiesel" },
  ];

  let resultHTML = "<h2>Results</h2>";
  let hasInput = false;

  let totalLiters = 0;
  let totalTips = 0;
  let totalAmount = 0;

  fuels.forEach(fuel => {
    const liters = parseFloat(document.getElementById(fuel.litersId).value);
    const amount = parseFloat(document.getElementById(fuel.amountId).value);

    if (!isNaN(liters) && !isNaN(amount)) {
      const pricePerLiter = getFixedPrice(fuel.name);
      const expectedTotal = liters * pricePerLiter;
      const tips = amount - expectedTotal;
      const tipsPer1000 = (liters > 0) ? (tips / liters * 1000).toFixed(2) : "0.00";

      resultHTML += `
        <h3>${fuel.name}</h3>
        <p>Tips: ${tips.toFixed(2)} EGP</p>
        <p>Tips per 1000L: ${tipsPer1000} EGP</p>
      `;

      hasInput = true;
      totalLiters += liters;
      totalTips += tips;
      totalAmount += amount;
    }
  });

  if (hasInput) {
    const totalTipsPer1000 = (totalLiters > 0) ? (totalTips / totalLiters * 1000).toFixed(2) : "0.00";

    resultHTML += `
      <hr>
      <h3>Total Summary</h3>
      <p><strong>Total Tips:</strong> ${totalTips.toFixed(2)} EGP</p>
      <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)} EGP</p>
      <p><strong>Total Tips per 1000L:</strong> ${totalTipsPer1000} EGP</p>
    `;
  } else {
    resultHTML += "<p>Please enter at least one fuel type.</p>";
  }

  document.getElementById("results").innerHTML = resultHTML;
}

function getFixedPrice(fuelType) {
  switch (fuelType) {
    case "Fuel 80": return 15.75;
    case "Fuel 92": return 17.75;
    case "Fuel 95": return 19;
    case "Diesel": return 15.5;
    default: return 0;
  }
}
