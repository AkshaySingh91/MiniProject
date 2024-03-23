
const express = require("express");
const app = express();
const path = require("path");
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");

app.set('views', path.join(__dirname, "../views"));
app.use(express.static(__dirname + '../public'));
const route = express.Router();
route.use(express.urlencoded({ extended: true })); 
route.use(fileUpload());

app.use(route)
const PORT = process.env.PORT || 3000;
 
// Connect to MongoDB 

// Configure express-fileupload middleware 

// Set up your apps and other middleware here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

route.get("/testing", async (req, res) => {
    if (!res.headersSent) {
        res.render("tempfile.ejs", { 
        });
    }
})

// Handle POST request to upload images
route.post('/testing', async (req, res) => {
    try {
      if (!req.files ) {
        console.log(req.files);
        return res.status(400).send('No files were uploaded.');
      }
  
      const images = req.files.images;
      console.log(images);
      console.log(req.files);
    //   console.log(images);
    //   // Save each image to MongoDB
    //   const Image = mongoose.model('Image', new mongoose.Schema({ path: String }));
    //   const savedImages = [];
  
    //   for (const image of Array.isArray(images) ? images : [images]) {
    //     const imagePath = `public/uploads/${image.name}`;
    //     await image.mv(imagePath);
    //     const savedImage = await Image.create({ path: imagePath });
    //     savedImages.push(savedImage);
    //   }
    res.send("uploaded");
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
 