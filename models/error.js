const mongoose = require('mongoose')

const errorSchema = new mongoose.Schema({
        text: {
            type: String,
            trim: true,
            required: true
        }
})

const Error = mongoose.model('Error', exerciseSchema);

module.exports = Error;