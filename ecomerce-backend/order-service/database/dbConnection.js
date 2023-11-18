const mongoose = require('mongoose');

module.exports = async function connectToDB() {
    try {
        const dbURI = 'mongodb://127.0.0.1:27017/productServiceDB?authSource=admin';
        await mongoose.connect(dbURI, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
    } catch (error){
        console.log('Error connecting to database', error);
    }
};