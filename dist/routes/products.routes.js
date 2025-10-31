"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
const products = [];
// /products : GET request for all products
productRouter.get('/', (req, res) => {
    res.status(200).json(products);
});
// /products : POST request to add one product
productRouter.post('/', (req, res) => {
    const { product_name, product_description, product_price } = req.body;
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name,
        product_description,
        product_price
    };
    products.push(newProduct);
    res.status(200).json(newProduct);
});
// /products/:id : GET request to fetch one product based on id
productRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const found = products.find(p => p.id === id);
    if (!found) {
        res.status(404).send("Product not found");
        return;
    }
    res.status(200).json(found);
});
// /products/:id : PUT request to update one product based on id
productRouter.put('/:id', (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const foundIndex = products.findIndex(p => p.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found.");
        return;
    }
    const updatedProduct = Object.assign(Object.assign({}, products[foundIndex]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[foundIndex].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[foundIndex].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[foundIndex].product_price });
    products[foundIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
});
// /products/:id : DELETE request to delete one product based on id
productRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(index, 1);
    res.status(200).send("Product deleted.");
});
exports.default = productRouter;
