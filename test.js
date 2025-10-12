const ProductManager = require('./src/managers/ProductManager');
const manager = new ProductManager('./src/data/products.json');

(async () => {
  try {
    const products = await manager.getProducts();
    console.log("Lista de productos:");
    console.log(products);

   
  } catch (error) {
    console.error(" Error:", error.message);
  }
})();
