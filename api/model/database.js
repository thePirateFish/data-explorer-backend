const firebaseAdmin = require('firebase-admin');
const database = firebaseAdmin.firestore();
const settings = {timestampsInSnapshots: true};
database.settings(settings);

const databaseCollection = database.collection('products');

function getAllProducts(){
    return databaseCollection.orderBy('sku').limit(10).get();
}

function getProductsWithTagsAny(tags) {
    return databaseCollection.where('tags', 'array-contains-any', tags).get()
}

function getProduct(sku) {
    return databaseCollection.doc(sku).get();
}

function getReviews(sku) {
    return databaseCollection.doc(sku).collection('reviews').get();
}

module.exports = {
    databaseCollection: databaseCollection,
    getAllProducts: getAllProducts,
    getProductsWithTagsAny : getProductsWithTagsAny,
    getProduct: getProduct,
    getReviews: getReviews,
};