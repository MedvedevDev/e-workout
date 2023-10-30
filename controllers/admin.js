const Workout = require('../models/workout');

// ADD
exports.getAddWorkout = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'public/views', 'add-training.html'));
    //res.sendFile(path.join(rootDir, 'public/views', 'add-training.html')); // Second argument is removed, _dirname is replaced

    res.render('admin/edit-workout', {
        docTitle: 'Add Workout',
        path: '/admin/add-workout',
        editing: false
    });
};

exports.postNewWorkout = (req, res, next) => {
    const { exerciseTitle, exerciseImage, exerciseReps, exerciseSets, exerciseMuscleGroup, exerciseNote } = req.body;
    const workout = new Workout(null, exerciseTitle, exerciseImage, exerciseReps, exerciseSets, exerciseMuscleGroup, exerciseNote);
    workout.save();
    res.redirect('/');
};

// EDIT
exports.getEditWorkout = (req, res, next) => {
    const editMode = req.query.edit;
    const workoutId = req.params.workoutId;
    if (!editMode) {
        res.redirect('/');
    }

    Workout.findWorkoutById(workoutId, workout => {
        if (!workout){
            res.redirect('/');
        }

        res.render('admin/edit-workout', {
            workout,
            doctTitle: 'Edit Workout',
            path: '/admin/edit-workout',
            editing: editMode
        })
    })
}

exports.postEditWorkout = (req, res, next) => {
    const workoutId = req.body.workoutId;
    const { exerciseTitle, exerciseImage, exerciseReps, exerciseSets, exerciseMuscleGroup, exerciseNote } = req.body;
    const updatedWorkout = new Workout(workoutId, exerciseTitle, exerciseImage, exerciseReps, exerciseSets, exerciseMuscleGroup, exerciseNote);
    updatedWorkout.save();

    res.redirect('/admin/workouts');
}

// GET ALL
exports.getWorkouts = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'public/views', 'training.html')); --- html is replaced with pug
    // render() method uses default templating engine that we provided via app.set()

    Workout.fetchAll(workouts => {
        res.render('admin/workouts.pug', { workouts, docTitle: 'Admin Workouts', path: '/admin/workouts' });
    });
}

// DELETE
exports.postDeleteWorkout = (req, res, next) => {
    const workoutId = req.body.workoutId;
    Workout.deleteWorkout(workoutId);
    res.redirect('/admin/workouts');
}