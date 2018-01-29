export var recipes = [];

var config = {
    apiKey: "AIzaSyCqHk8WkuwnAgCC_mimicFaBQqgwSMar3c",
    authDomain: "team9-recipe-book.firebaseapp.com",
    databaseURL: "https://team9-recipe-book.firebaseio.com",
    projectId: "team9-recipe-book",
    storageBucket: "team9-recipe-book.appspot.com",
    messagingSenderId: "792166497012"
};
firebase.initializeApp(config);

export function getData(dbName, cb) {
    // Initialize Firebase
    var dbRef = firebase.database().ref(dbName);
    dbRef.on('value', function(snap) {
        cb(snap.val(), null);
    });
}

export function writeData(dbName, value, cb) {
    var dbRef = firebase.database().ref(dbName);
    var newRecipe = dbRef.push();
    newRecipe.set(value, function (err) {
        cb(err);
    });
}
