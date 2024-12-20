import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadChordsFromJSON, loadChordsFromJSON2, loadNotesFromJSON } from './loadData';

(async function initializeApp() {
  try {
    console.log("trying")
    const notes = await loadNotesFromJSON();
    const chords = await loadChordsFromJSON();
    const chords2 = await loadChordsFromJSON2();
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App notes={notes} chords={chords}/>
      </React.StrictMode>
    );

  } catch (error) {
    console.error("Failed to load notes:", error);
  }
})();



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
