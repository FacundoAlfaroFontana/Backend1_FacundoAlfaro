import { Router } from 'express';
import Product from '../models/Product.js'; // ✅ Ahora usamos Mongoose directamente
import Cart from '../models/Cart.js';

const router = Router();

// 🏠 Página principal: muestra la lista de productos.
// Ahora trae productos directamente desde Mongo, no desde JSON.
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean(); // ✅ .lean() hace más liviana la consulta para Handlebars
    res.render('home', { products });
  } catch (error) {
    console.error('Error al renderizar home:', error);
    res.status(500).send('Error al mostrar productos');
  }
});

// 🔁 Página de productos en tiempo real.
// También ahora usa Mongo.
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('realTimeProducts', { products });
  } catch (error) {
    console.error('Error al renderizar realTimeProducts:', error);
    res.status(500).send('Error al mostrar productos en tiempo real');
  }
});

// 🛒 Página de un carrito específico.
// Esto no cambia: ya usa Mongoose + populate, perfecto.
router.get('/carts/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;

    // Busca el carrito y trae los datos de cada producto referenciado.
    const cart = await Cart.findById(cid).populate('products.product');

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    res.render('cart', { cart });

  } catch (error) {
    console.error('Error al renderizar carrito:', error);
    res.status(500).send('Error al mostrar carrito');
  }
});

export default router;
