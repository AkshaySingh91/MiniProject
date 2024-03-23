const express = require("express");
const mongoose = require("mongoose");


const sectionSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    parentSection: {
        type: mongoose.Types.ObjectId,
        ref: 'Section',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    imgPath:{
        type: String,
        required: true
    },
    constSpec: [
        {type: String}
    ]
})

const section = mongoose.model('section', sectionSchema);
module.exports = {section};
