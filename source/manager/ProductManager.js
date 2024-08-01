import { ProductModel } from '../../models/productModel.js'

export default class ProductManager {
  // Devuelve todos los productos
  async getAll () {
    try {
      const response = await ProductModel.find({})
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  // Busca un producto por su ID
  async getById (id) {
    try {
      const response = await ProductModel.findById(id)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  // Agrega un producto al array de productos
  async create (productData) {
    try {
    // se necesita await??
      const response = ProductModel.create(productData)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  // Modica un producto por su ID usando los datos de entrada
  async update (id, updatedFields) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, updatedFields, { new: true })
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  // Elimina un producto del array de productos usando su ID
  async delete (id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
