const inputPassword = document.querySelector('#password');
const upperCaseCheckEl = document.querySelector('#uppercase-check');
const numberCheckEl = document.querySelector('#number-check');
const symbolCheckEl = document.querySelector('#symbol-check');
const securityIndicatorBar = document.querySelector('#security-indicator-bar');
let passwordLength = 16;

function generatePassword() {
  let chars = 'abcdefghjklmnpqrstuvwxyz';

  const upperCaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const numberChars = 123456789;
  const symbolChars = '?!@&*()[]';

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars;
  }

  if (numberCheckEl.checked) {
    chars += numberChars;
  }
  if (symbolCheckEl.checked) {
    chars += symbolChars;
  }

  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputPassword.value = password;
  calculateQuality();
  calculateFontSize();
}

function calculateQuality() {
  //peso da senha: T*0.25 + M*0.15 + N*0.25 + S*0.35 = 100
  const percent = Math.round(
    (passwordLength / 64) * 25 +
      (upperCaseCheckEl.checked ? 15 : 0) +
      (numberCheckEl.checked ? 25 : 0) +
      (symbolCheckEl.checked ? 35 : 0)
  );
  securityIndicatorBar.style.width = `${percent}%`;

  if (percent > 69) {
    //safe
    securityIndicatorBar.classList.remove('critical');
    securityIndicatorBar.classList.remove('warning');
    securityIndicatorBar.classList.add('safe');
  } else if (percent > 50) {
    //warning
    securityIndicatorBar.classList.remove('critical');
    securityIndicatorBar.classList.add('warning');
    securityIndicatorBar.classList.remove('safe');
  } else {
    //critical
    securityIndicatorBar.classList.add('critical');
    securityIndicatorBar.classList.remove('warning');
    securityIndicatorBar.classList.remove('safe');
  }

  if (percent >= 100) {
    securityIndicatorBar.classList.add('completed');
  } else {
    securityIndicatorBar.classList.remove('complete');
  }
}

function calculateFontSize() {
  if (passwordLength > 45) {
    inputPassword.classList.remove('font-sm');
    inputPassword.classList.remove('font-xs');
    inputPassword.classList.add('font-xxs');
  } else if (passwordLength > 32) {
    inputPassword.classList.remove('font-sm');
    inputPassword.classList.add('font-xs');
    inputPassword.classList.remove('font-xxs');
  } else if (passwordLength > 22) {
    inputPassword.classList.add('font-sm');
    inputPassword.classList.remove('font-xs');
    inputPassword.classList.remove('font-xxs');
  } else {
    inputPassword.classList.remove('font-sm');
    inputPassword.classList.remove('font-xs');
    inputPassword.classList.remove('font-xxs');
  }
}

function copy() {
  navigator.clipboard.writeText(inputPassword.value);
  document.querySelector('#copy-2').innerText = 'Copiado!';
  setTimeout(() => {
    document.querySelector('#copy-2').innerText = 'Copiar senha';
  }, 2500);
}

const inputPasswordLength = document.querySelector('#password-length');
inputPasswordLength.addEventListener('input', function () {
  passwordLength = inputPasswordLength.value;
  document.querySelector('#password-length-text').innerText = passwordLength;

  generatePassword();
});

upperCaseCheckEl.addEventListener('click', generatePassword);
numberCheckEl.addEventListener('click', generatePassword);
symbolCheckEl.addEventListener('click', generatePassword);

document.querySelector('#copy-1').addEventListener('click', copy);
document.querySelector('#copy-2').addEventListener('click', copy);
document.querySelector('#renew').addEventListener('click', generatePassword);

generatePassword();
