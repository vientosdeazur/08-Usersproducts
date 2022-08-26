const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;


const usersSchema = new Schema({
        // id:ObjectId,
        name: {
            type: String,
            required: [true,'Name is required']
        }, 

        lastname: {
            type: String,
            required: [true,'LastName is required']
        }, 
        
        email: {
            type: String,
            required: [true,'Email is required'],
            unique: true,
            index: true

        }, 
        password:{
            type: String,
            required: [true,'Password is required']
        }, 
        role: {
            type: String,
            required: [true],
            default: 'USER_ROLE',
            enum: ['USER_ROLE','ADMIN_ROLE']    
        },
        enable:{
            type: Boolean,
            required: [true],
            default: true
        }, 
        birthdate: Date
    },
    {timestamps: true}
);

usersSchema.plugin(uniqueValidator,{message: 'already in use'});
usersSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', usersSchema);