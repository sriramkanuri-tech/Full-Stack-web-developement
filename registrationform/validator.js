// validator.js

const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const assignedNode = document.getElementById("assignedNode");

const formStatus = document.getElementById("formStatus");

const emailPattern = /^[^\s@]+@[^\s@]+\.(edu|com)$/i;

// Prevent page refresh
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Hide previous status
    formStatus.classList.add("hidden");
    formStatus.textContent = "";

    // Validate all fields
    if (!validateName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateNode()) isValid = false;

    if (isValid) {

        const user = {
            name: fullName.value.trim(),
            email: email.value.trim(),
            assignedNode: assignedNode.value,
            registeredAt: new Date().toISOString()
        };

        // Save to Local Storage
        localStorage.setItem(
            "signalDashUser",
            JSON.stringify(user)
        );

        showStatus(
            "✅ Account created successfully!",
            true
        );

        // Optional: Clear form
        form.reset();

        // Remove validation colors
        resetField(fullName);
        resetField(email);
        resetField(password);
        resetField(assignedNode);

        clearError("fullNameError");
        clearError("emailError");
        clearError("passwordError");
        clearError("assignedNodeError");
    }
});

// ---------------------------
// Live Validation
// ---------------------------

fullName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
assignedNode.addEventListener("change", validateNode);

// ---------------------------
// Validation Functions
// ---------------------------

function validateName() {

    const value = fullName.value.trim();

    if (value === "") {
        showError(fullName, "fullNameError", "Full name cannot be empty.");
        return false;
    }

    showSuccess(fullName, "fullNameError");
    return true;
}

function validateEmail() {

    const value = email.value.trim();

    if (!emailPattern.test(value)) {
        showError(email, "emailError", "Enter a valid .edu or .com email.");
        return false;
    }

    showSuccess(email, "emailError");
    return true;
}

function validatePassword() {

    const value = password.value;

    if (value.length < 8) {
        showError(
            password,
            "passwordError",
            "Password must be at least 8 characters."
        );
        return false;
    }

    if (!/\d/.test(value)) {
        showError(
            password,
            "passwordError",
            "Password must contain at least one number."
        );
        return false;
    }

    showSuccess(password, "passwordError");
    return true;
}

function validateNode() {

    if (assignedNode.value === "") {
        showError(
            assignedNode,
            "assignedNodeError",
            "Please select a telemetry node."
        );
        return false;
    }

    showSuccess(assignedNode, "assignedNodeError");
    return true;
}

// ---------------------------
// Helper Functions
// ---------------------------

function showError(input, errorId, message) {

    input.classList.remove(
        "border-green-500",
        "focus:border-green-500"
    );

    input.classList.add(
        "border-red-500",
        "focus:border-red-500"
    );

    document.getElementById(errorId).textContent = message;
}

function showSuccess(input, errorId) {

    input.classList.remove(
        "border-red-500",
        "focus:border-red-500"
    );

    input.classList.add(
        "border-green-500",
        "focus:border-green-500"
    );

    document.getElementById(errorId).textContent = "";
}

function clearError(errorId) {
    document.getElementById(errorId).textContent = "";
}

function resetField(input) {
    input.classList.remove(
        "border-red-500",
        "border-green-500",
        "focus:border-red-500",
        "focus:border-green-500"
    );
}

function showStatus(message, success) {

    formStatus.classList.remove("hidden");

    if (success) {

        formStatus.className =
            "rounded-2xl border border-green-500 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-300";

    } else {

        formStatus.className =
            "rounded-2xl border border-red-500 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300";
    }

    formStatus.textContent = message;
}