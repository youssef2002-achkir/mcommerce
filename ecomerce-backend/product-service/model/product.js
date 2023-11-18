
const mongo = require('mongoose');

const productschema = new mongo.Schema({
    id : {
        type : mongo.Schema.Types.ObjectId,
        default: function () {
            return new mongo.Types.ObjectId();
          },
    },
    title : {
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required: false
    }
});

module.exports = mongo.model('product', productschema);