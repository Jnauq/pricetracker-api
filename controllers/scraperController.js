const puppeteer = require('puppeteer');

exports.scrapeExisting = async (products) => {

    var results = []
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    for (let i = 0; i < products.length; i++) {
        const url = products[i].prodUrl;

        await page.goto(url);
        var data = await page.evaluate(() => {

            let stockSelector = document.querySelector('#availability > .a-size-medium');
            let stock = stockSelector == null ? null : stockSelector.innerText;
            let priceSelector = document.querySelector('#price_inside_buybox');
            let price = priceSelector == null ? null : priceSelector.innerText;

            return {
                price, 
                stock,
            }
        })
        data.prodUrl = url;
        results.push(data);
    }

    browser.close();
    return results;
}


exports.scrapeNewProduct = async (url) => {

    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.goto(url);
    var data = await page.evaluate(() => {
        let title = document.querySelector('#productTitle').innerText;
        let imgUrl = document.querySelector('#imgTagWrapperId > img').src;
        let stockSelector = document.querySelector('#availability > .a-size-medium');
        let stock = stockSelector == null ? null : stockSelector.innerText;
        let priceSelector = document.querySelector('#price_inside_buybox');
        let price = priceSelector == null ? null : priceSelector.innerText;

        return {
            title,
            imgUrl, 
            price, 
            stock,
        }
    })

    browser.close();
    return data;
}