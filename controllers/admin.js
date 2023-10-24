const Workout = require('../models/workout');

exports.getAddWorkout = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'public/views', 'add-training.html'));
    //res.sendFile(path.join(rootDir, 'public/views', 'add-training.html')); // Second argument is removed, _dirname is replaced

    res.render('admin/add-workout', { docTitle: 'Add Workout', path: '/admin/add-workout' });
};

exports.postNewWorkout = (req, res, next) => {
    const workout = new Workout(req.body.title);
    console.log(workout);
    workout.save();
    res.redirect('/');
};

exports.getWorkouts = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'public/views', 'training.html')); --- html is replaced with pug
    // render() method uses default templating engine that we provided via app.set()

    Workout.fetchAll(workouts => {
        res.render('admin/workouts.pug', { workouts, docTitle: 'Admin Workouts', path: '/admin/workouts' });
    });
}