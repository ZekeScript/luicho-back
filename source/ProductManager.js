const fs = require('fs')

class ProductManager {
  // Inicializa el array de productos vacío
  constructor (path) {
    this.path = path
  }

  // Devuelve todos los productos
  async getProducts () {
    try {
      if (fs.existsSync(this.path)) {
        const productsData = await fs.promises.readFile(this.path, 'utf8')
        return JSON.parse(productsData)
      } else return []
    } catch (error) {
      console.log(error)
    }
  }

  // Agrega un producto al array de productos
  async addProduct (product) {
    try {
      const products = await this.getProducts()
      const id = this.generateUniqueId()
      const newProduct = { ...product, id }
      // Evita la carga de productos con códigos duplicados
      if (products.some((existingProduct) => existingProduct.code === newProduct.code)) {
        return 'Ya existe un producto con ese codigo'
      } else {
        products.push(newProduct)
        await this.writeProducts(products)
        return newProduct
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Genera un ID único para los productos
  generateUniqueId () {
    return Math.random().toString(36).slice(2, 11)
  }

  async writeProducts (products) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products))
    } catch (error) {
      console.log(error)
    }
  }

  // Busca un producto por su ID
  async getProductById (id) {
    try {
      const products = await this.getProducts()
      const product = products.find(product => product.id === id)
      return product || 'product not found'
    } catch (error) {
      console.log(error)
    }
  }

  // Modica un producto por su ID usando los datos de entrada
  async updateProduct (id, updatedFields) {
    try {
      const products = await this.getProducts()
      const productIndex = products.findIndex(product => product.id === id)
      if (productIndex === -1) {
        console.log('Product not found')
      }
      products[productIndex] = { ...products[productIndex], ...updatedFields }
      await this.writeProducts(products)
      return products[productIndex]
    } catch (error) {
      console.log(error)
    }
  }

  // Elimina un producto del array de productos usando su ID
  async deleteProduct (id) {
    try {
      const products = await this.getProducts()
      const newProducts = products.filter(product => product.id !== id)
      await this.writeProducts(newProducts)
      return newProducts
    } catch (error) {
      console.log(error)
    }
  }
}

// Instancia de la clase ProductManager
const productManager = new ProductManager('./products.json')

const product1 = {
  title: 'Producto de prueba',
  description: 'Este es un producto de prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc',
  stock: 25
}
const product2 = {
  title: 'Producto de prueba',
  description: 'Este es un producto de prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'def',
  stock: 25
}
const product3 = {
  title: 'Producto de prueba',
  description: 'Este es un producto de prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'ghi',
  stock: 25
}
const product4 = {
  title: 'Producto de prueba',
  description: 'Este es un producto de prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'jkl',
  stock: 25
}
const product5 = {
  title: 'Producto de prueba',
  description: 'Este es un producto de prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'mno',
  stock: 25
}

const test = async () => {
  // Test: Array vacío de productos
  console.log('Test: Array vacío de productos')
  console.log(await productManager.getProducts())

  // Test: Agregar productos
  await productManager.addProduct(product1)
  await productManager.addProduct(product2)
  await productManager.addProduct(product3)
  await productManager.addProduct(product4)
  await productManager.addProduct(product5)

  // Obtener ids
  const products = await productManager.getProducts()
  const firstId = products[0].id
  const secondId = products[1].id
  const thirdId = products[2].id

  // Test: Listar productos
  console.log('Test: Listar productos')
  console.log(await productManager.getProducts())

  // Test: Búsqueda por ID (fallida)
  console.log('Test: Búsqueda por ID (fallida)')
  console.log(await productManager.getProductById(0))

  // Test: Modificar datos de un producto
  console.log('Test: Modificar datos de un producto')
  await productManager.updateProduct(firstId, { description: 'Este es un producto a sido modificado' })

  // Test: Búsqueda por ID (exitosa)
  console.log('Test: Búsqueda por ID (exitosa)')
  console.log(await productManager.getProductById(secondId))

  // Text: Borrar un producto
  console.log('Text: Borrar un producto')
  await productManager.deleteProduct(thirdId)

  console.log('Test: Listar productos')
  console.log(await productManager.getProducts())
}

test()
