import ProductManager from '../manager/ProductManager.js'

const productManager = new ProductManager()

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productManager.getAll()
    res.json(products)
  } catch (error) {
    next(error.msg)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await productManager.getById(id)
    if (!product) {
      res.status(404).json({ msg: 'Product not found' })
    } else {
      res.json(product)
    }
  } catch (error) {
    next(error.msg)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productManager.create(req.body)
    if (!newProduct) {
      res.status(404).json({ msg: 'Error creating product' })
    } else {
      res.json(newProduct)
    }
  } catch (error) {
    next(error.msg)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const prodUpdate = await productManager.update(id, req.body)
    if (!prodUpdate) {
      res.status(404).json({ msg: 'Error updating product' })
    } else {
      res.json(prodUpdate)
    }
  } catch (error) {
    next(error.msg)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const prodDelete = await productManager.delete(id)
    if (!prodDelete) {
      res.status(404).json({ msg: 'Error delete product' })
    } else {
      res.json(prodDelete)
    }
  } catch (error) {
    next(error.msg)
  }
}
