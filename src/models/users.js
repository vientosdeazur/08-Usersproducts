const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;


const usersSchema = new Schema({
        // id:ObjectId,
        name: String,
        lastname: String,
        email: String,
        birthdate: Date
    },
    {timestamps: true}
);

module.exports = mongoose.model('users', usersSchema);