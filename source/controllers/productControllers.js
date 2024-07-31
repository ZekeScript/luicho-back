import ProductManager from '../managers/ProductManager.js'

const productManager = new ProductManager()

export const getAllProducts = async (request, response, next) => {
  try {
    const products = await productManager.getAll()
    response.json(products)
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (request, response, next) => {
  try {
    const { id } = request.params
    const product = await productManager.getById(id)
    if (!product) {
      response.json({ msg: 'Product not found' })
    } else {
      response.json(product)
    }
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (request, response, next) => {
  try {
    const newProduct = await productManager.create(request.body)
    if (!newProduct) {
      response.json({ msg: 'Error creating product' })
    } else {
      response.json(newProduct)
    }
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (request, response, next) => {
  try {
    const { id } = request.params
    const prodUpdate = await productManager.update(id, request.body)
    if (!prodUpdate) {
      response.json({ msg: 'Error updating product' })
    } else {
      response.json(prodUpdate)
    }
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (request, response, next) => {
  try {
    const { id } = request.params
    const prodDelete = await productManager.delete(id)
    if (!prodDelete) {
      response.json({ msg: 'Error delete product' })
    } else {
      response.json(prodDelete)
    }
  } catch (error) {
    next(error)
  }
}
