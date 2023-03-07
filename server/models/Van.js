const mongoose = require('mongoose');

const VanSchema = new mongoose.Schema({
    licensePlate:{
        type: String,
    },
    statuFill:{
        type: String,
    },
   
})

module.exports = mongoose.model('Van', VanSchema);