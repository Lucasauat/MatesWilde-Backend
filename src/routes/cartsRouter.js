const { Router } = require ("express");

const CartManager = require("../dao/CartManager.js");
const router = Router()
const cartManager = new CartManager("./src/data/carts.json");


router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});


router.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(id);
  if (!cart) return res.status(404).send("Carrito no encontrado");
  res.json(cart.products);
})


router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const updatedCart = await cartManager.addProductToCart(cid, pid);
  if (!updatedCart) return res.status(404).send("Carrito no encontrado");

  res.json(updatedCart);
});

module.exports=router
