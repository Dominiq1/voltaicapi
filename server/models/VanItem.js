
//==


const mongoose = require('mongoose');

const VanItem = new mongoose.Schema({
    itemId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: false
    },
    itemDescription: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: String,
        required: true
    }

    ,
    itemImage: {
        type: String,
        required: true
    },
    vanId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Van'
    }
    
    
 });

 module.exports = mongoose.model('VanItem', VanItem);

