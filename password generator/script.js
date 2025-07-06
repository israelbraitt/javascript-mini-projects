const passwordBox = document.getElementById("password");
const options = ['uppercase', 'lowercase', 'numbers', 'symbols'];
const lengthInput = document.querySelector('input[name="length"]');
const copyIcon = document.getElementById("copy-icon");
const generateButton = document.getElementById("generate-button");

const upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%¨&*()_+-=/?[]{}\\|";

const currentSettings = {};

options.forEach(option => {
    const checkbox = document.querySelector(`input[name="${option}"]`);
    currentSettings[option] = checkbox.checked;

    checkbox.addEventListener('change', () => {
        currentSettings[option] = checkbox.checked;
    });
});

generateButton.addEventListener("click", createPassword);

copyIcon.addEventListener("click", copyPassword);

function createPassword() {
    const length = parseInt(lengthInput.value, 10) || 0;
    let characterPool = '';
    let password = '';

    if (currentSettings.uppercase) characterPool += upperCaseCharacters;
    if (currentSettings.lowercase) characterPool += lowerCaseCharacters;
    if (currentSettings.numbers) characterPool += numberCharacters;
    if (currentSettings.symbols) characterPool += symbolCharacters;

    if (!characterPool) {
        passwordBox.value = "Select at least one option!";
        return;
    }

    for (let i = 0; i < length; i++) {
        password += characterPool[Math.floor(Math.random() * characterPool.length)];
    }

    passwordBox.value = password;
}

function copyPassword() {
    const password = passwordBox.value;

    if (!password) return;

    navigator.clipboard.writeText(password)
        .then(() => {
            alert("Password copied successfully!");
        })
        .catch(err => {
            alert("Error copying password.");
            console.error(err);
        });

}