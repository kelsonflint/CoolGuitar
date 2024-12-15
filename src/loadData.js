import { Note, Location } from './App';

// Function to load JSON data and convert it into Note objects
export async function loadNotesFromJSON(filePath) {
    try {
      // Parse the JSON data
      const jsonData = require('./data/notes_database.json')
  
      // Convert JSON data to Note objects
      const notes = jsonData.notes.map(note => {
        // Convert each location into a Location object
        const locations = note.locations.map(loc => new Location(loc.x, loc.y));
  
        // Create and return a Note object
        return new Note(note.noteId, note.name, note.Hz, locations);
      });
  
      console.table(notes)
      return notes;
    } catch (error) {
      console.error("Error loading or parsing notes:", error);
      throw error;
    }
  }
  