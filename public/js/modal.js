// --- Open modal function
function openModal(exerciseId) {
    window.history.pushState({}, "", `/exercises/${exerciseId}`); // Update URL
    
    const modal = document.getElementById('detailsModal');
    const overlay = document.getElementById('modalOverlay');

    modal.classList.add('show'); // Show the modal
    overlay.classList.add('show'); // Show the overlay
    
    fetch(`/exercises/${exerciseId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Fill the modal with actual workout data
            document.getElementById('name').value = data.name;
            document.getElementById('type').value = data.type;
            document.getElementById('muscleGroup').value = data.muscleGroup;
            document.getElementById('duration').value = data.duration;
            document.getElementById('calories').value = data.calories;
            document.getElementById('weight').value = data.weight;
            document.getElementById('reps').value = data.reps;
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

// --- Close modal function
function closeModal() {
    const modal = document.getElementById('detailsModal');
    const overlay = document.getElementById('modalOverlay');
    modal.classList.remove('show'); // Close the modal
    overlay.classList.remove('show'); // Hide the overlay

    window.history.pushState({}, "", "/");  // Reset the URL
    window.location.reload();
}