const express = require("express"); 
const app = express();
const path = require("path");

const route = express.Router(); 
app.set('views', path.join(__dirname, "../views"));
app.use(express.static(__dirname + '/public'));
 
route.get("/login", (req, res)=>{
    res.sendFile(path.join(__dirname, "../views/login.html"))
})
module.exports = route;