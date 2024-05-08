import { Router } from 'express'
import CartManager from '../managers/CartManager.js'
import { __dirname } from '../path.js'
const router = Router()
const cartManager = new CartManager(`${__dirname}/data/cart.json`)

router.post('/', async (request, response) => {
  try {
    const cartList = await cartManager.addCart()
    response.status(201).json(cartList)
  } catch (error) {
    console.log(error)
  }
})

export default router
