import { promises, existsSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { __dirname } from '../path.js'
import ProductManager from './ProductManager.js'
const productManager = new ProductManager(`${__dirname}/data/products.json`)

export default class CartManager {
  constructor (path) {
    this.path = path
  }

  async writeCarts (cart) {
    try {
      await promises.writeFile(this.path, JSON.stringify(cart))
    } catch (error) {
      console.log(error)
    }
  }

  async getCarts () {
    try {
      return existsSync(this.path)
        ? JSON.parse(await promises.readFile(this.path, 'utf8'))
        : []
    } catch (error) {
      console.log(error)
    }
  }

  async addCart () {
    try {
      const newCart = {
        id: uuidv4(),
        products: []
      }
      const cartList = await this.getCarts()
      const newCartList = [...cartList, newCart]
      await this.writeCarts(newCartList)
      return newCart
    } catch (error) {
      console.log(error)
    }
  }

  async getCartById (id) {
    try {
      const cartList = await this.getCarts()
      const cartSearched = cartList.find(cartEntry => cartEntry.id === id)
      if (!cartSearched) return null
      return cartSearched
    } catch (error) {
      console.log(error)
    }
  }

  async addToCart (idCart, idProduct) {
    try {
      const prodExist = await productManager.getProductById(idProduct)
      if (!prodExist) console.log("this product doesn't exist")
      const cartExist = await this.getCartById(idCart)
      if (!cartExist) console.log("this cart doesn't exist")
      const cartsFile = await this.getCarts()
      const existProdInCart = cartExist.products.find(prod => prod.id === idProduct)
      if (!existProdInCart) {
        const product = {
          id: idProduct,
          quantity: 1
        }
        cartExist.products.push(product)
      } else {
        existProdInCart.quantity++
      }
      const updatedCarts = cartsFile.map((cart) => {
        if (cart.id === idCart) return cartExist
        return cart
      })
      await this.writeCarts(updatedCarts)
      return cartExist
    } catch (error) {
      console.log(error)
    }
  }
}
