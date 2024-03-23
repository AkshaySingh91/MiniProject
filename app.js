const { faker } = require('@faker-js/faker');
const express = require("express");
const methodOverride = require('method-override');
// const multer = require("multer");
const fileUpload = require('express-fileupload'); //
const path = require("path");
const app = express();
const fs = require('fs');
const mongoose = require("mongoose");

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, "./views"));
app.use(express.static(__dirname + '/public'));
// instead calling for every path i have used only for specific path(miniapp) ie /upload
// app.use(fileUpload()); 
// mongodb+srv://singhakshay8794:electroshareDatabase@cluster0.kvin9x0.mongodb.net/electroshare
// mongodb+srv://singhakshay8794:electroshareDatabase@cluster0.kvin9x0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
async function main() {
    try {
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/electroshare", { 
            connectTimeoutMS: 30000,
        });
    }
    catch (e) {console.log(e.message);}
}
main()
.then((res)=>{
    console.log("connected with mongodb");
})
.catch((err)=>{console.log(err.message)})

const {section} = require("./DB/schemas/categories")
const sectionCollen = mongoose.model("section");
const {product} = require("./DB/schemas/product")
const productCollen = mongoose.model("product");

// admin  
const upload = require("./Router/upload")
app.use(upload);

const seller = require("./Router/sellerForm")
app.use(seller); 

const home = require("./Router/index")
app.use(home);

// productlist and subCategories position sensitive do not interchange it 
const productlist = require("./Router/productlist")
app.use(productlist);

const subCategories = require("./Router/subcategories")
app.use(subCategories);

const login = require("./Router/login") 
app.use(login);

const signup = require("./Router/signup")
app.use(signup);

const cart = require("./Router/cart")
app.use(cart);




app.post('/', (req, res) => {
 
})


app.listen('8080', () => {
    console.log('listening..');
})