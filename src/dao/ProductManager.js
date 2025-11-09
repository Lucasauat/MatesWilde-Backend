const fs = require("fs");
console.log("⚠️ Usando ProductManager (Filesystem)");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    }
    return [];
  }

  async addProduct(product) {
    const requiredFields = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"];
    for (const field of requiredFields) {
      if (!product[field]) throw new Error(`Falta el campo obligatorio: ${field}`);
    }

    const products = await this.getProducts();
    if (products.some(p => p.code === product.code)) throw new Error("Código duplicado");

    product.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return product;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === id);
  }

  async updateProduct(id, updates) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates, id };
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));
    return filtered.length < products.length;
  }
}

module.exports = ProductManager;
