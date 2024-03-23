const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose"); 

const route = express.Router();
app.set('views', path.join(__dirname, "../views"));
app.use(express.static(__dirname + '../public')); 

const sectionCollection = mongoose.model("section");
const productCollection = mongoose.model("product");


function getPath(req, res, next) {
    let path = []
    if (req.params[0] != undefined) {
        path = req.params[0].split('/')
    }
    return path;
}

async function showProductList(req, res, next, catId, wholepath) {
    const productPerPage = 3; //CONSTANT
    const allproduct = await productCollection.find({ categoriesId: catId[0]._id }).limit(productPerPage)
    const totalNoOfProduct = await productCollection.countDocuments({ categoriesId: catId[0]._id });
    
    if (allproduct.length == 0) {
        res.status(404).send("No Product listed")
        return;
    }
    // remove this \\ from images of product 
    const updatedAllProduct = allproduct.map((singleProd) => {
        const allProdImg = singleProd.productImage.map((pimg) => {
            pimg = pimg.replaceAll('\\', '/');
            pimg = pimg.substring(pimg.indexOf('public') + 6);
            return pimg;
        })
        singleProd.productImage = allProdImg
        return singleProd;
    })
    
    if(updatedAllProduct.length < productPerPage) end = updatedAllProduct.length ;
    else end =  productPerPage;

    const fewProduct = updatedAllProduct.slice(0, end)
    //redirect to next route 
    res.render('productlist.ejs', {
        productsOnPage: fewProduct,
        wholepath, totalNoOfProduct, productPerPage, page: 1
    })
}

async function getSubCategories(req, res, next) {
    const { categories } = req.params;
    let allpath = getPath(req, res, next)
    const path = allpath.length >= 1 ? allpath : [categories];
    let wholepath = allpath.length >= 1 ? categories + '/' + path.join('/') : categories;

    //to finding id of selected categoriy so that we can display content(sub-cat or prodlist) inside it
    const catId = await sectionCollection.find({ name: path[path.length - 1] }, { _id: 1, name: 1 })
    if (catId.length == 0) {
        res.status(404).send("Path not Defined")
        return;
    }
    const subCat = await sectionCollection.find({ parentSection: catId }, { imgPath: 1, name: 1 });
    if (subCat.length == 0) {
        // if no further categories exist
        await showProductList(req, res, next, catId, wholepath)
        return;
    }

    const allSubCat = subCat.map((sec) => {
        sec.imgPath = sec.imgPath.replaceAll('\\', '/')
        sec.imgPath = sec.imgPath.substring(sec.imgPath.indexOf('public') + 6);
        sec["wholepath"] = wholepath + "/" + sec.name;
        return sec;
    })
    req.allSubCat = allSubCat;
    next();
}


route.get("/:categories", getSubCategories, (req, res) => {
    if (!res.headersSent) {
        res.render('subcategories.ejs', {
            allSubCat: req.allSubCat
        })
    }
})
route.get("/:categories/*", getSubCategories, (req, res) => {
    if (!res.headersSent) {
        res.render('subcategories.ejs', {
            allSubCat: req.allSubCat
        })
    }
})


module.exports = route;