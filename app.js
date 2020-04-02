const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const graphlHttp = require('express-graphql');
const admin = require('firebase-admin');
const bodyParser = require('body-parser')
const serviceAccount = require('./api/config/service-account');
const { ApolloServer } = require('apollo-server');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// admin.initializeApp({
//     credential: admin.credential.applicationDefault()
//   });
  
const db = admin.firestore();
const resolvers = require('./api/graphql/resolvers/index');
const typeDefs = require('./api/graphql/schemas/Product');


const server = new ApolloServer({ typeDefs, resolvers });


// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


// const graphqlResolvers = require('./api/graphql/resolvers/index');
// const graphqlSchemas = require('./api/graphql/schemas/Product');

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization");

//     if (req.method === "OPTIONS") {
//         res.header('Access-Control-Allow-Methods', 'POST,GET');
//         return res.status(200).json({});
//     }
//     next();
// });

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(cors());

// app.use('/api/v1/graphql', graphlHttp({
//     schema: graphqlSchemas, //Fetches our graphql Schema
//     rootValue: graphqlResolvers, // Fetches our Resolvers
//     graphiql: true // Gives us a user interface
// }));

// app.use('/favicon.ico', (req, res, next) => {
//     console.log('Handling route error0')
//     next()
// })
// app.use((req, res, next) => {
//     const error = new Error('Route Not Found');
//     error.status = 404;
//     next(error);
//     return res.status(404).send({
//         message: 'Route Not Found'
//     })
// });
// app.use((err, req, res) => {
//     res.status(err.status || 500);
//     res.json({
//         err: {
//             message: err.message
//         }
//     })
// });

// module.exports = app;