const fs = require("fs");

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    }
    return [];
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = { id: carts.length ? Math.max(...carts.map(c => c.id)) + 1 : 1, products: [] };
    carts.push(newCart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === id);
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cid);
    if (!cart) throw new Error("Carrito no encontrado");

    const exisste = cart.products.find(p => p.product === pid);
    if (exisste) {
      exisste.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;
