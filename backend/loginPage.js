
function correctPW() {
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
let password = document.getElementById('password');
var lowerCaseLetters = /[a-z]/g;
var upperCaseLetters = /[A-Z]/g;
var numbers = /[0-9]/g;

    password.onkeyup = function() {
        // Validate lowercase letters
        
        if(password.value.match(lowerCaseLetters)) {
          letter.classList.remove("invalid");
          letter.classList.add("valid");
        } else {
          letter.classList.remove("valid");
          letter.classList.add("invalid");
      }
      
        // Validate capital letters
        
        if(password.value.match(upperCaseLetters)) {
          capital.classList.remove("invalid");
          capital.classList.add("valid");
        } else {
          capital.classList.remove("valid");
          capital.classList.add("invalid");
        }
      
        // Validate numbers
        
        if(password.value.match(numbers)) {
          number.classList.remove("invalid");
          number.classList.add("valid");
        } else {
          number.classList.remove("valid");
          number.classList.add("invalid");
        }
      
        // Validate length
        if(password.value.length >= 8) {
          length.classList.remove("invalid");
          length.classList.add("valid");
        } else {
          length.classList.remove("valid");
          length.classList.add("invalid");
        }
      }
      if(password.value.match(lowerCaseLetters) === false) {
        alert(" at least 1 lowercase letter required ")
      } else if(password.value.match(upperCaseLetters) === false) {
        alert("at least 1 uppercase letter required ")
      } else if(password.value.match(numbers) === false) {
        alert("at least 1 number required ") 
      }  else if (password.value === "") {
        alert("password field is empty") 
       } else if(password.value.length < 8) {
        alert("password must have 8 characters")
      }
      else {
        alert("Login Successful");
        window.location.href='http://localhost:3000/login#home';
      }
}

correctPW();