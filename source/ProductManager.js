class ProductManager {
  // Inicializa el array de productos vacío
  constructor () {
    this.products = []
  }

  // Genera un ID único para los productos
  generateUniqueId () {
    return Math.random().toString(36).slice(2, 11)
  }

  // Agrega un producto al array de productos
  addProduct ({ product }) {
    const newProduct = this.createProduct({ ...product })
    // Evita la carga de productos con códigos duplicados
    if (this.products.some((existingProduct) => existingProduct.code === newProduct.code)) {
      return 'Ya existe un producto con ese codigo'
    } else {
      const updatedProducts = [...this.products, newProduct]
      this.products = updatedProducts
      return newProduct
    }
  }

  // Crea un objeto producto con los datos de entrada
  createProduct (title, description, price, thumbnail, code, stock) {
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
  getProducts () {
    return this.products
  }

  // Busca un producto por su ID
  getProductById (id) {
    const product = this.products.find(product => product.id === id)
    return (!product) ? 'product not found' : product
  }

  // Modica un producto por su ID usando los datos de entrada
  updateProduct (id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id)
    if (productIndex === -1) {
      throw new Error('Product not found')
    }
    this.products[productIndex] = { ...this.products[productIndex], ...updatedFields }
    return this.products[productIndex]
  }

  // Elimina un producto del array de productos usando su ID
  deleteProduct (id) {
    const newProducts = this.products.filter(product => product.id !== id)
    this.products = newProducts
    return newProducts
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
