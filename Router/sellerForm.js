const express = require("express");
const app = express();
const path = require("path");
// const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const { log } = require("util");

app.set('views', path.join(__dirname, "../views"));
app.use(express.static(__dirname + '../public'));
const route = express.Router();
route.use(express.urlencoded({ extended: true }));
// route.use(fileUpload());  

const productCollen = mongoose.model("product");
const sectionCollen = mongoose.model("section");
let mainSpec;

async function getCategories(req, res, next) {
    const { category } = req.query
    if (!category) {
        const sec = await sectionCollen.find({ parentSection: null }, { 'name': 1, _id: 1, constSpec: 1 })
        req.sec = sec
        next();
    }
    else {
        let currCateSpec = await sectionCollen.findById(category, { name: 1, _id: 1, constSpec: 1, parentSection: 1 });
        let childCat;
        childCat = await sectionCollen.find({ parentSection: category }, { name: 1, _id: 1, constSpec: 1, parentSection: 1 });

        if (currCateSpec.parentSection == null || currCateSpec.constSpec.length) {
            mainSpec = currCateSpec;
        }
        childCat.push(mainSpec)
        res.json(childCat);
    }
}
route.get("/seller/form", getCategories, async (req, res) => {
    if (!res.headersSent) {
        res.render("sellerForm.ejs", {
            allSec: req.sec
        });
    }
})

async function saveData(req, res, next) {
    try {
        
        let { title, price, description, gurrantee, quantity } = req.body;
        price = Number.parseInt(price)
        gurrantee = Number.parseInt(gurrantee)
        const constSpec = [], defineSpec = [];
        let productCatId
        // data extract from body
        for (let key in req.body) {
            if (req.body[key] == 'none') {
                productCatId = key
            }
            else if (key.startsWith("const-")) {
                let k = key.substring(6)
                constSpec.push({ [k]: req.body[key] })
            }
            else if (key.startsWith("value-")) {
                let k = key.substring(6)
                defineSpec.push({ [k]: req.body[key] });
            }
        }
        productCatId = new mongoose.Types.ObjectId(productCatId)
        let typeOfProd =  await sectionCollen.findById(productCatId, { name: 1, _id: 0 })
        typeOfProd = typeOfProd.name;
 
        // collecting all data  
        const newProductDetails = new productCollen({
            sellerid: null,
            productType: typeOfProd,
            price: Number.parseInt(price),
            title: title,
            description: description,
            constSpec: constSpec,
            userDefineSpec: defineSpec,
            gurrantee: gurrantee,
            imgPath: null,
            categoriesId: productCatId,
            quantity: quantity,
            productImage: req.productImagePath, 
            qrImage: req.qrImagePath,
        })
        console.log(newProductDetails);
        // all data has collected saving it in DB
        try {
            await newProductDetails.save()
        } catch (e) { console.log(e.message) }
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Internal Server Error');
        return;
    } 
    next();
}

async function saveFilesPath(req, res, next) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files);

    const productImagePath = []
    const qrImagePath = []
    const uploadDir = path.join(__dirname, '../public/ImageAsset/userData');

    for (let f in req.files) { 
        //to rename files

        if (Array.isArray(req.files[f])) {
            const allProdImg = req.files[f];
            allProdImg.forEach(async (pimg) => { 
                // pimg is one of img of product
                const date = new Date;
                let time = date.toDateString() + "-" + date.toLocaleTimeString();
                time = time.substring(0, time.length - 3);
                time = time.replaceAll(' ', '-')
                time = time.replaceAll(":", '-') 
                const newFileName = time + '-' + pimg.name; 
                //to store local path pf all product img
                if(f == "qrcode"){
                    qrImagePath.push(path.join(uploadDir, newFileName))   
                }
                else if(f == "productImage"){
                    productImagePath.push(path.join(uploadDir, newFileName))   
                }   
                await pimg.mv(path.join(uploadDir, newFileName), async function (err) {
                    if (err) return res.status(500).send(err);
                })
            });
        }
        else { 
            const date = new Date;
            let time = date.toDateString() + "-" + date.toLocaleTimeString();
            time = time.substring(0, time.length - 3);
            time = time.replaceAll(' ', '-')
            time = time.replaceAll(":", '-') 
            const newFileName = time + '-' + req.files[f].name;  
            // to check file
            if(f == "qrcode"){
                qrImagePath.push(path.join(uploadDir, newFileName))   
            }
            else if(f == "productImage"){
                productImagePath.push(path.join(uploadDir, newFileName))   
            } 
            await req.files[f].mv(path.join(uploadDir, newFileName), async function (err) {
                if (err) return res.status(500).send(err);
            })
        }
    }
    req.productImagePath = productImagePath;
    req.qrImagePath = qrImagePath; 
    next()
}
 
route.post("/seller/form", saveFilesPath, saveData, async (req, res, next) => {
    try {
        // console.log(req.files); 
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Internal Server Error');
        return;
    }
    if (!res.headersSent)
        res.send("product has listed")
})


module.exports = route;