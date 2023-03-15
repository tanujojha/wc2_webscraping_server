import express from "express";
import cors from "cors";
import {client} from "./mongo.js";
import fs from "fs";
import productRoutes from './router/productsRoutes.js';
import scraper from './scraper.js'

const port = "5000"
const app = express();

app.use(cors());
app.use(express.json());
// app.use("/products", productRoutes);
app.use(productRoutes);
// app.use("/products", scraper);
app.use("/",scraper)







app.listen(port, ()=>{
    console.log("server started on 5000 🗜");
})