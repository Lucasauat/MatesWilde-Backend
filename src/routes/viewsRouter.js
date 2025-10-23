const express = require("express");
const path = require("path");
const ProductManager = require("../dao/ProductManager.js");

const router = express.Router();

const productsPath = path.resolve(__dirname, "../data/products.json");
const productManager = new ProductManager(productsPath);

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error al cargar los productos");
  }
});

router.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts");
});

module.exports = router 