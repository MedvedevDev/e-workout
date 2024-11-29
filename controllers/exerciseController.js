const Exercise = require('../models/exercise')

exports.createExercise = async function(req, res){
    const e = new Exercise(req.body);
    try {
        await e.save();
        res.status(201).send(e);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.deleteExercise = () => {
    
}

exports.updateExercise = () => {
    
}

exports.home = (req, res) => {
    res.render('index')
}