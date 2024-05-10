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

router.get('/:cartId', async (request, response) => {
  try {
    const { cartId } = request.params
    const cartSearched = await cartManager.getCartById(cartId)
    cartSearched
      ? response.status(200).json(cartSearched)
      : response.status(404).json({ msg: 'Cart not found' })
  } catch (error) {
    console.log(error)
  }
})

router.post('/:cartId/product/:productId', async (request, response, next) => {
  try {
    const { idCart } = request.params
    const { idProd } = request.params
    const cartUpdated = await cartManager.addToCart(idCart, idProd)
    response.json(cartUpdated)
  } catch (error) {
    next(error)
  }
})

export default router
