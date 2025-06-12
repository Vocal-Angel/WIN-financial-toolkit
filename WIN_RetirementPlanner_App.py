
from flask import Flask, render_template_string, request
import math

app = Flask(__name__)

def calculate_retirement_goal(current_age, retirement_age, desired_monthly_income, retirement_years, inflation_rate, return_rate_during_retirement):
    years_until_retirement = retirement_age - current_age
    inflation_multiplier = (1 + inflation_rate / 100) ** years_until_retirement
    future_monthly_income = desired_monthly_income * inflation_multiplier

    monthly_return_rate = (1 + return_rate_during_retirement / 100) ** (1 / 12) - 1
    total_months = retirement_years * 12

    if monthly_return_rate > 0:
        pv_factor = (1 - (1 / ((1 + monthly_return_rate) ** total_months))) / monthly_return_rate
    else:
        pv_factor = total_months

    total_needed_at_retirement = future_monthly_income * pv_factor
    return future_monthly_income, total_needed_at_retirement

HTML_PAGE = """
<!DOCTYPE html>
<html>
<head>
    <title>WIN Retirement Planner</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #fdf6f0; color: #4b1248; max-width: 700px; margin: auto; padding: 20px; }
        h1 { color: #d4af37; }
        label { display: block; margin-top: 10px; }
        input { width: 100%; padding: 8px; margin-top: 4px; }
        button { margin-top: 20px; padding: 10px 20px; background-color: #4b1248; color: #fff; border: none; cursor: pointer; }
        .result { margin-top: 30px; background: #fff; padding: 20px; border: 1px solid #ccc; }
    </style>
</head>
<body>
    <h1>WIN Retirement Planner</h1>
    <p>Calculate how much you need to retire with confidence and clarity.</p>
    <form method="post">
        <label>Current Age: <input type="number" name="current_age" required></label>
        <label>Target Retirement Age: <input type="number" name="retirement_age" required></label>
        <label>Desired Monthly Income (£): <input type="number" name="monthly_income" required></label>
        <label>Years of Retirement to Fund: <input type="number" name="retirement_years" required></label>
        <label>Annual Inflation Rate (%): <input type="number" step="0.1" name="inflation_rate" required></label>
        <label>Annual Return During Retirement (%): <input type="number" step="0.1" name="return_rate" required></label>
        <button type="submit">Calculate</button>
    </form>

    {% if result %}
    <div class="result">
        <h2>Results</h2>
        <p><strong>Inflation-adjusted monthly income at retirement:</strong> £{{ result.future_monthly_income | round(2) }}</p>
        <p><strong>Total amount needed at retirement:</strong> £{{ result.total_needed | round(2) }}</p>
    </div>
    {% endif %}
</body>
</html>
"""

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    if request.method == "POST":
        current_age = int(request.form["current_age"])
        retirement_age = int(request.form["retirement_age"])
        monthly_income = float(request.form["monthly_income"])
        retirement_years = int(request.form["retirement_years"])
        inflation_rate = float(request.form["inflation_rate"])
        return_rate = float(request.form["return_rate"])

        future_income, total_needed = calculate_retirement_goal(
            current_age, retirement_age, monthly_income, retirement_years, inflation_rate, return_rate
        )

        result = {
            "future_monthly_income": future_income,
            "total_needed": total_needed
        }

    return render_template_string(HTML_PAGE, result=result)

if __name__ == "__main__":
    app.run(debug=True)
