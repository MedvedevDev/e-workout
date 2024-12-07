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
            trim: true,
            default: null 
        },
        distance: {
            type: Number,
            default: null 
        },
        weight: {
            type: Number, // Used for strength exercises
            default: null 
        },
        reps: {
            type: Number, // Used for strength exercises
            default: null 
        },
        calories: {
            type: Number, // Mostly used for cardio exercises
            default: null 
        }
},{
    timestamps: true // two editional fields: when created and when updated
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;