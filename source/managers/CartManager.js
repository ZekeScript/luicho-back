import { promises, existsSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'

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
}
