const mongoose = require('mongoose')
const productTransactionSchema = new mongoose.Schema({
    title : {
        type: String,
        reuqired: true,
        trim: true
    },
    price:{
        type: Number,
        reuqired: true,
    },
    description: {
        type: String,
        trim: true
    },
    category:{
        type: String
    },
    image:{
        type: String,
    },
    sold:{
        type: Boolean,
    },
    dataOfSale:{
        type: Date,
        require: true,
    }}
);

const ProductTransactionModel = mongoose.model('ProductTransaction', productTransactionSchema)


module.exports = ProductTransactionModel