// --- Change fields when workout type is changed
document.addEventListener('DOMContentLoaded', () => {
    const typeField = document.getElementById('typeCreate');
    const muscleGroup = document.querySelector('.form-groupCreate:nth-child(3)');
    const durationGroup = document.querySelector('.form-groupCreate:nth-child(4)'); 
    const caloriesGroup = document.querySelector('.form-groupCreate:nth-child(5)'); 
    const weightGroup = document.querySelector('.form-groupCreate:nth-child(6)'); 
    const repsGroup = document.querySelector('.form-groupCreate:nth-child(7)'); 
    const muscleGroupLabel = muscleGroup.querySelector('label');
    const muscleGroupInput = muscleGroup.querySelector('input');

    // Hide Duration and Calories because Strength workout is selected by default
    durationGroup.style.display = 'none';
    caloriesGroup.style.display = 'none';

    typeField.addEventListener("change", (e) => {
         if (e.target.value === "Cardio") {            
            muscleGroupLabel.textContent = 'Distance';
            muscleGroupInput.id = 'distance';
            muscleGroupInput.name = 'distance';
            muscleGroupInput.placeholder = 'km';

            durationGroup.style.display = '';
            caloriesGroup.style.display = '';
            weightGroup.style.display = 'none';
            repsGroup.style.display = 'none';
        } else {
            muscleGroupLabel.textContent = 'Muscle Group';
            muscleGroupInput.id = 'muscleGroup';
            muscleGroupInput.name = 'muscleGroup';
            muscleGroupInput.placeholder = '...';

            durationGroup.style.display = 'none';
            caloriesGroup.style.display = 'none';
            weightGroup.style.display = '';
            repsGroup.style.display = '';
        }
    });
});

// --- Open modal function
function openModal(exerciseId) {
    window.history.pushState({}, "", `/exercises/${exerciseId}`); // Update URL
    const muscleGroup = document.querySelector('.form-group:nth-child(3)');
    const durationGroup = document.querySelector('.form-group:nth-child(4)'); 
    const caloriesGroup = document.querySelector('.form-group:nth-child(5)'); 
    const distanceGroup = document.querySelector('.form-group:nth-child(6)'); 
    const weightGroup = document.querySelector('.form-group:nth-child(7)'); 
    const repsGroup = document.querySelector('.form-group:nth-child(8)'); 
    const modal = document.getElementById('detailsModal');
    const overlay = document.getElementById('modalOverlay');

    modal.classList.add('show'); // Show the modal
    overlay.classList.add('show'); // Show the overlay
    
    fetch(`/exercises/${exerciseId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.type === 'Cardio') {
                // Fill the modal with actual workout data
                document.getElementById('name').value = data.name;
                document.getElementById('type').value = data.type;
                document.getElementById('duration').value = data.duration + ' min';
                document.getElementById('calories').value = data.calories;
                document.getElementById('distance').value = data.distance;

                durationGroup.style.display = '';
                distanceGroup.style.display = '';
                caloriesGroup.style.display = '';

                muscleGroup.style.display = 'none';
                weightGroup.style.display = 'none';
                repsGroup.style.display = 'none';
            } else {
                // Fill the modal with actual workout data
                document.getElementById('name').value = data.name;
                document.getElementById('type').value = data.type;
                document.getElementById('muscleGroup').value = data.muscleGroup;
                document.getElementById('weight').value = data.weight;
                document.getElementById('reps').value = data.reps;

                durationGroup.style.display = 'none';
                distanceGroup.style.display = 'none';
                caloriesGroup.style.display = 'none';

                muscleGroup.style.display = '';
                weightGroup.style.display = '';
                repsGroup.style.display = '';
            }
        })
        .catch(error => {
            console.error('Error', error);
        });
}

// --- Update a workout
document.getElementById('updateWorkout').addEventListener('click', function() {
    const exerciseId = window.location.pathname.split('/')[2];

    const body = {
        name: document.getElementById('name').value,
        type: document.getElementById('type').value,
        muscleGroup: document.getElementById('muscleGroup').value,
        duration: document.getElementById('duration').value,
        calories: document.getElementById('calories').value,
        weight: document.getElementById('weight').value,
        reps: document.getElementById('reps').value
    };

    fetch(`/exercises/${exerciseId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body) // send object as string
    }).then(response => {
        //console.log(response);
        closeModal();

    }).catch(e => {
        console.error('Error', e);
    })
})

// --- Delete a workout
document.getElementById('deleteWorkout').addEventListener('click', function() {
    const exerciseId = window.location.pathname.split('/')[2];

    fetch(`/exercises/${exerciseId}`, {
        method: 'DELETE'
    }).then(response => {
        alert('Workout deleted!');
        closeModal();
    }).catch(e => {
        console.error('Error', e);
    })
})


// --- Close modal function
function closeModal() {
    const modal = document.getElementById('detailsModal');
    const overlay = document.getElementById('modalOverlay');
    modal.classList.remove('show'); // Close the modal
    overlay.classList.remove('show'); // Hide the overlay

    window.history.pushState({}, "", "/");  // Reset the URL
    window.location.reload();
}
