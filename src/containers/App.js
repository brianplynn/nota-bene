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
      noteMenu: true,
      currNote: {},
      edited: false,
      selectedIndex: -1,
      noteid: 0,
    }
  }

  newNote = () => { 
    this.setState( {noteMenu: false, currNote: {title: "", body: ""}})
  }

  titleChange = (event) => {
    this.setState(Object.assign(this.state.currNote, { title: event.target.value }));
    this.setState({edited: true});
  }
  noteChange = (event) => {
    this.setState(Object.assign(this.state.currNote, { body: event.target.value }));
    this.setState({edited: true});
  }

  submitNote = () => {
    if (this.state.edited && this.state.selectedIndex >= 0) {
      const newNotes = this.state.notes.slice(0,this.state.selectedIndex)
        .concat([{title: this.state.currNote.title, 
                  body: this.state.currNote.body,
                  key: this.state.selectedIndex}])
        .concat(this.state.notes.slice(this.state.selectedIndex+1, this.state.notes.length))
       this.setState({ notes: newNotes, noteMenu: true, currNote:{} }); 
    } else if (this.state.edited && this.state.selectedIndex < 0) {
      this.setState(prevState => ({
        notes: [...prevState.notes, {title: this.state.currNote.title, body: this.state.currNote.body, key: this.state.noteid}]
      }));
      this.setState(prevState => ({
        noteid: prevState.noteid+1
      }));
      this.setState({ noteMenu: true, edited: false, currNote: {} });
    } else {
      this.setState({ noteMenu: true, currNote: {} })
    }
    this.setState({ selectedIndex: -1})
  }
  // maybe try using array.map to map ids of notes to indexes? for when notes array shifts around

  selectNote = (event) => {
    let id = event.target.id;
    this.setState( prevState => ({
      currNote: prevState.notes[id]
    }))
    this.setState({noteMenu: false, selectedIndex: id });
  }

  render() {
    const { noteMenu, notes } = this.state;
    return (
      <div>
        <h1>Nota Bene</h1>
        <Toolbar noteMenu={noteMenu} newNote={this.newNote} submitNote={this.submitNote}/>
          {!this.state.noteMenu ? 
          <SelectedNote titleChange={this.titleChange}
                        noteChange={this.noteChange}
                        title= {this.state.currNote.title} 
                        body={this.state.currNote.body}/> 
          : <NoteList notes={notes} selectNote={this.selectNote}/>
        }
      </div>
    );
  }
}

export default App;
