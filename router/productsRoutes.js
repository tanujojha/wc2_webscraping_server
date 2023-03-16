import express from "express";
import {client} from ".././mongo.js";

await client.connect()
console.log("mongo connected on products");
const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res)=>{
    const result = await client.db("scraper").collection("products").find({}).toArray()
    // console.log(result.length);
    result ? res.status(200).send(result) : res.status(500).send("something went wrong")

})


// GET ALL PRODUCTS OF A CATEGORY 
router.get("/res", async (req, res)=>{
    
    let cat = req.query.cat;
    // console.log(cat);

    // creating index for using $text operator 
    await client.db("scraper").collection("products").createIndex({name: "text", name: "text"})
    
    const result = await client.db("scraper").collection("products")
        .find({$text: {$search: cat}}).toArray()
    result ? res.status(200).send(result) : res.status(500).send("something went wrong")

})

export default router;

