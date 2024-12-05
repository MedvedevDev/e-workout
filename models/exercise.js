const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: false
        }, 
        type: {
            type: String,
            required: false,
            enum: ['Cardio', 'Strength', 'Other'],
            default: 'Cardio'
        },  
        duration: {
            type: String, // Allows values like "1 hour 15 mins"
            required: false,
        },
        muscleGroup: {
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
        calories: {
            type: Number, // Mostly used for cardio exercises
            default: null // Optional field
        },
        date: {
            type: Date, // ISO format date
            default: new Date(),
            required: false
        }
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;