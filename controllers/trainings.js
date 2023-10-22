const Workout = require('../models/workout');

exports.getAddTraining = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'public/views', 'add-training.html'));
    //res.sendFile(path.join(rootDir, 'public/views', 'add-training.html')); // Second argument is removed, _dirname is replaced

    res.render('add-training', { docTitle: 'Add Product', path: '/admin/add-training' });
};

exports.postNewTraining = (req, res, next) => {
    const workout = new Workout(req.body.title);
    workout.save();
    res.redirect('/');
};

exports.getTrainings = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'public/views', 'training.html')); --- html is replaced with pug
    // render() method uses default templating engine that we provided via app.set()

    Workout.fetchAll((workouts) => {
        res.render('training', { workouts, docTitle: 'Workouts', path: '/' });
    });
}