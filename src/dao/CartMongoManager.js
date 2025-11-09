const CartModel = require("./models/Cart.js");
console.log("✅ Usando ProductMongoManager (MongoDB)");

class CartMongoManager {
  async getCarts() {
    return await CartModel.find().populate("products.product");
  }

  async createCart() {
    const newCart = new CartModel({ products: [] });
    await newCart.save();
    return newCart;
  }

  async getCartById(id) {
    return await CartModel.findById(id).populate("products.product");
  }

  async addProductToCart(cid, pid) {
    const cart = await CartModel.findById(cid);
    if (!cart) throw new Error("Carrito no encontrado");

      const productId = new mongoose.Types.ObjectId(pid);


    const existing = cart.products.find(p => p.product.toString() === pid);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: product._id, quantity: 1 });
    }

    await cart.save();
  return await cart.populate("products.product");
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await CartModel.findById(cid);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart;
  }

  async updateCart(cid, products) {
    return await CartModel.findByIdAndUpdate(
      cid,
      { products },
      { new: true }
    ).populate("products.product");
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await CartModel.findById(cid);
    if (!cart) throw new Error("Carrito no encontrado");

    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (productInCart) {
      productInCart.quantity = quantity;
      await cart.save();
    }

    return cart;
  }

  async clearCart(cid) {
    const cart = await CartModel.findById(cid);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = [];
    await cart.save();
    return cart;
  }
}

module.exports = CartMongoManager;
