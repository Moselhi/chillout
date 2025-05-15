function calculate() {
  const fuels = [
    { name: "80", price: 15.75 },
    { name: "92", price: 17.75 },
    { name: "95", price: 19 },
    { name: "Solar", price: 15.5 }
  ];

  let totalMoney = 0;
  let totalTips = 0;
  let totalLiters = 0;

  fuels.forEach(fuel => {
  const start = parseFloat(document.getElementById(`start${fuel.name}`).value) || 0;
  const end = parseFloat(document.getElementById(`end${fuel.name}`).value) || 0;
  const money = parseFloat(document.getElementById(`money${fuel.name}`).value) || 0;

  const outputDiv = document.getElementById(`output${fuel.name}`);

  if (start > end) {
    outputDiv.innerHTML = `<span style="color:red;">Start can't be greater than End!</span>`;
    return; // نخرج من الحساب لهذا النوع
  }

  const liters = end - start;
  const expected = liters * fuel.price;
  const tip = money - expected;
  const tipPer1000 = liters > 0 ? (tip / liters) * 1000 : 0;

  // Save totals
  totalMoney += money;
  totalTips += tip;
  totalLiters += liters;

  // Output
  outputDiv.innerHTML = `
    Liters: ${liters.toFixed(2)}<br>
    Tip: ${tip.toFixed(2)}<br>
    Tip per 1000L: ${tipPer1000.toFixed(2)}
  `;
});


  const totalTipPer1000 = totalLiters > 0 ? (totalTips / totalLiters) * 1000 : 0;

  document.getElementById("totalMoney").innerText = `Total Money: ${totalMoney.toFixed(2)}`;
  document.getElementById("totalTips").innerText = `Total Tip: ${totalTips.toFixed(2)}`;
  document.getElementById("tipsPer1000L").innerText = `Overall Tip per 1000L: ${totalTipPer1000.toFixed(2)}`;
}
