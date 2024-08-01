import express from 'express'
import productsRouter from './routes/productRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { initMongoDB } from './data/database.js'

// Crear una instancia de Express
const app = express()

// Middleware para analizar las solicitudes JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products', productsRouter)

app.use(errorHandler)

initMongoDB()

// Puerto en el que el servidor escucha las solicitudes
const PORT = 8080

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server OK on port ${PORT}`))
