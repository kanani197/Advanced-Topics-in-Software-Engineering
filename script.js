let display = document.getElementById("display");
let history = [];
let isDegree = true;
let isShift = false;

/* BASIC */
function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/* CALCULATE */
function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);

        display.value = result;

        history.push(expression + " = " + result);
        updateHistory();

    } catch {
        alert("Invalid Expression");
    }
}

/* SCIENTIFIC FUNCTIONS */
function applyFunc(func) {
    let value = parseFloat(display.value);
    if (isNaN(value)) return;

    let result;

    switch (func) {
        case "sin":
            result = isShift ? toDegrees(Math.asin(value)) : Math.sin(toRadians(value));
            break;
        case "cos":
            result = isShift ? toDegrees(Math.acos(value)) : Math.cos(toRadians(value));
            break;
        case "tan":
            result = isShift ? toDegrees(Math.atan(value)) : Math.tan(toRadians(value));
            break;
        case "sqrt":
            result = Math.sqrt(value);
            break;
        case "square":
            result = Math.pow(value, 2);
            break;
        case "cube":
            result = Math.pow(value, 3);
            break;
        case "factorial":
            result = factorial(value);
            break;
    }

    display.value = result;
}

/* FACTORIAL */
function factorial(n) {
    if (n < 0) return "Error";
    if (n === 0) return 1;

    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

/* DEG/RAD */
function toggleMode() {
    isDegree = !isDegree;
    document.getElementById("modeBtn").innerText = isDegree ? "DEG" : "RAD";
}

function toRadians(value) {
    return isDegree ? value * Math.PI / 180 : value;
}

function toDegrees(value) {
    return isDegree ? value : value * (180 / Math.PI);
}

/* SHIFT */
function toggleShift() {
    isShift = !isShift;
    alert("Shift " + (isShift ? "ON" : "OFF"));
}

/* HISTORY */
function updateHistory() {
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    history.slice(-10).reverse().forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function toggleHistory() {
    let panel = document.getElementById("historyPanel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}

/* THEME */
function toggleTheme() {
    document.body.classList.toggle("light");
}

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", function (event) {
    if (!isNaN(event.key) || "+-*/.".includes(event.key)) {
        append(event.key);
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Backspace") {
        deleteLast();
    }
});