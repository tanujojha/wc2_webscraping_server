import express from "express";
import axios from "axios";
import {client} from "./mongo.js";
import cheerio from "cheerio";
import fs from "fs";

const router = express.Router();

await client.connect();
console.log("mongo connected on scraper");



let amazonURL = "https://www.amazon.com/s?i=specialty-aps&bbn=16225009011&rh=n%3A%2116225009011%2Cn%3A2811119011&ref=nav_em__nav_desktop_sa_intl_cell_phones_and_accessories_0_2_5_5";
let flipkartURL = "https://www.flipkart.com/laptops/pr?sid=6bo,b5g&otracker=categorytree&fm=neo%2Fmerchandising&iid=M_1cb964ce-056e-460d-b44b-50743e8906eb_1_372UD5BXDFYS_MC.F6KJFVU7EOGS&otracker=hp_rich_navigation_1_1.navigationCard.RICH_NAVIGATION_Electronics~Laptop%2Band%2BDesktop~All_F6KJFVU7EOGS&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_1_L2_view-all&cid=F6KJFVU7EOGS";
let snapdealURL = "https://www.snapdeal.com/products/electronics-headphones?sort=plrty";
let snapdeal = "https://www.snapdeal.com/products/books-fiction-literature?sort=plrty"

let scrapeAmz = async ()=>{
    let res = await axios.get(amazonURL, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    });

    const $ = cheerio.load(res.data);
    let section = $(".s-card-container")    // card div
        .find(".a-section.a-spacing-base")  // inner card div
        .each(async (ind, el)=>{
            
            let elem = el;
            let img = $(elem).find("img").attr("src") // img srcs
            let alt = $(elem).find("img").attr("alt") // img alt
            let name = $(elem).find("h2").text();
            let rating = $(elem).find(".a-icon-alt").text();
            let finprice = $(elem).find(".a-price-whole").text();
            let oriprice = $(elem).find(".a-offscreen").text();

            let product = {
                name, img, alt, rating, oriprice, finprice
            };

            const result = await client.db("scraper").collection("products").insertOne(product)
            console.log(result);
        })
        
}


let scrapeFlip = async ()=>{
    let res = await axios.get(flipkartURL, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    });

    const $ = cheerio.load(res.data);
    let section = $("._1AtVbE")    // card div
        .find("._1fQZEK")  // inner card div
        .each(async (ind, el)=>{
            
            let elem = el;
            let img = $(elem).find("img").attr("src") // img srcs
            let alt = $(elem).find("img").attr("alt") // img alt
            let name = $(elem).find("._4rR01T").text();
            let rating = $(elem).find("._3LWZlK").text();
            let finprice = $(elem).find("._30jeq3._1_WHN1").text();
            let oriprice = $(elem).find("._3I9_wc._27UcVY").text();

            let product = {
                name, img, alt, rating, oriprice, finprice
            };

            const result = await client.db("scraper").collection("products").insertOne(product)
            console.log(result);
        })

        
}

// let scrapeSnap1 = async ()=>{
//     let res = await axios.get(snapdealURL, {
//         headers: {
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
//         }
//     });

//     let arr = []

//     const $ = cheerio.load(res.data);
//     let section = $(".js-section")    // card div
//         // .find(".col-xs-6.favDp.product-tuple-listing.js-tuple")  // inner card div
//         .find(".js-section")
//         .each(async (ind, el)=>{
            
//             let elem = el;
//             let x = $(elem).attr("class")
//             let img = $(elem).find(".product-image ").attr("src") // img srcs
//             let alt = $(elem).find("img").attr("alt") // img alt
//             let name = $(elem).find("p").text();
//              let rating = $(elem).find("._3LWZlK").text();
//             let finprice = $(elem).find(".lfloat.product-price").text();
//              let oriprice = $(elem).find("._3I9_wc._27UcVY").text();

//              let product = {
//                  name, img, alt, rating, oriprice, finprice
//              };

//              //const result = await client.db("scraper").collection("products").insertOne(product)
//              arr.push(name)
//             console.log(x);
//         })

//         console.log(arr);
        
// }

// let scrapeSnap2 = async ()=>{
//     let res = await axios.get(snapdealURL, {
//         headers: {
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
//         }
//     });

//     let arr = []

//     const $ = cheerio.load(res.data);
//     let section = $("#products")    // card div
//         // .find(".col-xs-6.favDp.product-tuple-listing.js-tuple")  // inner card div
//         .find(".product-tuple-listing")
//         .each(async (ind, el)=>{
            
//             let elem = el;
//             let x = $(elem).attr("class")
//             let img = $(elem).find("img").attr("title") // img srcs
//             let alt = $(elem).find("..picture-elem").children().last().attr("alt") // img alt
//             let name = $(elem).find("p").text();
//             let rating = $(elem).find(".filled-stars").attr("style");
//             let finprice = $(elem).find(".lfloat.product-price").text();
//         //     let oriprice = $(elem).find("._3I9_wc._27UcVY").text();

//         //     let product = {
//         //         name, img, alt, rating, oriprice, finprice
//         //     };

//         //     // const result = await client.db("scraper").collection("products").insertOne(product)
//             // arr.push(name)
//             console.log(img);
//         })

//         console.log(arr);
        
// }








export default router;

