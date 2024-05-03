import express from 'express'
import ProductManager from './source/ProductManager.js'

const productManager = new ProductManager('./products.json')

// Crear una instancia de Express
const app = express()

app.use(express.json())

// Ruta para obtener productos basados en el valor de consulta
app.get('/products', async (request, response) => {
  try {
    const productList = await productManager.getProducts()
    response.status(200).json(productList)
  } catch (error) {
    response.status(500).json({ msg: error.message })
  }
})

app.post('/products', async (request, response) => {
  try {
    const productList = await productManager.addProduct(request.body)
    response.status(201).json(productList)
  } catch (error) {
    response.status(500).json({ msg: error.message })
  }
})

app.get('/products', async (request, response) => {
  try {
    const { limit } = request.query
    const limitValue = parseInt(limit)
    const productList = await productManager.getProducts()
    console.log(productList.slice(0, 2))
    const limitedProducts = (productList.length > limitValue)
      ? productList.slice(0, limitValue)
      : productList
    response.status(201).json(limitedProducts)
  } catch (error) {
    response.status(500).json({ msg: error.message })
  }
})

app.get('/products/:productId', async (request, response) => {
  try {
    const { productId } = request.params
    const productSearched = await productManager.getProductById(productId)
    productSearched
      ? response.status(201).json(productSearched)
      : response.status(404).json({ msg: 'Product not found' })
  } catch (error) {
    response.status(500).json({ msg: error.message })
  }
})

app.put('/products/:productId', async (request, response) => {
  try {
    const { productId } = request.params
    const updatedProduct = await productManager.updateProduct(productId, request.body)
    updatedProduct
      ? response.status(201).json(updatedProduct)
      : response.status(404).json({ msg: 'Error updating product' })
  } catch (error) {
    response.status(500).json({ msg: error.message })
  }
})

app.delete('/products/:productId', async (request, response) => {
  try {
    const { productId } = request.params
    const newProductList = await productManager.deleteProduct(productId)
    newProductList
      ? response.status(201).json({ msg: `Product id:${productId} deleted successfully` })
      : response.status(404).json({ msg: 'Error delete product' })
  } catch (error) {
    response.status(500).json({ msg: error.message })
  }
})

// Puerto en el que el servidor escucha las solicitudes
const PORT = 8080

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server OK on port ${PORT}`)
})
