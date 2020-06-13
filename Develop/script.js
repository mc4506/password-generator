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

// ***************** //
// Generate Password //
// ***************** //
function generatePassword() {
  // Show an alert to start password generation
  alert("Please follow the steps prompted to generate your password based on criteria selected.");

  // Call function to get passwordLength
  let passwordLength = getPasswordLength();

  // Check if User selects cancel from the prompt then terminate function and return null
  if (passwordLength === null) {
    return null;
  }

  // ****** Ask User to select character criteria for the password ****** //
  // Initialize number of character sets selected to 0
  let numberOfCharSetsSelected = 0;

  // Initialize an array of booleans with 4 false values. Using an array so I can call a for loop through the array below
  let charSetBoolArray = [false, false, false, false];

  // Loop until at least one character set is selected to generate the password
  while (numberOfCharSetsSelected == 0) {
    // Use confirm function to set boolean values for character types
    charSetBoolArray[0] = confirm("Do you want lowercase characters in your password? (a b c ...)"); // lowercase index
    charSetBoolArray[1] = confirm("Do you want uppercase characters in your password? (A B C ...)"); // uppercase index
    charSetBoolArray[2] = confirm("Do you want numeric characters in your password? (0 1 2 ...)"); // numeric index
    charSetBoolArray[3] = confirm("Do you want special characters in your password? (! # $ ...)"); // special index

    // sum of values in the charSetBoolArray
    numberOfCharSetsSelected = charSetBoolArray.reduce((a, b) => a + b, 0);
    // console.log(numberOfCharSetsSelected);

    // If all 4 booleans are false and add upto 0, alert user and repeat loop
    if (numberOfCharSetsSelected == 0) {
      alert("At least one of the character types must be selected in order to generate your password. Try again.");
    }
  }

  // ****** Generate random number of characters for each selected character set ******//
  // Minimum 1 character and and maximum(passwordLength - numberOfCharSetsSelected) + 1

  // initialize passwordCharArray to track how many characters are in each character set based on the charSetBoolArray's true or false
  let charSetQtyArray = [0, 0, 0, 0];
  let i = 0;

  for (i = 0; i < charSetQtyArray.length; i++) {
    if (charSetBoolArray[i] === true && numberOfCharSetsSelected === 1) {
      charSetQtyArray[i] = passwordLength - numberOfCharSetsSelected + 1;
    } else if (charSetBoolArray[i] === true) {
      charSetQtyArray[i] = Math.floor(Math.random() * (passwordLength - numberOfCharSetsSelected)) + 1;
      passwordLength = passwordLength - charSetQtyArray[i];
      numberOfCharSetsSelected -= 1;
    }
  }
  // console.log("charSetBoolArray: " + charSetBoolArray);
  // console.log("charSetQtyArray: " + charSetQtyArray);

  // *** Add random characters of each character set into a string based on number of characters in charSetQtyArray *** //
  // The generated password is sorted by character set and need to be shuffled afterwards.

  // initialize password to an empty string
  let password = "";

  //character set Array
  const charSetArray = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~"];

  let j = 0;

  // loop through charSetQtyArray (4 times)
  for (i = 0; i < charSetQtyArray.length; i++) {
    //loop through number of characters for each character set
    for (j = 0; j < charSetQtyArray[i]; j++) {
      // randomly generate a character from the ith index of charSetArray
      let char = charSetArray[i].charAt(getRandomInteger(0, charSetArray[i].length - 1));
      // console.log(char);
      password = password + char;
      // console.log(password);
    }
  }

  // ****** Shuffle the password ******** //
  // initialize a shuffled password string
  var passwordShuffled = "";

  // split password into an array to be used in a for loop
  let passwordArray = password.split("");
  // console.log(passwordArray);

  // loop through the password and using splice method to assign a shuffled character to the passwordShuffled string
  for (i = 0; i < password.length; i++) {
    // decrement the passwordArray length for each character that gets spliced/removed
    let shuffleChar = passwordArray.splice(getRandomInteger(0, passwordArray.length - (1 + i)), 1);
    // console.log("shuffleChar: " + shuffleChar);
    passwordShuffled += shuffleChar;
    // console.log(passwordShuffled);
  }
  return passwordShuffled;
}

// ******************************* //
// Function to get password length //
// ******************************* //
function getPasswordLength() {
  //initialize length boolean to false
  let isLengthValid = false;
  let passwordLength = prompt("Please enter number of characters for the password. Enter a length of at least 8 characters and no more than 128 characters.");

  // Loop until isLengthValid=true
  while (isLengthValid === false) {
    // If "cancel" button is clicked, break out of loop
    if (passwordLength === null) {
      break;
    }
    // Check if passwordLength is a valid integer between 8 and 128 (inclusive). If yes set isLengthValid to true else prompt for a valid entry
    if (Number.isInteger(Number(passwordLength)) && passwordLength >= 8 && passwordLength <= 128) {
      isLengthValid = true;
    } else {
      //Prompt again for valid response
      passwordLength = prompt("Your entry is not a valid length. Please enter a whole number greater or equal to 8 and less than or equal to 128.");
    }
  }
  return passwordLength;
}

// *************************************************** //
// Random Integer function with min and max parameter. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// *************************************************** //
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
