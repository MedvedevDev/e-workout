const fs = require('fs')
const path = require('path')
const Statistic = require('./statistic')

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
    constructor(id, exerciseTitle, exerciseImage, exerciseReps, exerciseSets, exerciseMuscleGroup, exerciseNote) {
        this.workoutId = id;
        this.exerciseTitle = exerciseTitle;
        this.exerciseImage = exerciseImage;
        this.exerciseReps = exerciseReps;
        this.exerciseSets = exerciseSets;
        this.exerciseMuscleGroup = exerciseMuscleGroup;
        this.exerciseNote = exerciseNote;
    }

    save() {
        getWorkoutsFromFile(workouts => {
            // Update workout
            if (this.workoutId) {
                const existingWorkoutIndex = workouts.findIndex(w => w.workoutId === this.workoutId);
                const updatedWorkouts = [...workouts];
                updatedWorkouts[existingWorkoutIndex] = this;

                fs.writeFile(p, JSON.stringify(updatedWorkouts), err => {
                    console.log(err)
                });
            } else {
                // Create new workout
                this.workoutId = Math.random().toString();
                workouts.push(this);
                fs.writeFile(p, JSON.stringify(workouts), err => {
                    console.log(err)
                });
            }
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

    static deleteWorkout(id) {
        getWorkoutsFromFile(workouts => {
            const updatedWorkouts = workouts.filter(w => w.workoutId !== id);

            fs.writeFile(p, JSON.stringify(updatedWorkouts), err => {
                if (!err) {
                    // Also delete from statistic
                    Statistic.deleteWorkoutFromStatistic(id);
                }
            })
        })
    }
}