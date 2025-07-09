import mongoose from 'mongoose';

// Cada carrito guarda una lista de productos con su cantidad correspondiente
const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Relación al modelo de producto
      },
      quantity: {
        type: Number,
        default: 1 // Si no se aclara, arranca con 1 unidad
      }
    }
  ]
});

// Creamos el modelo 'Cart' para usarlo en controladores y servicios
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

