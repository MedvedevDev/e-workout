const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'workouts.json'
);

const getWorkoutsFromFile = cb => {
    fs.readFile(p, (err, fileData) => {
        if (err) {
            return cb([]);
        } else {
            return cb(JSON.parse(fileData));
        }
    })
}

//                                                             ----- Class Workout -----
module.exports = class Workout {
    constructor(exerciseTitle, exerciseImage, exerciseReps, exerciseSets, exerciseMuscleGroup, exerciseNote) {
        this.exerciseTitle = exerciseTitle;
        this.exerciseImage = exerciseImage;
        this.exerciseReps = exerciseReps;
        this.exerciseSets = exerciseSets;
        this.exerciseMuscleGroup = exerciseMuscleGroup;
        this.exerciseNote = exerciseNote;
    }

    save() {
        this.workoutId = Math.random().toString();
        getWorkoutsFromFile(workouts => {
            workouts.push(this);
            fs.writeFile(p, JSON.stringify(workouts), err => {
                console.log(err)
            });
        })
    }

    static fetchAll(cb) {
        getWorkoutsFromFile(cb);
    }

    static findWorkoutById(id, cb) {
        getWorkoutsFromFile(workouts => {
            const workout = workouts.find(w => w.workoutId === id);

            cb(workout);
        })
    }
}