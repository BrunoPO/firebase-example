document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    // console.log(app);
    const db = firebase.firestore();
    document.write(`<h1 id="title"></h1><br/><input onchange="updatePost(event)">`);
    const myPost = db.collection('posts').doc('firstpost');
    myPost.onSnapshot( doc => { 
        // you can also use get with then, but you will not have a update changes get from the client side as snapshot does
        //.get().then(
            const data = doc.data();
            document.querySelector('#title').innerHTML += data.title + `<br>`;
            
            // document.append(data.title + `<br>`);
            // document.append(JSON.stringify(data) + `<br>`)
            // console.log(data);
        })
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log)
}

function updatePost(e) {
    //optimistic update or latency compensation
    // the firebase use this technic to avoid overflow on the calls and also has a more steady behaviour (for users that are always sending data)
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({title: e.target.value});
}
