import fs from "fs";
import qs from "qs"
import userService from "../service/userService.js";


class UserController {
    showAll(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'GET') {
                showList(req, res);
            } else {
                data = qs.parse(data);
               userService.save(data).then(() =>{
                  showList(req, res);  
                })
                
            }
        })
    }
    
    showErr(req, res) {
        fs.readFile('view/err.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    addCart(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'POST') {
                data = qs.parse(data);
                userService.addCart(data)
                console.log('add sp thanh cong');
                showList(req, res);
            }
        })
    }

    showCart(req, res) {
        fs.readFile('view/user/cart.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            let totalPrice = 0;
            userService.showAll().then((carts)=> {
                console.log(carts);
                for (const cart of carts) {
                totalPrice += cart.price * cart.quantity;
                   str += `                                            <tr>
                        <td>
                            <img src="${cart.image}" class="img-fluid">
                            ${cart.name}
                        </td>
                        <td>
                            ${cart.price}$
                        </td>
                        <td>
                            <input type="number" min="1" value="${cart.quantity}">
                        </td>
                        <td>
                            ${cart.price}$
                        </td>
                        <td>
                            <button class="btn btn-link text-danger"><i class="fas fa-times"></i></button>
                        </td>
                    </tr>`
                }
                stringHTML = stringHTML.replace('###totalPrice###', totalPrice)
                stringHTML = stringHTML.replace('###product###', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }
}
function showList(req, res) {
    fs.readFile('view/user/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        userService.findAll().then((products)=> {
            for (const product of products) {
                str += `<div class="col-lg-3 col-sm-6 my-3">
                        <form action="/add-cart" method="POST">
                            <div class="col-12 bg-white text-center h-100 product-item">
                                <div class="row h-100">
                                    <div class="col-12 p-0 mb-3">
                                        <a href="product.html">
                                            <img src="${product.image}" class="img-fluid">
                                        </a>
                                    </div>
                                    <div class="col-12 mb-3">
                                        <a href="product.html" class="product-name">${product.name}</a>
                                    </div>
                                    <div class="col-12 mb-3">
                                        <span class="product-price">
                                        ${product.price}$
                                        </span>
                                    </div>
                                    <input name="productId" type="hidden" value="${product.id}"/>
                                    <div class="col-12 mb-3 align-self-end">
                                        <button class="btn btn-outline-dark" type="submit" onclick="addToCart(${product.id})">
                                        <i class="fas fa-cart-plus me-2"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>`
            }
            stringHTML = stringHTML.replace('###list###', str)
            res.write(stringHTML);
            res.end();
        })
    })
}
export default new UserController();
