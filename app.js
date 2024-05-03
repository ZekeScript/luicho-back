import express from 'express'
import ProductManager from './source/ProductManager.js'

// Crear una instancia de ProductManager para gestionar los datos de productos
const productManager = new ProductManager('./products.json')

// Crear una instancia de Express
const app = express()

// Middleware para analizar las solicitudes JSON
app.use(express.json())

// Ruta para obtener productos basados en el valor de consulta
app.get('/products', async (request, response) => {
  try {
    // Obtener todos los productos
    const productList = await productManager.getProducts()
    // Enviar respuesta con código de estado 200 y lista de productos
    response.status(200).json(productList)
  } catch (error) {
    // Enviar respuesta de error con código de estado 500
    response.status(500).json({ msg: error.message })
  }
})

// Ruta para agregar un nuevo producto
app.post('/products', async (request, response) => {
  try {
    // Agregar nuevo producto desde el cuerpo de la solicitud
    const productList = await productManager.addProduct(request.body)
    // Enviar respuesta con código de estado 201 y lista de productos actualizada
    response.status(201).json(productList)
  } catch (error) {
    // Enviar respuesta de error con código de estado 500
    response.status(500).json({ msg: error.message })
  }
})

// Ruta para obtener un número limitado de productos
app.get('/products', async (request, response) => {
  try {
    // Extraer el límite de los parámetros de consulta
    const { limit } = request.query
    const limitValue = parseInt(limit)
    // Obtener todos los productos
    const productList = await productManager.getProducts()
    // Limitar el número de productos según limitValue
    console.log(productList.slice(0, 2))
    const limitedProducts = (productList.length > limitValue)
      ? productList.slice(0, limitValue)
      : productList
    // Enviar respuesta con código de estado 201 y lista de productos limitada
    response.status(201).json(limitedProducts)
  } catch (error) {
    // Enviar respuesta de error con código de estado 500
    response.status(500).json({ msg: error.message })
  }
})

// Ruta para obtener un producto por ID
app.get('/products/:productId', async (request, response) => {
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
    response.status(500).json({ msg: error.message })
  }
})

// Ruta para actualizar un producto
app.put('/products/:productId', async (request, response) => {
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
    response.status(500).json({ msg: error.message })
  }
})

// Ruta para eliminar un producto
app.delete('/products/:productId', async (request, response) => {
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
    response.status(500).json({ msg: error.message })
  }
})

// Puerto en el que el servidor escucha las solicitudes
const PORT = 8080

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server OK on port ${PORT}`)
})
