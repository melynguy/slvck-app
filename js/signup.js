//add code here that is specific to the sign-up page (signup.html)
"use strict";

var signUpForm = document.getElementById("signup-form");
var emailInput = document.getElementById("email-input");
var passwordInput = document.getElementById("password-input");
var passwordConfirm = document.getElementById("password-confirm");
var displayNameInput = document.getElementById("display-name-input");

signUpForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    if (passwordConfirm.value !== passwordInput.value) {
        alert("Your passwords do not match!");
    }

    if (passwordConfirm.value === passwordInput.value && displayNameInput.value !== "") {
        firebase.auth().onAuthStateChanged(function(user) {
            user.sendEmailVerification();
        });

        firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
            .then(function(user) {
                return user.updateProfile({
                    displayName: displayNameInput.value,
                    photoURL: "https://www.gravatar.com/avatar/" + md5(emailInput.value)
                    //,emailVerified: false
                });
            })
            .then(function() {
                window.location = "messages.html";
            })
            .catch(function(err) {
                alert(err.message);
            });
        return false;
    }

});