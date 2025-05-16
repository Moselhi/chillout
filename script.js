function calculate() {
  const fuels = [
    { name: "80", price: 15.75 },
    { name: "92", price: 17.25 },
    { name: "95", price: 19 },
    { name: "Solar", price: 15.5 }
  ];

  let totalMoney = 0;
  let totalTips = 0;
  let totalLiters = 0;
  let fuelPriceTotal = 0;

  fuels.forEach(fuel => {
    const start = parseFloat(document.getElementById(`start${fuel.name}`).value) || 0;
    const end = parseFloat(document.getElementById(`end${fuel.name}`).value) || 0;

    const michStart = parseFloat(document.getElementById(`michstart${fuel.name}`)?.value) || 0;
    const michEnd = parseFloat(document.getElementById(`michend${fuel.name}`)?.value) || 0;

    const money = parseFloat(document.getElementById(`money${fuel.name}`)?.value) || 0;

    const outputDiv = document.getElementById(`output${fuel.name}`);

    if (start > end || michStart > michEnd) {
      outputDiv.innerHTML = `<span style="color:red;">Start can't be greater than End!</span>`;
      return;
    }

    const digitalLiters = end - start;
    const michLiters = michEnd - michStart;
    const usedLiters = Math.max(digitalLiters, michLiters);
    const useMich = michLiters >= digitalLiters;
    const expected = usedLiters * fuel.price;
    const tip = money - expected;
    const tipPer1000 = usedLiters > 0 ? (tip / usedLiters) * 1000 : 0;

    totalMoney += money;
    totalTips += tip;
    totalLiters += usedLiters;
    fuelPriceTotal += expected;

    outputDiv.innerHTML = `
      Digital Liters: ${digitalLiters.toFixed(2)} ${!useMich ? '<u>(used)</u>' : ''}<br>
      Mich Liters: ${michLiters.toFixed(2)} ${useMich ? '<u>(used)</u>' : ''}<br>
      Used Liters: ${usedLiters.toFixed(2)}<br>
      Fuel Price: ${expected.toFixed(2)}<br>
      Tip: ${tip.toFixed(2)}<br>
      Tip per 1000L: ${tipPer1000.toFixed(2)}
    `;
  });

  const totalTipPer1000 = totalLiters > 0 ? (totalTips / totalLiters) * 1000 : 0;

  document.getElementById("totalMoney").innerText = 'Total Money: ' + totalMoney.toFixed(2);
  document.getElementById("totalTips").innerText = 'Total Tip: ' + totalTips.toFixed(2);
  document.getElementById("tipsPer1000L").innerText = 'Overall Tip per 1000L: ' + totalTipPer1000.toFixed(2);
  document.getElementById("fuelPriceTotal").innerText = 'Total Fuel Price: ' + fuelPriceTotal.toFixed(2);
}

function resetForm() {
  document.querySelectorAll("input").forEach(input => {
    input.value = '';
  });
  document.querySelectorAll("[id^='output']").forEach(div => {
    div.innerHTML = '';
  });
  ["totalMoney", "totalTips", "tipsPer1000L", "fuelPriceTotal"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = '';
  });
}

