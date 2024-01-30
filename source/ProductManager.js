class ProductManager {
  //iniciar array de productos como array vacio
  constructor() {
    this.products = [];
  }

  //generacion de id unico
  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  //agregacion de productos al array
  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      //campos por convencion
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      //hardcodeo el primer id para probar el funcionamiento de la busqueda por id posteriormente
      id: this.products.length > 0 ? this.generateUniqueId() : 1,
    };
    //evito la carga repetida de productos comparando el codigo del producto
    if (this.products.some((product) => product.code === code)) {
      return `Ya existe un producto con ese codigo`;
    } else {
      this.products.push(product);
    }
  }

  //retorno lista de productos
  getProducts() {
    return this.products;
  }

  //busqueda de productos mediante id
  getProductById(searchedId) {
    return (
      this.products.find((product) => product.id === searchedId) ||
      `no existe producto con el id ${searchedId}`
    );
  }
}

//instanciacion de la clase padre
const prodMgr = new ProductManager();

//test de creacion de lista como array vacio
console.log(prodMgr.getProducts());

//test de carga de productos
prodMgr.addProduct(
  "producto prueba 1",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
//test de carga repetida
prodMgr.addProduct(
  "producto prueba 1",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
prodMgr.addProduct(
  "producto prueba 2",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "def456",
  25
);

//test listado de productos
console.log(prodMgr.getProducts());

//test busqueda por id failure path
console.log(prodMgr.getProductById(0));

//test busqueda por id success path
console.log(prodMgr.getProductById(1));
