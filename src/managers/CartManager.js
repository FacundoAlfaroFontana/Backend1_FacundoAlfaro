import fs from 'fs';

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    const data = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async createCart() {
    const carts = await this.getCarts();
    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === parseInt(id));
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === parseInt(cid));
    if (!cart) return null;

    const productIndex = cart.products.findIndex(p => p.product === parseInt(pid));
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: parseInt(pid), quantity: 1 });
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

export default CartManager;
