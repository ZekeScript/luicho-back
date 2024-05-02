import { existsSync, promises } from 'fs'
import { vs as uuidv4 } from 'uuid'

export default class ProductManager {
  // Inicializa el array de productos vacío
  constructor (path) {
    this.path = path
  }

  // Devuelve todos los productos
  async getProducts () {
    try {
      return existsSync(this.path)
        ? JSON.parse(await promises.readFile(this.path, 'utf8'))
        : []
    } catch (error) {
      console.log(error)
    }
  }

  // Agrega un producto al array de productos
  async addProduct (product) {
    try {
      const newProduct = {
        id: uuidv4(),
        ...product
      }
      const products = await this.getProducts()
      // Evita la carga de productos con códigos duplicados
      if (products.some((existingProduct) => existingProduct.code === newProduct.code)) {
        return 'Ya existe un producto con ese codigo'
      } else {
        products.push(newProduct)
        await this.writeProducts(products)
        return newProduct
      }
    } catch (error) {
      console.log(error)
    }
  }

  async writeProducts (products) {
    try {
      await promises.writeFile(this.path, JSON.stringify(products))
    } catch (error) {
      console.log(error)
    }
  }

  // Busca un producto por su ID
  async getProductById (id) {
    try {
      const products = await this.getProducts()
      const product = products.find(product => product.id === id)
      return product || 'product not found'
    } catch (error) {
      console.log(error)
    }
  }

  // Modica un producto por su ID usando los datos de entrada
  async updateProduct (id, updatedFields) {
    try {
      const products = await this.getProducts()
      const productIndex = products.findIndex(product => product.id === id)
      if (productIndex === -1) {
        console.log('Product not found')
      }
      products[productIndex] = { ...products[productIndex], ...updatedFields }
      await this.writeProducts(products)
      return products[productIndex]
    } catch (error) {
      console.log(error)
    }
  }

  // Elimina un producto del array de productos usando su ID
  async deleteProduct (id) {
    try {
      const products = await this.getProducts()
      const newProducts = products.filter(product => product.id !== id)
      await this.writeProducts(newProducts)
      return newProducts
    } catch (error) {
      console.log(error)
    }
  }
}
