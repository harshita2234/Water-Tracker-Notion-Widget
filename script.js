let waterAmount = parseInt(localStorage.getItem('waterAmount')) || 0; // Retrieve or initialize to 0
let goal = parseInt(localStorage.getItem('goal')) || 2000; // Default to 2000ml if no goal is set

document.getElementById('waterAmount').textContent = `${waterAmount} ml`;
document.getElementById('goalDisplay').textContent = `Goal: ${goal} ml`;

function changeWaterAmount(amount) {
    if (amount > 0 && waterAmount >= goal) {
        return; // Do not increase if goal is reached
    }
    waterAmount += amount;
    if (waterAmount < 0) {
        waterAmount = 0;
    }
    updateDisplay();
    localStorage.setItem('waterAmount', waterAmount);
}

function updateDisplay() {
    if (waterAmount >= goal) {
        document.getElementById('waterAmount').textContent = "YAY!!";
    } else {
        document.getElementById('waterAmount').textContent = `${waterAmount} ml`;
    }
}

function startTimer() {
    longPressTimer = setTimeout(resetWaterAmount, 2000); // Adjusted to 2 seconds
}

function clearTimer() {
    clearTimeout(longPressTimer);
}

function resetWaterAmount() {
    waterAmount = 0;
    updateDisplay();
    localStorage.setItem('waterAmount', waterAmount);
}

function setNewGoal() {
    let newGoal = parseInt(prompt("Please enter your new daily water intake goal in ml:", "2000"));
    if (!isNaN(newGoal)) {
        goal = newGoal;
        localStorage.setItem('goal', goal);
        document.getElementById('goalDisplay').textContent = `Goal: ${goal} ml`;
        waterAmount = 0; // Reset water amount to 0 when a new goal is set
        updateDisplay();
        localStorage.setItem('waterAmount', waterAmount);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
        if (event.target.id === 'increase') {
            changeWaterAmount(50);
        }
        if (event.target.id === 'decrease') {
            changeWaterAmount(-50);
        }
        if (event.target.id === 'newGoal') {
            setNewGoal();
        }
    });
});
