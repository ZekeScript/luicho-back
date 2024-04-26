const { existsSync, promises } = require('graceful-fs')

class ProductManager {
  // Inicializa el array de productos vacío
  constructor (path) {
    this.path = path
  }

  // Genera un ID único para los productos
  generateUniqueId () {
    return Math.random().toString(36).slice(2, 11)
  }

  // Agrega un producto al array de productos
  async addProduct ({ product }) {
    try {
      const newProduct = this.createProduct({ ...product })
      const products = await this.getProducts()
      // Evita la carga de productos con códigos duplicados
      if (products.some((existingProduct) => existingProduct.code === newProduct.code)) {
        return 'Ya existe un producto con ese codigo'
      } else {
        const updatedProducts = [...products, newProduct]
        await this.writeProducts(updatedProducts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Crea un objeto producto con los datos de entrada
  createProduct ({ title, description, price, thumbnail, code, stock }) {
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.generateUniqueId()
    }
    return newProduct
  }

  // Devuelve todos los productos
  async getProducts () {
    try {
      if (existsSync(this.path)) {
        const productsData = await promises.readFile(this.path, 'utf8')
        return JSON.parse(productsData)
      } else {
        return []
      }
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async writeProducts (products) {
    try {
      await promises.writeFile(this.path, JSON.stringify(products, null, 2))
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
      const products = this.getProducts()
      const productIndex = products.findIndex(product => product.id === id)
      if (productIndex === -1) {
        throw new Error('Product not found')
      }
      products[productIndex] = { ...products[productIndex], ...updatedFields }
      return products[productIndex]
    } catch (error) {
      console.log(error)
    }
  }

  // Elimina un producto del array de productos usando su ID
  async deleteProduct (id) {
    try {
      const products = this.getProducts()
      const newProducts = products.filter(product => product.id !== id)
      await this.writeProducts(newProducts)
      return newProducts
    } catch (error) {
      console.log(error)
    }
  }
}

// Instancia de la clase ProductManager
const productManager = new ProductManager()

// Test: Array vacío de productos
console.log(productManager.getProducts())

// Test: Agregar productos
productManager.addProduct(
  'producto prueba 1',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
)
// Test: Carga repetida
productManager.addProduct(
  'producto prueba 1',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
)
productManager.addProduct(
  'producto prueba 2',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'def456',
  25
)

// Test: Listar productos
console.log(productManager.getProducts())

// Test: Búsqueda por ID (fallida)
console.log(productManager.getProductById(0))

// Test: Búsqueda por ID (éxito)
console.log(productManager.getProductById(1))
