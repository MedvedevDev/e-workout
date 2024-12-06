const Exercise = require('../models/exercise')

exports.createExercise = async function(req, res){
    const exercise = new Exercise(req.body);
    try {
        await exercise.save();
        res.status(201).redirect('/');
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
        // res.status(200).render('details', {
        //     exercise: exercise
        // });
        res.status(200).send(exercise);
    }catch(e) {
        res.status(500).send(e);
    }
}

// GET /exercises?type=Cardio
exports.getAllExercises = async function(req, res) {
    try {
        if (req.query.type === 'Cardio') {
            const exercises = await Exercise.find({ 
                type: 'Cardio'
            });
            await res.status(200).send(exercises); 
        } else {
            const exercises = await Exercise.find({});
            await res.status(200).send(exercises);
        }
    } catch (e) {
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
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true 
        })
        if(!exercise) {
            return res.status(404).send();
        }

        res.send('');
    }catch(e) {
        res.status(400).send(e);
    }
}

exports.home = async function(req, res) {
    try {
        const exercises = await getRecentExercises();
        //await res.status(200).send(exercises).render('index');        
        await res.status(200).render('index', { exercises });
    } catch (e) {
        res.status(500).send(e);
    }
}


const getRecentExercises = async function(req, res) {
    try {
        const weeklyPeriod = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const allExercises = await Exercise.find({});

        const lastWeekWorkouts = allExercises.filter(ex => ex.createdAt >= weeklyPeriod);
        return lastWeekWorkouts;
    } catch(e) {
        res.status(500).send(e);
    }
}