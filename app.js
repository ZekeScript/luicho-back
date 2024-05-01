import { express } from 'express'
import { products } from './source/products.js'

const app = express()

app.get('/', (req, res) => {
  res.json(products)
})

const PORT = 8080

app.listen(PORT, () => console.log(`Server ok${PORT}`))
