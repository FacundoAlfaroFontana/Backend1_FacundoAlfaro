import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import Cart from '../models/Cart.js';

const router = Router();
// Creo una instancia del manejador de productos, que usa un archivo JSON.
const productManager = new ProductManager('src/productos.json');

// 🏠 Página principal: muestra la lista de productos.
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

// 🔁 Página de productos en tiempo real.
// Se usa para ver los productos actualizados al instante.
router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

// 🛒 Página de un carrito específico.
// Busca el carrito por ID y muestra sus productos.
router.get('/carts/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;

    // Busca el carrito y trae los datos de cada producto.
    const cart = await Cart.findById(cid).populate('products.product');

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    // Muestra la vista del carrito.
    res.render('cart', { cart });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al mostrar carrito');
  }
});

export default router;
