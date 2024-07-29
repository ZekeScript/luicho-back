import { ProductModel } from '../models/productModel.js'

export default class ProductManager {
  // Devuelve todos los productos
  async getAll () {
    try {
      return await ProductModel.find({})
    } catch (error) {
      throw new Error(error)
    }
  }

  // Busca un producto por su ID
  async getById (id) {
    try {
      return await ProductModel.findById(id)
    } catch (error) {
      throw new Error(error)
    }
  }

  // Agrega un producto al array de productos
  async create (productData) {
    try {
    // se necesita await??
      return ProductModel.create(productData)
    } catch (error) {
      throw new Error(error)
    }
  }

  // Modica un producto por su ID usando los datos de entrada
  async update (id, updatedFields) {
    try {
      return await ProductModel.findByIdAndUpdate(id, updatedFields, { new: true })
    } catch (error) {
      throw new Error(error)
    }
  }

  // Elimina un producto del array de productos usando su ID
  async delete (id) {
    try {
      return await ProductModel.findByIdAndDelete(id)
    } catch (error) {
      throw new Error(error)
    }
  }
}
