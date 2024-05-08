import express from 'express'
import cartRouter from './source/routes/cartRoutes.js'
import productRouter from './source/routes/productRoutes.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { errorHandler } from './source/middlewares/errorHandler.js'
const __dirname = dirname(fileURLToPath(import.meta.url))

// Crear una instancia de Express
const app = express()

// Middleware para analizar las solicitudes JSON
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)

app.use(errorHandler)

// Puerto en el que el servidor escucha las solicitudes
const PORT = 8080

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server OK on port ${PORT}`)
})
