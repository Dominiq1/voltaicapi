const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({

  orderId:{
    type: String,
    required: true
  
  },
  itemName: {
      type: String,
      required: true
    },
    itemDescription: {
      type: String,
      required: true
    },
    itemImages: {
      type: [String],
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    vanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Van'
    },
  });
  
  module.exports = mongoose.model('Order', OrderSchema);
  