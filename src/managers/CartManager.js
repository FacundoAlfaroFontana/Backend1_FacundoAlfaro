import fs from 'fs';

// Gestor de carritos que trabaja con archivos locales (JSON plano)
class CartManager {
  constructor(path) {
    this.path = path; // Ruta al archivo que guarda los carritos
  }

  // Devuelve todos los carritos guardados
  async getCarts() {
    const data = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  // Crea un nuevo carrito con ID incremental
  async createCart() {
    const carts = await this.getCarts();
    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);

    // Persistimos el nuevo carrito en el archivo
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  // Busca un carrito por su ID
  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === parseInt(id));
  }

  // Agrega un producto al carrito (si ya está, aumenta la cantidad)
  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === parseInt(cid));
    if (!cart) return null;

    // Verificamos si el producto ya está en el carrito
    const productIndex = cart.products.findIndex(p => p.product === parseInt(pid));
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: parseInt(pid), quantity: 1 });
    }

    // Guardamos los cambios en el archivo
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

export default CartManager;

