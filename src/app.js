const express = require ("express"); 
const { Server } = require("socket.io")
const { engine } = require("express-handlebars")
const path = require("path");

const productsRouter = require("./routes/productsRouter.js")
const cartsRouter = require("./routes/cartsRouter.js")
const viewsRouter = require("./routes/viewsRouter.js")
const ProductManager = require("./dao/ProductManager.js");

const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"))
//hbs
app.engine("hbs", engine({extname:"hbs"}))
app.set("view engine","hbs")
app.set("views", "./src/views")
//routers
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)


const serverhhtp = app.listen(PORT, ()=>{
    console.log(` Server escuchando en puerto ${PORT}`)
})

const io = new Server(serverhhtp);
const productManager = new ProductManager(path.join(__dirname, "data", "products.json"));

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  socket.emit("updateProducts", await productManager.getProducts());

  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);
    io.emit("updateProducts", await productManager.getProducts());
  });

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(Number(id));
    io.emit("updateProducts", await productManager.getProducts());
  });
});