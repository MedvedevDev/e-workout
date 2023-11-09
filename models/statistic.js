const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(require.main.filename),
    'data',
    'statistic.json'
);

module.exports = class Statistic {
    static addWorkout(id) {
        // Fetch previous workout
        fs.readFile(p, (err, fileData) => {
            let statistics = { workouts: [] };
            if(!err) {
                statistics = JSON.parse(fileData);
            }

            // Analyze the workout => Find existing workout
            const existingWorkoutIndex = statistics.workouts.findIndex(
                w => w.id === id
            );
            const existingWorkout = statistics.workouts[existingWorkoutIndex];
            let updatedWorkout;

            // Add new workout / increase quantity
            if (existingWorkout) {
                updatedWorkout = {...existingWorkout};
                statistics.workouts = [...statistics.workouts]; // copy old array
                statistics.workouts[existingWorkoutIndex] = updatedWorkout; // replace
            } else {
                updatedWorkout = { id };
                statistics.workouts = [...statistics.workouts, updatedWorkout]; // copy old array and add new workout
            }

            fs.writeFile(p, JSON.stringify(statistics), err => {
                console.log(err);
            })
        })
    }

    static getStatistic(cb) {
        fs.readFile(p, (err, fileContent) => {
            const statistic = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(statistic);
            }
        });
    }

    static deleteWorkoutFromStatistic(id) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedWorkouts = {...JSON.parse(fileContent)};
            const workout = updatedWorkouts.workouts.find(workout => workout.id === id);
            if (!workout) {
                return;
            }

            updatedWorkouts.workouts = updatedWorkouts.workouts.filter(w => w.id !== id);

            // Write to file updated workouts array
            fs.writeFile(p, JSON.stringify(updatedWorkouts), err => {
                console.log(err);
            })
        })
    }
}