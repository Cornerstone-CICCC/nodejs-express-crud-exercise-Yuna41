import { Router, Request, Response } from 'express'
import { Product } from '../types/product'
import { v4 as uuidv4 } from 'uuid'

const productRouter = Router()

const products: Product[] = []

// /products : GET request for all products
productRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(products)
})

// /products : POST request to add one product
productRouter.post('/', (req: Request<{}, {}, Omit<Product, 'id'>>, res: Response) => {
  const { product_name, product_description, product_price } = req.body
  const newProduct: Product = {
    id: uuidv4(),
    product_name,
    product_description,
    product_price
  }
  products.push(newProduct)
  res.status(200).json(newProduct)
})

// /products/:id : GET request to fetch one product based on id
productRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const found = products.find(p => p.id === id)
  if(!found){
    res.status(404).send("Product not found")
    return
  }
  res.status(200).json(found)
})

// /products/:id : PUT request to update one product based on id
productRouter.put('/:id', (req: Request<{ id: string }, {}, Partial<Product>>, res: Response) => {
  const { id } = req.params
  const foundIndex = products.findIndex(p => p.id === id)
  if(foundIndex === -1){
    res.status(404).send("Product not found.")
    return
  }
  const updatedProduct: Product = {
    ...products[foundIndex],
    product_name: req.body.product_name ?? products[foundIndex].product_name,
    product_description: req.body.product_description ?? products[foundIndex].product_description,
    product_price: req.body.product_price ?? products[foundIndex].product_price
  }
  products[foundIndex] = updatedProduct
  res.status(200).json(updatedProduct)
})

// /products/:id : DELETE request to delete one product based on id
productRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const index = products.findIndex(p => p.id === id)
  if(index === -1){
    res.status(404).send("Product not found")
    return
  }
  products.splice(index, 1)
  res.status(200).send("Product deleted.")
})

export default productRouter

