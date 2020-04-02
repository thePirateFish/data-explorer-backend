const {databaseCollection, getAllProducts, getProductsWithTagsAny, getProduct, getReviews} = require('../../model/database');

function getProductObject(fetchedProduct) {
    return {
        sku: fetchedProduct.get('sku'),
        title: fetchedProduct.get('title'),
        desc: fetchedProduct.get('desc'),
        image_urls: fetchedProduct.get('image_urls'),
        url: fetchedProduct.get('url'),
        tags: fetchedProduct.get('tags'),
        category: fetchedProduct.get('category'),
        specs: fetchedProduct.get('specs'),
        details: fetchedProduct.get('details'),
        price: fetchedProduct.get('price'),
        avail: fetchedProduct.get('avail'),
        options: fetchedProduct.get('options')
    }
}

function getReviewObject(fetchedReview) {
    return {
        sku : fetchedReview.get('sku'),
        author : fetchedReview.get('author'),
        rating : fetchedReview.get('rating'),
        title : fetchedReview.get('title'),
        body : fetchedReview.get('body'),
        date : fetchedReview.get('date'),
        location : fetchedReview.get('location')
    }
}

module.exports = {
    Query: {
        products: async (args) => {
            try {
                const fetchedProducts = await getAllProducts();
                return fetchedProducts.docs.map(products => getProductObject(products));
    
            } catch (err) {
                throw err;
            }
        },
        productsWithTagsAny: async (parent, args, context, info) => {
            try {
                const fetchedProducts = await getProductsWithTagsAny(args.tags);
                return fetchedProducts.docs.map(products =>  getProductObject(products));
            } catch (err) {
                throw err;
            }
        },
        product: async (parent, args, context, info) => {
            try {
                const fetchedProduct = await getProduct(args.sku);
                return getProductObject(fetchedProduct);

            } catch (err) {
                throw err;
            }
        }

    },
    Product: {
        reviews: async (parent) => {
            const fetchedReviews = await getReviews(parent.sku);
            return fetchedReviews.docs.map(reviews => getReviewObject(reviews));
        }
    },
    RootMutation: {
        createProduct: async (args) => {
            try {
                const product = {
                    sku: args.productInput.sku,
                    title: args.productInput.title,
                    desc: args.productInput.desc,
                    image_urls: args.productInput.image_urls,
                    url: args.productInput.url,
                    tags: args.productInput.tags,
                    category: args.productInput.category,
                    specs: args.productInput.specs,
                    details: args.productInput.details,
                    artist_info: args.productInput.artist_info,
                    care_info: args.productInput.care_info,
                    price: args.productInput.price,
                    avail: args.productInput.avail,
                    options: args.productInput.options
                };
                const savedProduct = await databaseCollection.add(product);
                return {
                    sku: product.sku,
                    title: product.title,
                    desc: product.desc,
                    image_urls: product.image_urls,
                    url: product.url,
                    tags: product.tags,
                    category: product.category,
                    specs: product.specs,
                    details: product.details,
                    artist_info: product.artist_info,
                    care_info: product.care_info,
                    price: product.price,
                    avail: product.avail,
                    options: product.options
                }
            } catch (err) {
                throw err;
            }
        }
    }
}