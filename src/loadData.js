import { Note, Location, ChordPosition, Chord } from './App';

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
  
     // console.table(notes)
      return notes;
    } catch (error) {
      console.error("Error loading or parsing notes:", error);
      throw error;
    }
  }
  
export async function loadChordsFromJSON(filePath) {
    try {
      // Parse the JSON data
      const jsonData = require('./data/chords_database.json')
  
      // Convert JSON data to Chord objects
      const chords = jsonData.chords.map(chord => {

  
        // Create and return a Chord object
        return new ChordPosition(chord.name, chord.positions, chord.ICDb);
      });
  
     // console.table(chords)
      return chords;
    } catch (error) {
      console.error("Error loading or parsing chords:", error);
      throw error;
    }
  }

  export async function loadChordsFromJSON2(filePath) {
    try {
      // Parse the JSON data
      const jsonData = require('./data/chord_note_db.json')
  
      let chords = {}
      console.log(jsonData.chords)
      // Convert JSON data to Chord objects
      for (const c in jsonData.chords.values) {
        console.log(c.id)
        chords[c.id] = new Chord(c.id, c.displayName, c.type, c.notes)
      }
  
      console.table(chords)
      return chords;
    } catch (error) {
      console.error("Error loading or parsing chords:", error);
      throw error;
    }
  }
  