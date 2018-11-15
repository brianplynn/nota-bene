import React, { Component } from 'react';
import './App.css';
import SelectedNote from "../components/SelectedNote.js";
import Toolbar from "./Toolbar.js";
import NoteList from "./NoteList.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      selectedNote: -1
    }
  }

  newNote = () => {
    this.setState(prevState => ({
      notes: [...prevState.notes, {title: "", body: ""}]
    }))  
    this.setState( {selectedNote: 0})
  }


  render() {
    const { selectedNote, notes } = this.state;
    return (
      <div>
        <h1>Nota Bene</h1>
        <Toolbar selectedNote={selectedNote} newNote={this.newNote} />
          {this.state.selectedNote >= 0 ? 
          <SelectedNote title= {notes[selectedNote].title} 
                        body={notes[selectedNote].body}/> 
          : <NoteList notes={notes}/>
        }
      </div>
    );
  }
}

export default App;
