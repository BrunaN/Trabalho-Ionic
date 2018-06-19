let mongoose = require('mongoose');

module.exports = function(){
    let schema = mongoose.Schema({
        texto:{
            type: String,
            required: true
        },
        likes:{
            type: [mongoose.Schema.ObjectId],
            ref: 'Usuario'
        },
        usuario:{
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario'
        }
    });
    return mongoose.model('Post', schema);
}();