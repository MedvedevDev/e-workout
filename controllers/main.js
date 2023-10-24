const Workout = require('../models/workout');

exports.getIndex = (req, res, next) => {
    Workout.fetchAll((workouts) => {
        res.render('main/index', { workouts, docTitle: 'Main', path: '/' });
    });
};

exports.getWorkouts = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'public/views', 'training.html')); --- html is replaced with pug
    // render() method uses default templating engine that we provided via app.set()

    Workout.fetchAll((workouts) => {
        res.render('main/workout-list', { workouts, docTitle: 'Workouts', path: '/workouts' });
    });
}

