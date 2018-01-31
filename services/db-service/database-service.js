// Initialize Firebase
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
    var dbRef = firebase.database().ref(dbName);
    dbRef.once('value').then(function(snap) {
        cb(snap.val(), null);
    }).catch(function(err) {
        cb(null, err)
    });
}

export function writeData(dbName, value, cb) {
    var dbRef = firebase.database().ref(dbName);
    var newRecipe = dbRef.push();
    newRecipe.set(value).then(function() {
        cb();
    }).catch(function(err) {
        cb(err);
    })
}

export function deleteData(dbName, id, cb) {
    var dbRef = firebase.database().ref(dbName + id);
    dbRef.remove().then(function() {
        cb();
    }).catch(function(err) {
        cb(err);
    });
}
