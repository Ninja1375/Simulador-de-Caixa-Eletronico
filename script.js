let balance = 0;
let transactionHistory = [];
let dailyWithdrawLimit = 1000;
let dailyWithdrawn = 0;
const correctPassword = "1234";

function login() {
    const password = document.getElementById("password").value;
    if (password === correctPassword) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("atm-screen").style.display = "block";
        showMessage("Bem-vindo!", false);
    } else {
        showLoginMessage("Senha incorreta. Tente novamente.");
    }
}

function logout() {
    document.getElementById("login-screen").style.display = "block";
    document.getElementById("atm-screen").style.display = "none";
    document.getElementById("password").value = "";
    showMessage("", false);
}

function deposit() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        showMessage("Por favor, insira um valor válido para depósito.");
        return;
    }
    balance += amount;
    updateBalance();
    addTransaction("Depósito", amount);
    showMessage(`Depósito de R$ ${amount.toFixed(2)} realizado com sucesso!`);
}

function withdraw() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        showMessage("Por favor, insira um valor válido para saque.");
        return;
    }
    if (amount > balance) {
        showMessage("Saldo insuficiente para essa operação.");
        return;
    }
    if (dailyWithdrawn + amount > dailyWithdrawLimit) {
        showMessage("Limite diário de saque excedido.");
        return;
    }
    balance -= amount;
    dailyWithdrawn += amount;
    updateBalance();
    addTransaction("Saque", amount);
    showMessage(`Saque de R$ ${amount.toFixed(2)} realizado com sucesso!`);
}

function checkBalance() {
    showMessage(`Seu saldo atual é R$ ${balance.toFixed(2)}`);
}

function updateBalance() {
    document.getElementById("balance").textContent = balance.toFixed(2);
}

function addTransaction(type, amount) {
    const now = new Date();
    transactionHistory.push({
        type: type,
        amount: amount,
        date: now.toLocaleString()
    });
}

function showHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    transactionHistory.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.date} - ${transaction.type}: R$ ${transaction.amount.toFixed(2)}`;
        historyList.appendChild(listItem);
    });

    document.getElementById("transaction-history").style.display = "block";
}

function showMessage(message, isError = true) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = isError ? "#dc3545" : "#28a745";
}

function showLoginMessage(message) {
    const loginMessageElement = document.getElementById("login-message");
    loginMessageElement.textContent = message;
}
