const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    cat_name:{
        type:String,
    },
    cat_image:{
        type:String,
    }
})

module.exports = mongoose.model('category', categorySchema);