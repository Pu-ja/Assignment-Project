const mongoose = require('mongoose');
require('mongoose-type-email');
const registrationSchema=mongoose.Schema({
    userId:           { type: Number, required: true, unique: true },
    userFullName:     { type: String, required: true },
    useremail :       { type: mongoose.SchemaTypes.Email , allowBlank: true },
    userAddress: String,
    userPhone: String,
});
module.exports=mongoose.model('registration',registrationSchema);