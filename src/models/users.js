const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const usersSchema = new Schema({
        name: String,
        lastname: String,
        email: String,
        birthdate: Date
    },
    {timestamps: true}
);

module.exports = mongoose.model('users', usersSchema);