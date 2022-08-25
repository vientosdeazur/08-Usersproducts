const mongoose = require('mongoose');
const config = require ('../../config/index.js');

module.exports = async()=> {
    await mongoose.connect(config.databaseURL); 
};