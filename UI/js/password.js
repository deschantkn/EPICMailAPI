/**
 * Handles submission of password forgotten form
 * Takes the number and checks in the database if it is present.
 * if the number is found the backend makes SMS verification with twilio and we display the password changing form
 * if it is not found a visual warning is given saying the number was not associated to any account
 */
const handlePasswordForgot = () => {
  const countryCode = document.getElementById('country-code').value;
  const phoneNumber = document.getElementById('phone-input').value;
  const resetButton = document.getElementById('reset-password');
  const passwordForgot = document.getElementById('password-forgot');
  const newPassword = document.getElementById('new-password');
  const noAccount = document.getElementById('account-nomatch');

  passwordForgot.style.display = 'none';
  newPassword.style.display = 'flex';
};