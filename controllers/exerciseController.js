const Exercise = require('../models/exercise')

exports.createExercise = async function(req, res){
    const exercise = new Exercise(req.body);
    console.log(req.body);
    
    try {
        await exercise.save();
        res.status(201).send(exercise);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getExercise = async function(req, res) {
    const id = req.params.id;
    try{
        const exercise = await Exercise.findById({ _id: id });
        if(!exercise) {
            return res.status(404).send("Exercise was not found");
        }
        res.status(200).send(exercise);
    }catch(e) {
        res.status(500).send(e);
    }
}

exports.deleteExercises = async function(req, res){
    try {
        await Exercise.deleteMany({});
        res.status(200);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.deleteOneExercise = async function(req, res){
    try {
        const exercise = await Exercise.findByIdAndDelete({_id: req.params.id});
        if(!exercise) {
            return res.status(404).send();
        }
        res.send(exercise);    
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.updateExercise = async function(req, res) {
    const updates = Object.keys(req.body);
    const validUpdates = ['name', 'type', 'duration', 'muscleGroup', 'weight', 'reps', 'callories'];
    const isValid = updates.every(item => validUpdates.includes(item));

    if(!isValid) {
        return res.status(400).send({ 'error': 'Invalid updates!'});
    }

    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true 
        })
        if(!exercise) {
            return res.status(404).send();
        }

        res.send(exercise);
    }catch(e) {
        res.status(400).send(e);
    }
}

exports.home = async function(req, res) {
    try {
        const exercises = await Exercise.find({});
        //await res.status(200).send(exercises).render('index');
        await res.status(200).render('index');
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getAllExercises = async function(req, res) {
    try {
        const exercises = await Exercise.find({});
        await res.status(200).send(exercises);
    } catch (e) {
        res.status(500).send(e);
    }
}