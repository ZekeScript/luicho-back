import ProductManager from '../managers/ProductManager.js'

const productManager = new ProductManager()

export const getAllProducts = async (request, response, next) => {
  try {
    const product = await productManager.getAll()
    response.json(product)
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (request, response, next) => {
  try {
    const { id } = request.params
    const product = await productManager.getById(id)
    response.json(
      product ||
      { msg: 'Product not found' }
    )
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (request, response, next) => {
  try {
    const newProduct = await productManager.create(request.body)
    response.json(newProduct || { msg: 'Error creating product' })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (request, response, next) => {
  try {
    const { id } = request.params
    const prodUpdate = await productManager.update(id, request.body)
    response.json(prodUpdate || { msg: 'Error updating product' })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (request, response, next) => {
  try {
    const { id } = request.params
    const prodDelete = await productManager.delete(id)
    response.json(prodDelete || { msg: 'Error delete product' })
  } catch (error) {
    next(error)
  }
}
