let model = require('../models/productData');
let scraper = require('./scraperController');

exports.getAllProducts = (req, res) => {

    let products = model.getAll()
    products.then( ([data, metadata]) => {
        res.send(data)
    })
}

exports.getOneProduct = (req, res) => {
    let id = req.params.id

    let products = model.getOne(id)
    products.then( ([data, metadata]) => {
        res.send(data)
    })
}

exports.removeProduct = (req, res) => {
    let id = req.params.id

    let del = model.remove(id)
    del.then( ([data, metadata]) => {
        let products = model.getAll()
        products.then( ([data, metadata]) => {
            res.send(data)
        })
    })
}

exports.addProduct = async (req, res) => {
    // let prodUrl = req.body.prodUrl
    let prodUrl = "https://www.amazon.ca/AMD-Ryzen-3600-12-thread-processor/dp/B07STGGQ18"

    let scrapedInfo = await scraper.scrapeNewProduct(prodUrl)

    let name = scrapedInfo.title == null ? null : scrapedInfo.title
    let img = scrapedInfo.imgUrl == null ? null : scrapedInfo.imgUrl
    let price = scrapedInfo.price == null ? null : scrapedInfo.price
    let stock = scrapedInfo.stock == null ? null : scrapedInfo.stock

    let product = model.add(name, price, stock, img, prodUrl)
    product.then( ([data, metadata]) => {
        let products = model.getAll()
        products.then( ([data, metadata]) => {
            res.send(data)
        })
    })
}

exports.updateProducts = async (req, res) => {

    let urls = model.getUrls()
    urls.then( async ([data, metadata]) => {
        let scrapedInfo = await scraper.scrapeExisting(data)

        for (let i = 0; i < scrapedInfo.length; i++) {
            const info = scrapedInfo[i]

            let price = info.price == null ? null : info.price
            let stock = info.stock == null ? null : info.stock
            let url = info.prodUrl == null ? null : info.prodUrl

            var update = model.update(price, stock, url)
        }

        update.then( ([data, metadata]) => {
            let products = model.getAll()
            products.then( ([data, metadata]) => {
                res.send(data)
            })
        })
    })
}

