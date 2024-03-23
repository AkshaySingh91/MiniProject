const express = require("express");
const app = express();
const path = require("path");
// const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");

app.set('views', path.join(__dirname, "../views"));
app.use(express.static(__dirname + '../public'));
const route = express.Router();
route.use(express.urlencoded({ extended: true }));
// it is middleware for /upload path only similar to app.use where it is use for every path
// route.use(fileUpload());
const sectionCollen = mongoose.model("section");


async function getCategories(req, res, next) {
    const sec = await sectionCollen.find({}, { 'name': 1, _id: 0 })
    req.sec = sec.map((obj) => { return obj.name });
    next();
}
route.get("/upload", getCategories, async (req, res) => {
    res.render("admin/upload.ejs", {
        sec: req.sec
    });
})

route.post("/upload", async (req, res, next) => {
    if (!req.files) {
        return res.status(400).send("upload image of category");
    }
    try {
        const files = req.files.image;
        const uploadDir = path.join(__dirname, '../public/ImageAsset/img');
        const { getCategory, getParentCategory, anySpec } = req.body;
        let giveSpecByAdmin = [];

        if (anySpec == "yes") {
            for (let key in req.body) {
                if (key == "getCategory" || key == "getParentCategory" || key == "anySpec") { continue; }
                giveSpecByAdmin.push(key)
            }
        }
        const pid = await sectionCollen.find({ name: getParentCategory }, { _id: 1 });

        if (!files.length) {
            const date = new Date;
            let time = date.toDateString() + "-" + date.toLocaleTimeString();
            time = time.substring(0, time.length - 3);
            time = time.replaceAll(' ', '-')
            time = time.replaceAll(":", '-')
            files.name = files.name.replaceAll(' ', '-')
            const newFileName = time + '-' + files.name;

            await files.mv(path.join(uploadDir, newFileName), async function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            })

            const newSection = new sectionCollen({
                name: getCategory,
                imgPath: path.join(uploadDir, newFileName),
                parentSection: pid.length == 0 ? null : pid[0],
                constSpec: giveSpecByAdmin
            });
            await newSection.save()
        }
        else {
            for (const f of Array.from(files)) {
                const date = new Date;
                let time = date.toDateString() + "-" + date.toLocaleTimeString();
                time = time.substring(0, time.length - 3);
                time = time.replaceAll(' ', '-')
                time = time.replaceAll(":", '-')
                files.name = files.name.replaceAll(' ', '-')

                const newFileName = time + '-' + f.name;


                const newSection = new sectionCollen({
                    name: getCategory,
                    imgPath: path.join(uploadDir, newFileName),
                    parentSection: pid.length == 0 ? null : pid[0],
                    constSpec: giveSpecByAdmin
                });
                await f.mv(path.join(uploadDir, newFileName), async function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                })
                await newSection.save()

            }
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send("no files has uploded");   return;
    }

    res.send('uploded')
})


module.exports = route;