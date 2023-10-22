const adminData = require("../routes/admin");
const trainings = [];

exports.getAddTraining = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'public/views', 'add-training.html'));
    //res.sendFile(path.join(rootDir, 'public/views', 'add-training.html')); // Second argument is removed, _dirname is replaced

    res.render('add-training', { docTitle: 'Add Product', path: '/admin/add-training' });
};

exports.postNewTraining = (req, res, next) => {
    trainings.push({ exerciseTitle: req.body.title })
    res.redirect('/');
};

exports.getTrainings = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'public/views', 'training.html')); --- html is replaced with pug
    // render() method uses default templating engine that we provided via app.set()

    res.render('training', { trainings, docTitle: 'Trainings', path: '/' });
}