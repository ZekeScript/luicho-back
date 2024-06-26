import express from 'express'
import cartRouter from './routes/cartRoutes.js'
import productRouter from './routes/productRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { __dirname } from './path.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/viewsRoutes.js'

// Crear una instancia de Express
const app = express()

// Middleware para analizar las solicitudes JSON
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)
app.use('/', viewsRouter)

app.use(errorHandler)

// Puerto en el que el servidor escucha las solicitudes
const PORT = 8080

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server OK on port ${PORT}`))
