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
    document.getElementById('main-label').innerHTML = data.title;
    document.getElementById('description').innerHTML = data.description;
    document.getElementById('link').innerHTML = data.link;
}