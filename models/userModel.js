const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter emai"],
        trim: true,
        unique: true,
    },
    phone:{
        type: Number,
        required: [true, "Please enter a valid phone no"],
        trim: true,
        default:'9909909901'
    },
    dob:{
        type: Date,
        default: new Date(),
        trim: true,
    },
    password:{
        type: String,
        required: [true, "Please enter password"],
        min: 3,
        max: 55,
    },
},
{
    timestamps: true
    // timestamps in a schema refer to the tracking of creation and modification times of documents within a collection.
})

module.exports = mongoose.model('User',userSchema);