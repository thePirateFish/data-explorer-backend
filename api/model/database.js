const firebaseAdmin = require('firebase-admin');
const database = firebaseAdmin.firestore();
const settings = {timestampsInSnapshots: true};
database.settings(settings);

const databaseCollection = database.collection('products');

function getAllProducts(){
    return databaseCollection.orderBy('sku').limit(10).get();
}

module.exports = {
    databaseCollection: databaseCollection,
    getAllProducts: getAllProducts
};