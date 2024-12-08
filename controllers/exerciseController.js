const Exercise = require('../models/exercise')

exports.createExercise = async function (req, res) {
    const exercise = new Exercise(req.body);
    try {
        await exercise.save();
        res.status(201).redirect('/');
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getExercise = async function (req, res) {
    const id = req.params.id;
    try {
        const exercise = await Exercise.findById({ _id: id });
        if (!exercise) {
            return res.status(404).send("Exercise was not found");
        }
        // res.status(200).render('details', {
        //     exercise: exercise
        // });
        res.status(200).send(exercise);
    } catch (e) {
        res.status(500).send(e);
    }
}

// GET /exercises?type=Cardio
// GET /exercises?limit=10&skip=10
// GET /exercises?sortBy=createdAt:asc
exports.getAllExercises = async function (req, res) {
    const sort = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        //console.log(parts) // [ 'createdAt', 'desc' ]
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        const exercises = await Exercise.find(
            req.query.type ? { type: req.query.type } : {}
        )
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort(sort);
        await res.status(200).send(exercises);
    } catch (e) {
        res.status(500).send(e);
    }
}


exports.deleteExercises = async function (req, res) {
    try {
        await Exercise.deleteMany({});
        res.status(200);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.deleteOneExercise = async function (req, res) {
    try {
        const exercise = await Exercise.findByIdAndDelete({ _id: req.params.id });
        if (!exercise) {
            return res.status(404).send();
        }
        res.send(exercise);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.updateExercise = async function (req, res) {
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!exercise) {
            return res.status(404).send();
        }

        res.send('');
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.home = async function (req, res) {
    try {
        const exercises = await getWeeklyData();  
        //await res.status(200).send(exercises).render('index');        
        await res.status(200).render('index', { exercises });
    } catch (e) {
        res.status(500).send(e);
    }
}

// Filter only current week workouts, send total calories and distance for Cardio training
const getWeeklyData = async function (req, res) {
    try {
        const weeklyPeriod = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const allExercises = await Exercise.find({});

        const lastWeekWorkouts = allExercises.filter(ex => ex.createdAt >= weeklyPeriod);
        const weeklyCalories = await countWeeklyCallories(lastWeekWorkouts);
        const weeklyDistance = await countWeeklyRunningDistance(lastWeekWorkouts);
        const weeklyAverageIntensity = await calculateWeeklyAverageIntensity(lastWeekWorkouts);
        
        return {
            workouts: lastWeekWorkouts,
            calories: weeklyCalories,
            distance: weeklyDistance,
            averageIntensity: weeklyAverageIntensity
        };
    } catch (e) {
        res.status(500).send(e);
    }
}

const countWeeklyCallories = function (exercises) {
    return new Promise((resolve) => {
        let totalCallories = 0;
        exercises.forEach(e => {
            if (e.type === 'Cardio') {
                totalCallories += e.calories;
            }
        });

        resolve(totalCallories);
    })
}

const countWeeklyRunningDistance = function (exercises) {
    return new Promise((resolve) => {
        let totalDistance = 0;
        exercises.forEach(e => {
            if (e.type === 'Cardio') {
                totalDistance += e.distance;
            }
        });
        
        resolve(totalDistance);
    })
}

const calculateWeeklyAverageIntensity = function (exercises) {
    return new Promise(async (resolve) => {
        const weeklyCalories = await countWeeklyCallories(exercises);
        const weeklyDistance = await countWeeklyRunningDistance(exercises);

        const averageIntensity = weeklyDistance > 0 ? (weeklyCalories / weeklyDistance) : 0;
        resolve(averageIntensity.toFixed(2)); // Round to 2 decimal places
    });
};