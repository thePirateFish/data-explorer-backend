const { gql } = require('apollo-server');

module.exports = gql
        `
            type Product {
                sku : String!
                title : String
                desc : String
                image_urls : [String!]
                url : String
                tags : [String!]
                category : [String!]
                specs : String
                details : String
                # artist_info : String
                # care_info : String
                price : String
                avail : String
                options : Options
                reviews: [Review!]
            }

            type Options {
                color : [String]
                size : [String]
            }

            type Review {
                sku : String!
                author : String
                rating : String
                title : String
                body : String
                date : String
                location : String
            }

            input ProductInput {
                sku : String!
                title : String
                desc : String
                image_urls : String
                url : String
                tags : String
                category : String
                specs : String
                details : String
                artist_info : String
                care_info : String
                price : String
                avail : String
                options : String
            }

            type Query{
                products: [Product!]!
                productsWithTagsAny(tags: [String!]!): [Product!]!
                product(sku: String!): Product!
            }

            type RootMutation {
                createProduct(productInput: ProductInput):Product
            }

            schema {
                query: Query
                mutation: RootMutation
            }
    `
;