const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getProducts(limit) {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      const products = eval(content);
      if (limit) {
        return products.slice(0, limit);
      }
      return products;
    } catch (error) {
      throw new Error('Error reading products file');
    }
  }

  async getProductById(productId) {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      const products = eval(content);
      const product = products.find((p) => p.ID === productId);

      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error('Error reading products file');
    }
  }
}

module.exports = ProductManager;