import http from 'http'
import { products } from './source/products.js'

const server = http.createServer((req, res) => {
  if (req.url === '/home') {
    res.end('home')
  }
  console.log(req.url)
  if (req.url === '/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
  }
})

server.listen(8080, () => console.log('Server ok en puerto 8080'))
