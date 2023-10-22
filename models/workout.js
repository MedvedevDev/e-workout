const fs = require('fs')
const path = require('path')

module.exports = class Workout {
    constructor(exerciseTitle) {
        this.exerciseTitle = exerciseTitle;
    }

    save() {
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'workouts.json'
        );

        fs.readFile(p, (err, fileData) => {
            let workouts = [];
            if (!err) {
                workouts = JSON.parse(fileData);
            }
            workouts.push(this);
            fs.writeFile(p, JSON.stringify(workouts), err => {
                console.log(err)
            });
        })
    }

    static fetchAll(cb) {
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'workouts.json'
        );

        fs.readFile(p, (err, fileData) => {
            if (err) {
                cb([]);
            }

            cb(JSON.parse(fileData));
        })
    }
}