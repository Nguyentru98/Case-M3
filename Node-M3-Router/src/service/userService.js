import connection from "../connection.js";


class UserService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('SELECT * FROM quanlybanhang.products;', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(products)
                    resolve(products)
                }
            })
        })
    }
    addCart(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO carts (productId,quantity , userId) VALUES ('${product.productId}', 1, 1);`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('them san pham vao gio hang thanh cong')       
                    resolve(data)
                }
            })
        })

    }

    showAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`SELECT * FROM products JOIN carts ON products.id = carts.productId`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('get carts')       
                    resolve(data)
                }
            })
        })
    }
}


export default new UserService();
