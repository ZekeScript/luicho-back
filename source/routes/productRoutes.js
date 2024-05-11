import { Router } from 'express'
import { __dirname } from '../path.js'
import ProductManager from '../managers/ProductManager.js'
import { productValidator } from '../middlewares/productValidator.js'
const productManager = new ProductManager(`${__dirname}/data/products.json`)

const router = Router()

// Crear una instancia de ProductManager para gestionar los datos de productos

// Ruta para obtener un número limitado de productos
router.get('/', async (request, response, next) => {
  try {
    // Extraer el límite de los parámetros de consulta
    const { limit } = request.query
    // Obtener todos los productos
    const productList = await productManager.getProducts()
    // Verificar si se proporcionó un límite y si es un número válido
    if (limit !== undefined && !isNaN(parseInt(limit))) {
      const limitValue = parseInt(limit)
      // Limitar el número de productos según limitValue
      const limitedProducts = productList.slice(0, limitValue)
      // Enviar respuesta con código de estado 200 y lista de productos limitada
      response.status(200).json(limitedProducts)
    } else {
      // Si no se proporciona un límite, o el límite no es un número válido, devolver todos los productos
      response.status(200).json(productList)
    }
  } catch (error) {
    // Enviar respuesta de error con código de estado 500
    next(error)
  }
})

// Ruta para agregar un nuevo producto
router.post('/', productValidator, async (request, response, next) => {
  try {
    // Agregar nuevo producto desde el cuerpo de la solicitud
    const productList = await productManager.addProduct(request.body)
    // Enviar respuesta con código de estado 201 y lista de productos actualizada
    response.status(201).json(productList)
  } catch (error) {
    // Enviar respuesta de error con código de estado 500
    next(error)
  }
})

// Ruta para obtener un producto por ID
router.get('/:productId', async (request, response, next) => {
  try {
    // Extraer el ID del producto de los parámetros de URL
    const { productId } = request.params
    // Buscar el producto por ID
    const productSearched = await productManager.getProductById(productId)
    // Enviar respuesta con código de estado 201 y el producto si se encuentra, de lo contrario, enviar 404
    productSearched
      ? response.status(201).json(productSearched)
      : response.status(404).json({ msg: 'Product not found' })
  } catch (error) {
    // Enviar respuesta de error con código de estado 500
    next(error)
  }
})

// Ruta para actualizar un producto
router.put('/:productId', async (request, response, next) => {
  try {
    // Extraer el ID del producto de los parámetros de URL
    const { productId } = request.params
    // Actualizar el producto con los nuevos datos del cuerpo de la solicitud
    const updatedProduct = await productManager.updateProduct(productId, request.body)
    // Enviar respuesta con código de estado 201 y el producto actualizado si tiene éxito, de lo contrario, enviar 404
    updatedProduct
      ? response.status(201).json(updatedProduct)
      : response.status(404).json({ msg: 'Error updating product' })
  } catch (error) {
    // Enviar respuesta de error con código de estado 500
    next(error)
  }
})

// Ruta para eliminar un producto
router.delete('/:productId', async (request, response, next) => {
  try {
    // Extraer el ID del producto de los parámetros de URL
    const { productId } = request.params
    // Eliminar el producto con el ID dado
    const newProductList = await productManager.deleteProduct(productId)
    // Enviar respuesta con código de estado 201 si tiene éxito, de lo contrario, enviar 404
    newProductList
      ? response.status(201).json({ msg: `Product id:${productId} deleted successfully` })
      : response.status(404).json({ msg: 'Error delete product' })
  } catch (error) {
    // Enviar respuesta de error con código de estado 500
    next(error)
  }
})

export default router
