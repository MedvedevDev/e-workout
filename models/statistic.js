const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(require.main.filename),
    'data',
    'statistic.json'
);

module.exports = class Statistic {
    static addWorkout(id, productName) {
        // Fetch previous workout
        fs.readFile(p, (err, fileData) => {
            let statistics = { workouts: [], workoutsCount: 0 };
            if(!err) {
                statistics = JSON.parse(fileData);
            }

            // Analyze the workout => Find existing workout
            const existingWorkoutIndex = statistics.workouts.findIndex(
                workout => workout.workoutId === id
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

            statistics.workoutsCount = statistics.workouts.length;
            fs.writeFile(p, JSON.stringify(statistics), err => {
                console.log(err);
            })
        })


    }
}