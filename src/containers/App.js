import React, { Component } from 'react';
import './App.css';
import SelectedNote from "../components/SelectedNote.js";
import Signin from "../components/Signin.js";
import Register from "../components/Register.js";
import Toolbar from "./Toolbar.js";
import NoteList from "./NoteList.js";

const initialState = {
      user: "",
      notes: [],
      noteMenu: true,
      currNote: {},
      edited: false,
      selectedIndex: -1,
      noteid: 0,
      route: "sign-in",
      isSignedIn: false,
    }

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      notes: [],
      noteMenu: true,
      currNote: {},
      edited: false,
      selectedIndex: -1,
      noteid: 0,
      route: "sign-in",
      isSignedIn: false,
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
        .concat(this.state.notes.slice(Number(this.state.selectedIndex)+1, 
                                       this.state.notes.length))
        .concat([{title: this.state.currNote.title, 
                  body: this.state.currNote.body,
                  key: this.state.selectedIndex}]);
      const orderedNotes = newNotes.map((note, i) => {
        return Object.assign(note, {key: i}) 
      })
       this.setState({ notes: orderedNotes, noteMenu: true, currNote:{} });
       this.syncNotes(); 
    } else if (this.state.edited && this.state.selectedIndex < 0) {
      this.setState(prevState => ({
        notes: [...prevState.notes, 
                {title: this.state.currNote.title, 
                  body: this.state.currNote.body, 
                  key: this.state.noteid}]
      }));
      this.setState({ noteid: Number(this.state.notes.length)+1});
      this.setState({ noteMenu: true, edited: false, currNote: {} });
      this.syncNotes();
    } else {
      this.setState({ noteMenu: true, currNote: {} })
    }
    this.setState({ selectedIndex: -1})
  }

  selectNote = (event) => {
    let id = event.target.id;
    this.setState( prevState => ({
      currNote: prevState.notes[id]
    }))
    this.setState({noteMenu: false, selectedIndex: id });
  }

  deleteNote = (event) => {
    let id = event.target.id;
    const newNotes = this.state.notes.slice(0,id)  
        .concat(this.state.notes.slice(Number(id)+1, 
                                       this.state.notes.length));
    const orderedNotes = newNotes.map((note, i) => {
      return Object.assign(note, {key: i}) 
    })
    this.setState({ notes: orderedNotes })
    this.syncNotes();
  }

  onRouteChange = (route) => {
    if (route === "sign-out") {
      this.setState(initialState)
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    } 
    this.setState({ route: route });
  }

  syncNotes = () => {
    fetch('https://localhost:3001/notes', {
        method: "put",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({  
          user: this.state.user,
          notes: this.state.notes
        })
      })
      .then(response => response.json())
      .then(notes => {
        console.log(notes);
      });
  }

  loadNotes = (notes) => {
    this.setState({ notes: notes });
  }

  loadUser = (user) => {
    this.setState({ user: user });
  }
  render() {
    const { noteMenu, notes, route } = this.state;
    return (
      <div className="App">
        {route === "home" ?
        <div className="container br3 shadow-2">
        <h1 className="header ma0">Nota Bene</h1>
        <Toolbar noteMenu={noteMenu} newNote={this.newNote} submitNote={this.submitNote}/>
          {!this.state.noteMenu ? 
          <SelectedNote titleChange={this.titleChange}
                        noteChange={this.noteChange}
                        title= {this.state.currNote.title} 
                        body={this.state.currNote.body}/> 
          : <NoteList notes={notes} 
                      deleteNote={this.deleteNote} 
                      selectNote={this.selectNote}/>
        }
        </div>
        : ( route === "sign-in" || route === "sign-out" 
            ? <Signin onRouteChange={this.onRouteChange} 
                      loadNotes={this.loadNotes}
                      loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange}  
                        loadUser={this.loadUser} /> )
      }
      </div>
    );
  }
}

export default App;
