const {buildSchema} = require('graphql');
// language=GraphQL Schema
module.exports = buildSchema(
        `
            type Product {
                sku : String!
                title : String!
                desc : String!
                image_urls : String!
                url : String!
                tags : String!
                category : String!
                specs : String!
                details : String!
                artist_info : String!
                care_info : String!
                price : String!
                avail : String!
                options : String!
            }

            input ProductInput {
                sku : String!
                title : String!
                desc : String!
                image_urls : String!
                url : String!
                tags : String!
                category : String!
                specs : String!
                details : String!
                artist_info : String!
                care_info : String!
                price : String!
                avail : String!
                options : String!
            }

            type RootQuery{
                products: [Product!]!
            }

            type RootMutation {
                createProduct(productInput: ProductInput):Product
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
    `
);