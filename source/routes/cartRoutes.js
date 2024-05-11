import { Router } from 'express'
import CartManager from '../managers/CartManager.js'
import { __dirname } from '../path.js'

const router = Router()

const cartManager = new CartManager(`${__dirname}/data/carts.json`)

router.post('/', async (request, response, next) => {
  try {
    const cartList = await cartManager.addCart()
    response.status(201).json(cartList)
  } catch (error) {
    next(error)
  }
})

router.get('/:cartId', async (request, response, next) => {
  try {
    const { cartId } = request.params
    response.status(200).json(await cartManager.getCartById(cartId))
  } catch (error) {
    next(error)
  }
})

router.post('/:cartId/product/:productId', async (request, response, next) => {
  try {
    const { cartId } = request.params
    const { productId } = request.params
    const cartUpdated = await cartManager.addToCart(cartId, productId)
    response.json(cartUpdated)
  } catch (error) {
    next(error)
  }
})

export default router
