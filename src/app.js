import express from "express"; 

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("¡Bienvenido al servidor!");
});




app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log(` Server escuchando en puerto ${PORT}`)
})

