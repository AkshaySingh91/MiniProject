const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const route = express.Router();
app.set('views', path.join(__dirname, "../views"));
app.use(express.static(__dirname + '../public'));

const productCollection = mongoose.model("product");
const sectionCollen = mongoose.model("section");

// let idx = 0;
// const groupOfProduct = Array.from({ length: Math.ceil(totalNoOfProduct / productPerPage) })
//     .map(() => {
//         let grp = [];
//         for (let i = 0; i < productPerPage; i++) {
//             if (allproduct[idx])
//                 grp.push(allproduct[idx++]);
//         }
//         return grp;
//     })
// req.productsOnPage = 
async function getPageOfProductlist(req, res, next) {
    const productPerPage = 3; //CONSTANT
    let {page, totalNoOfProduct, categoriesId} = req.query;
    page = Number.parseInt(page);

    const allproduct = await productCollection.find({ categoriesId: categoriesId }, {}).skip((page-1)*productPerPage).limit(productPerPage);
    const updatedAllProduct = allproduct.map((singleProd) => {
        const allProdImg = singleProd.productImage.map((pimg) => {
            pimg = pimg.replaceAll('\\', '/');
            pimg = pimg.substring(pimg.indexOf('public') + 6);
            return pimg;
        })
        singleProd.productImage = allProdImg
        return singleProd;
    })
    //no we have all product for  given page 
    res.locals.productsOnPage = updatedAllProduct;
    res.locals.totalNoOfProduct = totalNoOfProduct;
    res.locals.productPerPage = productPerPage;
    next()
}


route.get("*/productlist", getPageOfProductlist, (req, res) => {     
    const data = {
        productsOnPage: res.locals.productsOnPage,
        totalNoOfProduct: res.locals.totalNoOfProduct,
        productPerPage:  res.locals.productPerPage, 
        wholepath:  req.params[0],
        page: req.query.page,
    }  
    res.json(data);
}) 
 

module.exports = route;