const express = require("express");
const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
    sellerid: {
        type: mongoose.Schema.Types.ObjectId
        // required: true
    },
    productType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    constSpec: [
        {
            type: Object
        }
    ],
    userDefineSpec: [
        {
            type: Object
        }
    ],
    gurrantee: {
        type: Number,
        required: true,
        default: 0
    },
    productImage: [{
        type: String,
        required: true
    }
    ],
    qrImage: [{
        type: String,
        required: true
    }],
    uploadedDate: {
        type: Date,
        default: Date.now()
    },
    categoriesId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: String,
        required: true,
        default: '1'
    }
})

const product = mongoose.model('product', productSchema);
module.exports = { product };
