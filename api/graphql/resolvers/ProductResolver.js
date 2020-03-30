const {databaseCollection,getAllProducts} = require('../../model/database');


module.exports = {
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
    },

    products: async () => {
        try {
            const fetchedProducts = await getAllProducts();

            return await fetchedProducts.docs.map(products => {
                return {
                    sku: products._fieldsProto.sku.stringValue,
                    title: products._fieldsProto.title ? products._fieldsProto.title.stringValue: 'null',
                    desc: products._fieldsProto.desc ? products._fieldsProto.desc.stringValue: 'null',
                    image_urls: products._fieldsProto.image_urls ? products._fieldsProto.image_urls.stringValue: 'null',
                    url: products._fieldsProto.url ? products._fieldsProto.url.stringValue: 'null',
                    tags: products._fieldsProto.tags ? products._fieldsProto.tags.stringValue: 'null',
                    category: products._fieldsProto.category ? products._fieldsProto.category.stringValue: 'null',
                    specs: products._fieldsProto.specs ? products._fieldsProto.specs.stringValue: 'null',
                    details: products._fieldsProto.details ? products._fieldsProto.details.stringValue: 'null',
                    artist_info: products._fieldsProto.artist_info ? products._fieldsProto.artist_info.stringValue: 'null',
                    care_info: products._fieldsProto.care_info ? products._fieldsProto.care_info.stringValue: 'null',
                    price: products._fieldsProto.price ? products._fieldsProto.price.stringValue: 'null',
                    avail: products._fieldsProto.avail ? products._fieldsProto.avail.stringValue: 'null',
                    options: products._fieldsProto.options ? products._fieldsProto.options.stringValue : 'null'
                }
            });

        } catch (err) {
            throw err;
        }
    }
};