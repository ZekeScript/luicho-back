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
      throw new Error(error)
    }
  }

  async getCarts () {
    try {
      if (existsSync(this.path)) return JSON.parse(await promises.readFile(this.path, 'utf8'))
      else return []
    } catch (error) {
      throw new Error(error)
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
      throw new Error(error)
    }
  }

  async getCartById (id) {
    try {
      const cartList = await this.getCarts()
      const cartSearched = cartList.find(cart => cart.id === id)
      return cartSearched || null
    } catch (error) {
      throw new Error(error)
    }
  }

  async addToCart (idCart, idProduct) {
    try {
      // Verificar la existencia del producto
      const prodExist = await productManager.getProductById(idProduct)
      if (!prodExist) throw new Error("this product doesn't exist")

      // Verificar la existencia del carrito
      const cartExist = await this.getCartById(idCart)
      if (!cartExist) throw new Error("this cart doesn't exist")

      // Agregar producto al carrito
      const existProdInCart = cartExist.products.find((prod) => prod.id === idProduct)
      if (!existProdInCart) {
        const newProduct = {
          id: idProduct,
          quantity: 1
        }
        cartExist.products.push(newProduct)
      } else existProdInCart.quantity++

      // Actualizar los carritos
      const updatedCarts = (await this.getCarts()).map((cart) => {
        if (cart.id === idCart) return cartExist
        return cart
      })
      await this.writeCarts(updatedCarts)
      return cartExist
    } catch (error) {
      throw new Error(error)
    }
  }
}
