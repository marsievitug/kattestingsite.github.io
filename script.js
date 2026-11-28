const CORRECT_PASSWORD = "0227";

const passwordInput = document.getElementById("passwordInput");
const message = document.getElementById("message");

const keys = document.querySelectorAll(".key");
const clearButton = document.getElementById("clearButton");
const backspaceButton = document.getElementById("backspaceButton");
const decorativeKey = document.querySelector(".decorative-key");

const passwordForm = document.getElementById("passwordForm");

let password = "";

// Update the password field
function updatePassword() {
    passwordInput.value = password;
}

// Add a digit to the password
function addDigit(digit) {
    if (password.length >= 10) return;

    password += digit;
    updatePassword();

    message.textContent = "";
}

// Clear the entire password
function clearPassword() {
    password = "";
    updatePassword();
    message.textContent = "";
}

// Remove the last digit
function backspace() {
    password = password.slice(0, -1);
    updatePassword();
    message.textContent = "";
}

// Check password
function checkPassword() {
    if (password === CORRECT_PASSWORD) {
        message.textContent = "Password accepted!";

        // Replace this with your diary page URL
        window.location.href = "diary.html";

    } else {
        message.textContent = "Incorrect password. Try again!";

        password = "";
        updatePassword();
    }
}

// Number keypad buttons
keys.forEach((key) => {
    key.addEventListener("click", () => {
        const value = key.dataset.key;

        // Ignore decorative heart keys
        if (value === "4" && key.classList.contains("heart-key")) {
            return;
        }

        if (/^\d$/.test(value)) {
            addDigit(value);
        }
    });
});

// Clear button
clearButton.addEventListener("click", clearPassword);

// Backspace button
backspaceButton.addEventListener("click", backspace);

// Submit using Enter
passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    checkPassword();
});

// Click the decorative key to submit
decorativeKey.addEventListener("click", checkPassword);

// Keyboard support
document.addEventListener("keydown", (event) => {
    if (/^\d$/.test(event.key)) {
        addDigit(event.key);
    }

    if (event.key === "Backspace") {
        backspace();
    }

    if (event.key === "Escape") {
        clearPassword();
    }

    if (event.key === "Enter") {
        checkPassword();
    }
});