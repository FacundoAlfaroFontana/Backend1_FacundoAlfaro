import { Router } from 'express';
import mongoose from 'mongoose'; // Necesario para castear ObjectId correctamente
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = Router();

// Crear un carrito vacío
router.post('/', async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.json(newCart);
  } catch (error) {
    console.error('Error al crear carrito:', error);
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// Traer un carrito con productos referenciados (populate)
router.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    res.json(cart);
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
});

// Agregar producto a un carrito (sumamos si ya existe)
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const product = await Product.findById(pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const productInCart = cart.products.find(item => item.product.equals(pid));

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Eliminar un producto puntual del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    // Filtramos el producto por su ID
    cart.products = cart.products.filter(item => !item.product.equals(pid));

    await cart.save();
    res.json({ status: 'success', message: 'Producto eliminado del carrito', cart });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
});

// Reemplazar el carrito entero con un nuevo array de productos
router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    // Casteamos cada ID como ObjectId (si no, Mongoose explota)
    const castedProducts = products.map(item => ({
      product: new mongoose.Types.ObjectId(item.product),
      quantity: item.quantity
    }));

    cart.products = castedProducts;
    await cart.save();

    res.json({ status: 'success', message: 'Carrito actualizado', cart });
  } catch (error) {
    console.error('Error al reemplazar carrito:', error);
    res.status(500).json({ error: 'Error al reemplazar carrito' });
  }
});

// Actualizar solo la cantidad de un producto específico
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const productInCart = cart.products.find(item => item.product.equals(pid));
    if (!productInCart) return res.status(404).json({ error: 'Producto no encontrado en carrito' });

    productInCart.quantity = quantity;
    await cart.save();

    res.json({ status: 'success', message: 'Cantidad actualizada', cart });
  } catch (error) {
    console.error('Error al actualizar cantidad:', error);
    res.status(500).json({ error: 'Error al actualizar cantidad' });
  }
});

// Vaciar todo el carrito
router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = []; // Borramos todos los productos del array
    await cart.save();

    res.json({ status: 'success', message: 'Carrito vaciado', cart });
  } catch (error) {
    console.error('Error al vaciar carrito:', error);
    res.status(500).json({ error: 'Error al vaciar carrito' });
  }
});

export default router;
