const fs = require('fs');
const path = require('path');

// Path to the JSON file
const dbFilePath = path.join(__dirname, 'chordFingerPositions.json');

// Initialize the database by reading the JSON file
let chordFingerPositions = {};
if (fs.existsSync(dbFilePath)) {
    try {
        chordFingerPositions = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
    } catch (error) {
        console.error('Error reading the database file:', error);
    }
} else {
    console.log('Database file not found. Starting with an empty database.');
}

// Function to save the database to the JSON file
function saveDatabase() {
    fs.writeFileSync(dbFilePath, JSON.stringify(chordFingerPositions, null, 2), 'utf-8');
    console.log('Database saved successfully.');
}

// Function to add a finger position
export function addFingerPosition(chordId, newPosition, chordName = null) {
    const requiredStrings = ["6", "5", "4", "3", "2", "1"];
    for (const string of requiredStrings) {
        if (!(string in newPosition)) {
            console.error(`Missing string ${string} in the new position.`);
            return;
        }
    }

    if (!chordFingerPositions[chordId]) {
        if (!chordName) {
            console.error(`Chord ID "${chordId}" does not exist, and no chord name provided to create a new entry.`);
            return;
        }

        chordFingerPositions[chordId] = {
            name: chordName,
            positions: []
        };
        console.log(`Created new chord "${chordName}" with ID "${chordId}".`);
    }

    chordFingerPositions[chordId].positions.push(newPosition);
    console.log(`Added new position to chord "${chordId}".`);
    saveDatabase(); // Save changes to the file
}