
// ---------- DOM ELEMENTS ----------
const passwordInput   = document.getElementById('password');
const lengthSlider    = document.getElementById('lengthSlider');
const lengthValue     = document.getElementById('lengthValue');
const generateBtn     = document.getElementById('generate-btn');
const copyBtn         = document.getElementById('copy-btn');
const uppercaseChk   = document.getElementById('uppercase');
const lowercaseChk   = document.getElementById('lowercase');
const numbersChk     = document.getElementById('numbers');
const symbolsChk     = document.getElementById('symbols');
const strengthBar    = document.querySelector('.strength-bar');
const strengthLabel  = document.getElementById('strength-label');

// ---------- CONSTANTS ----------
const UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER   = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+~`|{}[]:;?><,./-';

// ---------- HELPER FUNCTIONS ----------
function randomPassword(len) {
  let chars = '';
  if (uppercaseChk.checked) chars += UPPER;
  if (lowercaseChk.checked) chars += LOWER;
  if (numbersChk.checked)   chars += NUMBERS;
  if (symbolsChk.checked)   chars += SYMBOLS;
  return Array.from({length:len}, () => chars.charAt(Math.floor(Math.random()*chars.length))).join('');
}

function evaluateStrength(pw) {
  let score = 0;
  if (pw.length >= 8)      score += 20;
  if (/[A-Z]/.test(pw))    score += 20;
  if (/[a-z]/.test(pw))    score += 20;
  if (/\d/.test(pw))       score += 20;
  if (/[^A-Za-z0-9]/.test(pw)) score += 20;

  const pct = Math.min(100, Math.max(0, score));
  strengthBar.style.width   = pct + '%';
  strengthBar.style.backgroundColor =
    pct < 40 ? '#fc8181' :
    pct < 70 ? '#f7b733' : '#0a9502';
  // Update the text label
  if (pct < 40)      strengthLabel.textContent = 'Weak';
  else if (pct < 70) strengthLabel.textContent = 'Medium';
  else               strengthLabel.textContent = 'Strong';
}

// ---------- EVENT LISTENERS ----------
lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});
generateBtn.addEventListener('click', () => {
  const pw = randomPassword(Number(lengthSlider.value));
  passwordInput.value = pw;
  evaluateStrength(pw);
});
copyBtn.addEventListener('click', () => {
  if (!passwordInput.value) return;
  navigator.clipboard.writeText(passwordInput.value)
    .then(() => {
      copyBtn.classList.remove('far','fa-copy');
      copyBtn.classList.add('fas','fa-check');
      copyBtn.style.color = '#4BB543';
      setTimeout(() => {
        copyBtn.classList.remove('fas','fa-check');
        copyBtn.classList.add('far','fa-copy');
        copyBtn.style.color = '';
      }, 1500);
    })
    .catch(err => alert('Failed to copy: '+err));
});

// Generate an initial password on load
window.addEventListener('DOMContentLoaded', () => generateBtn.click());