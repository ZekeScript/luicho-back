import { Router } from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productControllers.js'

const router = Router()

// Ruta para obtener un número limitado de productos
router.get('/', getAllProducts)

// Ruta para agregar un nuevo producto
router.post('/', createProduct)

// Ruta para obtener un producto por ID
router.get('/:productId', getProductById)

// Ruta para actualizar un producto
router.put('/:productId', updateProduct)

// Ruta para eliminar un producto
router.delete('/:productId', deleteProduct)

export default router
