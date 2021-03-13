document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    // console.log(app);
    // const db = firebase.firestore();
    // const productsRef = db.collection('products');
});



function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.querySelector('#auth-button').style.display = 'none';
            document.querySelector('#auth-message').innerHTML = `Hello ${user.displayName}`;
            console.log(user);
        })
        .catch(console.log)
}

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const horseRef = storageRef.child('horse.png');
    const file = files.item(0);
    const task = horseRef.put(file);
    task.then(snapshot=>{
        console.log(snapshot);
        // const url = snapshot.downloadURL this command is deprecated
        snapshot.ref.getDownloadURL().then(url => {
            document.querySelector('#imgUpload').setAttribute('src', url);
        });
    })
}
