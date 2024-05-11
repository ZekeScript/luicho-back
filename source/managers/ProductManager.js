import { existsSync, promises } from 'fs'
import { v4 as uuidv4 } from 'uuid'

export default class ProductManager {
  // Inicializa el array de productos vacío
  constructor (path) {
    this.path = path
  }

  async writeProducts (products) {
    try {
      await promises.writeFile(this.path, JSON.stringify(products))
    } catch (error) {
      throw new Error(error)
    }
  }

  // Devuelve todos los productos
  async getProducts () {
    try {
      if (existsSync(this.path)) return JSON.parse(await promises.readFile(this.path, 'utf8'))
      else return []
    } catch (error) {
      throw new Error(error)
    }
  }

  // Agrega un producto al array de productos
  async addProduct (productData) {
    try {
      const newProduct = {
        id: uuidv4(),
        status: true,
        ...productData
      }
      const productList = await this.getProducts()

      // Evita la carga de productos con códigos duplicados
      if (productList.some((productEntry) => productEntry.code === newProduct.code)) {
        return 'Este producto ya existe'
      } else {
        const newProductList = [...productList, newProduct]
        await this.writeProducts(newProductList)
        return newProduct
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  // Busca un producto por su ID
  async getProductById (id) {
    try {
      const productList = await this.getProducts()
      const productSearched = productList.find(product => product.id === id)
      return productSearched || null
    } catch (error) {
      throw new Error(error)
    }
  }

  // Modica un producto por su ID usando los datos de entrada
  async updateProduct (id, updatedFields) {
    try {
      const productList = await this.getProducts()
      const productIndex = productList.findIndex(productEntry => productEntry.id === id)
      if (productIndex === -1) return null
      productList[productIndex] = { ...productList[productIndex], ...updatedFields }
      await this.writeProducts(productList)
      return productList[productIndex]
    } catch (error) {
      throw new Error(error)
    }
  }

  // Elimina un producto del array de productos usando su ID
  async deleteProduct (id) {
    try {
      const productList = await this.getProducts()
      if (productList.length > 0) {
        const userExist = await this.getProductById(id)
        if (userExist) {
          const newProductList = productList.filter(product => product.id !== id)
          await this.writeProducts(newProductList)
          return userExist
        }
      } else return null
    } catch (error) {
      throw new Error(error)
    }
  }
}
