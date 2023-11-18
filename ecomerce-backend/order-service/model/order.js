const mongo = require('mongoose');

const orderSchema = new mongo.Schema({
    id : {
        type : mongo.Schema.Types.ObjectId,
        default: function () {
                return new mongo.Types.ObjectId();
        },
        
    },
    productId : {
        type: mongo.Schema.Types.ObjectId,
        required : true
    },
    orderDate : {
        type : Date,
        default: Date.now
    },
    orderQuantity : {
        type : Number,
        required : true
    },
    paymentStatus : {
        type : Boolean,
        default : false
    }
});

const Order = mongo.model('order', orderSchema);
module.exports = Order;