// Fetch the CSV file
fetch('GymDataset.csv')
    .then(response => response.text())
    .then(csvData => {
        const rows = csvData.split('\n');

        const queryString = window.location.search;
        var exerciseName = new URLSearchParams(queryString).get("name");

        for (let i = 1; i < rows.length - 1; i++) {
            const columns = rows[i].split(';');
            if (columns[0] == exerciseName) {
                var data = {
                    title: columns[0], description: columns[1], type: columns[2], bodyPart: columns[3],
                    equipment: columns[4], level: columns[5], rating: parseFloat(columns[6]), link: columns[7]
                };
                break;
            }
        }
        showExercise(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function showExercise(data) {
    document.getElementById('exercise-name').textContent = data.title;
    document.getElementById('type-value').textContent = data.type;
    document.getElementById('part-value').textContent = data.bodyPart;
    document.getElementById('equipment-value').textContent = data.equipment;
    document.getElementById('level-value').textContent = data.level;
    document.getElementById('rating-value').textContent = data.rating;
    document.getElementById('description').textContent = data.description;
    const youtubeUrl = data.link;
    const videoId = getYouTubeVideoId(youtubeUrl);
    document.getElementById('player').src = "https://www.youtube.com/embed/" + videoId;
}

function getYouTubeVideoId(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
}  