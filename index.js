import express from "express";
import cors from "cors";
import productRoutes from './router/productsRoutes.js';
import {scrapeAmz, scrapeFlip, scrapeSnap} from './scraper.js'

const port = "5000"
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", productRoutes);



// call scraping functions after every 12 hours and update DB
setInterval(() => {

    scrapeAmz();
    scrapeFlip();
    scrapeSnap();
    
}, 1000*60*60*12);


app.listen(port, ()=>{
    console.log("server started on 5000 🗜");
})

