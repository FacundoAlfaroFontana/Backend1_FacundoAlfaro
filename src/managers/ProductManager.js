import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(limit) {
    const data = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(data);
    return limit ? products.slice(0, limit) : products;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === parseInt(id));
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = {
      id: newId,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status ?? true,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails || []
    };
    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updateData) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    products[index] = { ...products[index], ...updateData, id: products[index].id };
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    products = products.filter(p => p.id !== parseInt(id));
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return { deleted: true };
  }
}

export default ProductManager;
