
function showTab(tabName) {
    document.getElementById("wealth").style.display = "none";
    document.getElementById("retirement").style.display = "none";
    document.getElementById(tabName).style.display = "block";
}

function calculateWealth() {
    const P = parseFloat(document.getElementById("initial").value);
    const PMT = parseFloat(document.getElementById("monthly").value);
    const r = parseFloat(document.getElementById("rate").value) / 100 / 12;
    const n = parseInt(document.getElementById("years").value) * 12;
    const futureValue = P * Math.pow(1 + r, n) + PMT * (Math.pow(1 + r, n) - 1) / r;
    document.getElementById("wealth-result").innerText = `Future Value: £${futureValue.toFixed(2)}`;
}

function calculateRetirement() {
    const currentAge = parseInt(document.getElementById("currentAge").value);
    const retireAge = parseInt(document.getElementById("retireAge").value);
    const income = parseFloat(document.getElementById("income").value);
    const retireYears = parseInt(document.getElementById("retireYears").value);
    const inflation = parseFloat(document.getElementById("inflation").value) / 100;
    const returnRate = parseFloat(document.getElementById("returnRate").value) / 100;

    const monthlyInflation = Math.pow(1 + inflation, retireAge - currentAge);
    const adjustedMonthlyIncome = income * monthlyInflation;

    const r = returnRate / 12;
    const g = inflation / 12;
    const n = retireYears * 12;

    const factorNumerator = 1 - Math.pow((1 + g) / (1 + r), n);
    const factorDenominator = r - g;

    const presentValue = adjustedMonthlyIncome * (factorNumerator / factorDenominator);

    const formattedIncome = adjustedMonthlyIncome.toLocaleString("en-UK", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
    });

    const formattedPV = presentValue.toLocaleString("en-UK", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
    });

    document.getElementById("retirement-result").innerHTML = `
        <strong>Inflation-adjusted monthly income at age ${retireAge}:</strong> ${formattedIncome}<br>
        <strong>Total retirement lump sum needed:</strong> ${formattedPV}
    `;
}

