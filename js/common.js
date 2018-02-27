//this file is included in all pages, so use this for anything
//that is common across all your pages, or functions that are
//shared between more than one page

//put your Firebase initialization here so that every page
//can call the Firebase API
//firebase.initializeApp(...);
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBS0IOZXKSjo6vfU9d2P6aJ983e5GS8i8I",
    authDomain: "whack-80d2c.firebaseapp.com",
    databaseURL: "https://whack-80d2c.firebaseio.com",
    storageBucket: "whack-80d2c.appspot.com",
    messagingSenderId: "551123883781"
};
firebase.initializeApp(config);


