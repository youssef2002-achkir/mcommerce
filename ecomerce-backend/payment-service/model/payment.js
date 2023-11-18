const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    id : {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
            return new mongoose.Types.ObjectId()
        }
    },
    orderId : {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    paymentRising : {
        type: Number,
        required: true
    },
    cardId : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('payment', paymentSchema);