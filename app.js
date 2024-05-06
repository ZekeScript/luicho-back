import express from 'express'
import productRouter from './source/routes/productRoutes.js'

// Crear una instancia de Express
const app = express()

// Middleware para analizar las solicitudes JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products', productRouter)

// Puerto en el que el servidor escucha las solicitudes
const PORT = 8080

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server OK on port ${PORT}`)
})
