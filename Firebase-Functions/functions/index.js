const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(process.env.FIREBASE_CONFIG);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Is need an account to test it
// firebase deploy --only functions
exports.sendMessage = functions.firestore
    .document("products/{productId")
    .onCreate((snapshot, context) => {
      const docId = context.params.productId;
      const name = snapshot.data().name;
      // .onCreate((event) => {
      //   const docId = event.params.productId;
      //   const name = event.paramsdata.data().name;
      const productRef = admin.firestore().collection("products").doc(docId);
      return productRef.update({
        message: `Nice ${name}! - Love Cloud Functions`,
      });
    });
