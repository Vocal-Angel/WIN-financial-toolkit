
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

    const adjustedIncome = income * Math.pow(1 + inflation, retireAge - currentAge);
    const totalRequired = adjustedIncome * ((1 - Math.pow(1 + returnRate, -retireYears)) / returnRate);
    const yearsToSave = retireAge - currentAge;
    const monthlySavings = totalRequired / ((Math.pow(1 + returnRate / 12, yearsToSave * 12) - 1) / (returnRate / 12));

    document.getElementById("retirement-result").innerText =
        `Target Lump Sum: £${totalRequired.toFixed(2)} | Monthly Savings Needed: £${monthlySavings.toFixed(2)}`;
}
