class ProductManager {
  // iniciar array de productos vacio
  constructor () {
    this.products = []
  }

  // generar id unico
  generateUniqueId () {
    return Math.random().toString(36).slice(2, 11)
  }

  // agregar producto
  addProduct (title, description, price, thumbnail, code, stock) {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.products.length > 0 ? this.generateUniqueId() : 1
    }
    // evitar carga repetida
    if (this.products.some((product) => product.code === code)) {
      return 'Ya existe un producto con ese codigo'
    } else {
      this.products.push(product)
    }
  }

  // listar productos
  getProducts () {
    return this.products
  }

  // busqueda x id
  getProductById (searchedId) {
    return (
      this.products.find((product) => product.id === searchedId) ||
      `no existe producto con el id ${searchedId}`
    )
  }
}

// instancia clase padre
const prodMgr = new ProductManager()

// test array vacio
console.log(prodMgr.getProducts())

// test agregar producto
prodMgr.addProduct(
  'producto prueba 1',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
)
// test de carga repetida
prodMgr.addProduct(
  'producto prueba 1',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
)
prodMgr.addProduct(
  'producto prueba 2',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'def456',
  25
)

// test listada de productos
console.log(prodMgr.getProducts())

// test busqueda x id; failure path
console.log(prodMgr.getProductById(0))

// test busqueda x id; success path
console.log(prodMgr.getProductById(1))
