const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: [true, 'Name is required']
        }, 
        type: {
            type: String,
            required: [true, 'Type is required'],
            enum: ['Cardio', 'Strength', 'Other'],
            default: 'Cardio'
        },  
        duration: {
            type: String, // Allows values like "1 hour 15 mins"
            required: [true, 'Duration is required']
        },
        muscle_group: {
            type: String,
            trim: true
        },
        weight: {
            type: Number, // Used for strength exercises
            default: null // Optional field
        },
        reps: {
            type: Number, // Used for strength exercises
            default: null // Optional field
        },
        callories: {
            type: Number, // Mostly used for cardio exercises
            default: null // Optional field
        },
        date: {
            type: Date, // ISO format date
            default: Date.now,
            required: [true, 'Date is required']
        }
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;