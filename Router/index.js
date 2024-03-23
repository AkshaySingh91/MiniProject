const express = require("express"); 
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const route = express.Router(); 
app.set('views', path.join(__dirname, "../views"));
app.use(express.static(__dirname + '../public'));


const sectionCollen = mongoose.model("section");
async function generateHome(req, res, next){
    const sections = await sectionCollen.find({parentSection : {$eq : null}}, {imgPath : 1, name: 1});
    const allSec = sections.map((sec) => {
        sec.imgPath = sec.imgPath.replaceAll('\\', '/') 
        sec.imgPath = sec.imgPath.substring(sec.imgPath.indexOf('public')+6);

        return sec;
    })
    req.info = allSec 
    console.log(req.info);
    next(); 
}  

route.get('/',generateHome, (req, res) => {
    res.render("index.ejs", {
        info : req.info
    });
})
module.exports = route;