import express from 'express'
import { products } from './source/products.js'

const app = express()

app.get('/home', (req, res) => {
  res.send('<>Hola mundo</>')
  // res.json(products)
  // res.redirect('/home)
  // res.render()
  // res.status(404).json({ msg: 'Error, no podes ingresar' })
})

app.get('/products', (req, res) => {
  // res.json(products)
  // console.log(req)
  // query
  const { value } = req.query
  console.log(value)
  const productsFilter = products.filter(p => p.price > parseInt(value))
  res.json(productsFilter)
})

app.get('/product/:id', (req, res) => {
  // params
  const { id } = req.params
  console.log(id)
  const prod = products.find(p => p.id === parseInt(id))
  if (prod) {
    res.json(prod)
  } else {
    res.json({ msg: 'Product not found' })
  }
})

// body

const PORT = 8080

app.listen(PORT, () => console.log(`Server ok ${PORT}`))
