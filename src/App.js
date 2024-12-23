import logo from './logo.svg';
import './App.css';
import React from 'react';
import Row from "react-bootstrap/Row";

// Define the Location class
export class Location {
  constructor(x, y) {
    this.x = x; // Fret
    this.y = y; // String
  }
}

// Define the Note class
export class Note {
  constructor(noteId, name, Hz, locations = []) {
    this.noteId = noteId; // Unique ID of the note
    this.name = name; // Name of the note (e.g., C4, E4)
    this.Hz = Hz; // Frequency of the note
    this.locations = locations; // Array of Location objects
  }
}

// Define the Chord class
export class ChordPosition {
  constructor(name, positions = Array(6).fill(-1), ICDb) {
    this.name = name; // Name of the chord
    this.positions = positions; // Array of x positions per string
    this.ICDb = ICDb;
  }
}

export class Chord {
  constructor(chordId, displayName, type, notes) {
    this.id = chordId;
    this.displayName = displayName;
    this.type = type;
    this.notes = notes;
  }
}

  // Standard tuning TODO others
  const nutMap = new Map([
    [5, 20],
    [4, 25],
    [3, 30],
    [2, 35],
    [1, 39],
    [0, 44],
  ]);

export const fretLength = 12
export const nutHeight = 6

// React Component to display a grid with notes
function NotesGrid({ notes, selected, onSelectionChange }) {
  const handleCircleClick = (x, y) => {
    const newSelected = [...selected];
    newSelected[y] = newSelected[y] === x ? -1 : x; // Toggle selection, reset to -1 if clicked again
    onSelectionChange(newSelected);
  };



  const renderGrid = () => {
    return Array.from({ length: 6 }, (_, y) => (
      <div key={y} style={{ display: 'flex' }}>
        {Array.from({ length: fretLength + 1 }, (_, x) => {
          const nutId = nutMap.get(y);
          const noteAtLocation = notes[nutId + x - 1];
          const isSelected = selected.some(coord => coord[0] === x && coord[1] === y);
          if (isSelected) {}

          return (
            <div
              key={`${x}-${y}`}
              style={{
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {noteAtLocation && (
                <div
                  onClick={() => handleCircleClick(x, y)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '2px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: !isSelected ? '#5d5d5d' : '#fff',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      color: 'black',
                      position: 'absolute',
                      textAlign: 'center',
                    }}
                  >
                    {noteAtLocation.name}
                  </span>
                </div>
              )}
              {x < fretLength && (
                <div
                  style={{
                    width: '50px',
                    height: '2px',
                    backgroundColor: 'black',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translateX(25px)',
                  }}
                />
              )}
              {y < nutHeight && (
                <div
                  style={{
                    width: '2px',
                    height: '50px',
                    backgroundColor: 'black',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translateY(-25px)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div>

      <div>

      </div>
      <div style={{ display: 'inline-block'}}>
        <div style={{border: '2px solid #000'}} >{renderGrid()}</div>
        <div>{renderFretNumbers(fretLength)} </div>
      </div>
    </div>
  )

}

// Define the ChordDropdown component
function ChordDropdown({ chords, selectedChordKey, onChange }) {
  return (
    <select
      value={selectedChordKey || ''}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      style={{
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '20px',
      }}
    >
      <option value="" disabled>
        Select a chord
      </option>
      {chords.map((chord) => (
        <option key={chord.ICDb} value={chord.ICDb}>
          {chord.name}
        </option>
      ))}
    </select>
  );
}

  // Render fret numbers below the grid
  const renderFretNumbers = (fretLength) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {Array.from({ length: fretLength + 1 }, (_, x) => (
          <div key={x} style={{ width: '50px', textAlign: 'center' }}>
            {x} {/* Fret numbers */}
          </div>
        ))}
      </div>
    );
  };

  function PianoRoll({ notes, selectedNotes, toggleNote }) {
    let x = 0;
    const processedNotes = notes.slice(19, 56).map((note, index) => {
      if (note.name.includes("#")) {
        x += 1;
      }
      return { ...note, leftOffset: index - x };
    });
  
    return (
      <div className="piano">
        {processedNotes.map((note, index) => (
          <div
            key={note.id}
            className={`key ${note.name.includes("#") ? "black" : "white"} ${
              selectedNotes.includes(note.id) ? "selected" : ""
            }`}
            onClick={() => toggleNote(note.id)}
            style={
              note.name.includes("#")
                ? { left: `${note.leftOffset * 30}px` }
                : { left: `${note.leftOffset * 30}px` }
            }
          >
            <span className="note-name">{note.name}</span>
          </div>
        ))}
      </div>
    );
  }

function App({ notes, chords }) {
  const [selectedFrets, setSelectedFrets] = React.useState(Array(6).fill(-1)); // Default selection: no notes selected
  const [selectedNotes, setSelectedNotes] = React.useState([]);
  const [selectedChordKey, setSelectedChordKey] = React.useState(null);

  const handleChordChange = (chordKey) => {
    setSelectedChordKey(chordKey);
    const chord = chords.find((chord) => chordKey.includes(chord.ICDb));
    console.log(chord)
    if (chord) {
      setSelectedFrets(chord.positions); 
    }
  };
  
  const handleSelectionChange = (newSelected) => {
    setSelectedFrets(newSelected);
  };

  const toggleNote = (noteId) => {
    console.log(noteId)
    setSelectedNotes((prev) =>
      prev.includes(noteId)
        ? prev.filter((id) => id !== noteId)
        : [...prev, noteId]
    );
    console.log(selectedNotes)
  };


  return (
    <div className="App">
      <header className="App-header">
        <PianoRoll notes={notes} selectedNotes={selectedNotes} toggleNote={toggleNote} />

        
      </header>

      <ChordDropdown
          chords={chords}
          selectedChordKey={selectedChordKey}
          onChange={handleChordChange}
        />

        <NotesGrid notes={notes} selected={selectedFrets} onSelectionChange={handleSelectionChange} />
    </div>
  );
}

export default App;
