import logo from './logo.svg';
import './App.css';

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

// Example usage
// React Component to display notes
function NotesList({ notes }) {
  return (
    
    <div>
      {notes.map(note => (
        <div key={note.noteId} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{note.name} ({note.Hz} Hz)</h3>
          <p><strong>Locations:</strong></p>
          <ul>
            {note.locations.map((location, index) => (
              <li key={index}>Fret: {location.x}, String: {location.y}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// React Component to display a grid with notes
function NotesGrid({ notes }) {
  const gridSize = 20; // Assuming a max grid size of 20 (frets) x 6 (strings)
  let nutMap = new Map();
  nutMap.set(5, 20)
  nutMap.set(4, 25)
  nutMap.set(3, 30)
  nutMap.set(2, 35)
  nutMap.set(1, 39)
  nutMap.set(0, 44)


  const renderGrid = () => {
    const rows = [];
    for (let y = 0; y <= 5; y++) {
      const cells = [];
      let nutId = nutMap.get(y)

      for (let x = 0; x <= 19; x++) {
        const noteAtLocation = notes[nutId + x - 1];

        cells.push(
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
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: '2px solid black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
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
                  {noteAtLocation.name} {/* TODO add flats */}
                </span>
              </div>
            )}
            {/* Draw horizontal line */}
            {x < 19 && (
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
            {/* Draw vertical line */}
            {y < 6 && (
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
      }
      rows.push(
        <div key={y} style={{ display: 'flex' }}>
          {cells}
        </div>
      );
    }
    
    return rows;
  };

  return <div style={{ display: 'inline-block', border: '2px solid #000' }}>{renderGrid()}</div>;
}



function App({ notes }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <NotesList notes={notes}/> */}
        <NotesGrid notes={notes} />
      </header>
    </div>
  );
}

export default App;
