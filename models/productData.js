const db = require('../database/db');

const getAll = () => {
    return db.execute("SELECT * FROM Products;")
}

const getOne = (id) => {
    return db.execute(`SELECT * FROM Products WHERE id = ${id};`)
}

const remove = (id) => {
    return db.execute(`DELETE FROM Products WHERE id = ${id};`)
}

const add = (name, price, stock, img, url) => {
    let sql = "INSERT into Products (prodName, price, stock, imgUrl, prodUrl) values (?, ?, ?, ?, ?)";

    return db.query(sql,[
        name, price, stock, img, url
    ], function(error, results){});
}

const update = (price, stock, url) => {
    return db.execute(`UPDATE Products SET price = '${price}', stock = '${stock}' WHERE prodUrl = '${url}';`)
}

const getUrls = () => {
    return db.execute("SELECT prodUrl FROM Products;");
}


module.exports = {
    getAll : getAll,
    getOne : getOne,
    remove : remove,
    add : add,
    getUrls : getUrls,
    update : update,
}