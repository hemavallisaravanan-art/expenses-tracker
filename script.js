let transactions = [];
let chart;

function addTransaction() {
    const title = document.getElementById("title").value;
    const amount = parseInt(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (title === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    transactions.push({ title, amount, type });
    updateUI();

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
}

function updateUI() {
    let income = 0, expense = 0;
    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;

        const li = document.createElement("li");
        li.innerText = `${t.title} - ₹${t.amount} (${t.type})`;
        list.appendChild(li);
    });

    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("balance").innerText = "₹" + (income - expense);

    drawChart(income, expense);
}

function drawChart(income, expense) {
    const ctx = document.getElementById("expenseChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, expense],
                backgroundColor: ["#22c55e", "#ef4444"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}