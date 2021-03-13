document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    // console.log(app);
    const db = firebase.firestore();
    const productsRef = db.collection('products');
    const query = productsRef.where('price', '>', 10).orderBy('price', 'desc').limit(2);
    query.get().then(products => {
        products.forEach(doc => {
            const data = doc.data();
            console.log(data);
            document.write(`${data.name} at ${data.price} <br/>`);
        })
    })
});