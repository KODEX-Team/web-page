var exercisesData = new Array();
var num = 0
var filteredData = exercisesData;
const pageSize = 10

function parseCSV(csvData) {
    // Split the data into rows
    const rows = csvData.split('\n');
    // Process each row
    for (let i = 1; i < rows.length - 1; i++) {
        // Split the row into columns
        const columns = rows[i].split(';');
        // Access the data in each column
        const exercise = {
            title: columns[0], description: columns[1], type: columns[2], bodyPart: columns[3],
            equipment: columns[4], level: columns[5], rating: parseFloat(columns[6]), link: columns[7]
        };
        exercisesData.push(exercise);
    }
}
// Fetch the CSV file
fetch('GymDataset.csv')
    .then(response => response.text())
    .then(csvData => {
        parseCSV(csvData);
        loadExercise(pageSize);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function loadExercise(number, direction = "next") {
    let parent = document.getElementById('exercise-list');
    parent.innerHTML = '';

    let lastElementIndex = num;

    if (direction == "next") {
        if (num + number <= filteredData.length && number < filteredData.length) {
            lastElementIndex += number;
        } else if (number >= filteredData.length) {
            lastElementIndex = filteredData.length;
            num = 0;
        } else {
            lastElementIndex = filteredData.length;
            num = lastElementIndex - number;
        }
    }
    else {
        if (num - number * 2 > 0) {
            num -= number * 2;
            lastElementIndex -= number;
        } else {
            num = 0;
            lastElementIndex = number;
        }
    }

    for (num; num < lastElementIndex; num++) {
        const obj = filteredData[num];

        let newElem = `
        <button class="exercise-elem" onclick="openExercise('${obj.title}')">
            <h3>${obj.title}</h3>
            <div class="ending">
                <p>${obj.level}</p>
                <p>${obj.rating}</p>
            </div>
        </button>
        `;
        parent.innerHTML += newElem;
    }
}

function filterExercises(type, bodyPart, equipment, level) {
    let filters = {};
    if (document.getElementById(type).value != "") {
        filters.type = document.getElementById(type).value;
    }
    if (document.getElementById(bodyPart).value != "") {
        filters.bodyPart = document.getElementById(bodyPart).value;
    }
    if (document.getElementById(equipment).value != "") {
        filters.equipment = document.getElementById(equipment).value;
    }
    if (document.getElementById(level).value != "") {
        filters.level = document.getElementById(level).value;
    }
    filteredData = exercisesData.filter(item => {
        // Check if the item matches all the filters
        return Object.entries(filters).every(([key, value]) => {
            // Apply each filter condition
            return item[key] === value;
        });
    });

    num = 0;
    loadExercise(pageSize, 'next');
}

function openExercise(name) {
    const url = `exercise.html?name=${encodeURIComponent(name)}`
    window.location.href = url;
}