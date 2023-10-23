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

module.exports = class Workout {
    constructor(exerciseTitle) {
        this.exerciseTitle = exerciseTitle;
    }

    save() {
        getWorkoutsFromFile(workouts => {
            console.log(workouts)
            workouts.push(this);
            fs.writeFile(p, JSON.stringify(workouts), err => {
                console.log(err)
            });
        })
    }

    static fetchAll(cb) {
        getWorkoutsFromFile(cb);
    }
}