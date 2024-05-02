import express from 'express'
import { products as productList } from './source/products.js'

// Crear una instancia de Express
const app = express()

// Ruta para la página de inicio
app.get('/home', (request, response) => {
  // Devolver un mensaje de saludo simple
  response.send('<>Hello world</>')
  // Otras opciones como res.json(products), res.redirect('/home), res.render(), res.status(404).json({ msg: 'Error, no puedes ingresar' })
})

// Ruta para obtener productos basados en el valor de consulta
app.get('/products', (request, response) => {
  // Obtener el valor de la consulta
  const { minPrice } = request.query
  const minPriceValue = parseInt(minPrice)
  // Filtrar productos basados en el precio
  const filteredProducts = productList.filter(product => product.price > minPriceValue)
  // Devolver los productos filtrados
  response.json(filteredProducts)
})

// Ruta para obtener un producto por su ID
app.get('/product/:id', (request, response) => {
  // Obtener el ID del parámetro de la URL
  const { id } = request.params
  const productId = parseInt(id)
  // Buscar el producto por su ID
  const product = productList.find(product => product.id === productId)
  // Devolver el producto si se encuentra, de lo contrario, devolver un mensaje
  product ? response.json(product) : response.json({ msg: 'Product not found' })
})

// body

// Puerto en el que el servidor escucha las solicitudes
const PORT = 8080

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server OK on port ${PORT}`)
})
