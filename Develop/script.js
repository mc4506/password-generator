// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// function call to set password variable
function generatePassword() {

  let isValid = false;
  alert("Pleae enter the following criteria in order to generate your password.");
  let passwordLength = prompt("Please enter number of characters for the password. Enter a number between 8 and 128");

  do {
    // If "cancel" button is clicked, break out of loop
    if (passwordLength === null) {
      break;
    }
    // check if passwordLength is a valid integer between 8 and 128 (inclusive). If yes set isValid to true else prompt for a valid entry
    if (Number.isInteger(passwordLength) && passwordLength >= 8 && passwordLength <= 128) {
      isValid = true;
    } else {
      isValid = false;
      passwordLength = prompt("Your entry is not a valid number. Please enter a whole number between 8 and 128");
    }
  } while (isValid === false); 




}

// WHEN prompted for character types to include in the password
// THEN I choose lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page