import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");


router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});


router.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);
  if (!product) return res.status(404).send("Producto no encontrado");
  res.json(product);
});


router.post("/", async (req, res) => {
  const product = req.body;
  const newProduct = await productManager.addProduct(product);
  res.status(201).json(newProduct);
});

router.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const updates = req.body;
  const updated = await productManager.updateProduct(id, updates);
  if (!updated) return res.status(404).send("Producto no encontrado");
  res.json(updated);
});

router.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  await productManager.deleteProduct(id);
  res.send("Producto eliminado");
});

export default router;
