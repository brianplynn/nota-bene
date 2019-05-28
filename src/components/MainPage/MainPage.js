import React, { Component } from 'react';
import '../../containers/App.css';
import SelectedNote from "../SelectedNote/SelectedNote.js";
import Toolbar from "../Toolbar/Toolbar.js";
import NoteList from "../NoteList/NoteList.js";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      noteMenu: true,
      currNote: {},
      edited: false,
      selectedIndex: -1,
      noteid: 0,
    }
  }

  componentDidMount() {
    this.getNotes(this.props.user).then(notes => {
      this.setState({ notes })
    })
  }

  newNote = () => { 
    this.setState( {noteMenu: false, currNote: {title: "", body: ""}})
    this.setState({ noteid: this.state.notes.length});
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
       this.setState({ notes: orderedNotes, noteMenu: true, edited: false, currNote:{} },
                      () => this.syncNotes()); 
    } else if (this.state.edited && this.state.selectedIndex < 0) {
      this.setState(prevState => ({
        notes: [...prevState.notes, 
                {title: this.state.currNote.title, 
                  body: this.state.currNote.body, 
                  key: this.state.noteid}]
      }));
      this.setState({ noteid: Number(this.state.notes.length)+1});
      this.setState({ noteMenu: true, edited: false, currNote: {} },
                    () => this.syncNotes());
    } else {
      this.setState({ noteMenu: true, currNote: {} })
    }
    this.setState({ selectedIndex: -1})
  }

  selectNote = (id) => {
    this.setState( prevState => ({
      currNote: prevState.notes[id]
    }))
    this.setState({noteMenu: false, selectedIndex: id });
  }

  deleteNote = (id) => {
    const newNotes = this.state.notes.slice(0,id)  
        .concat(this.state.notes.slice(Number(id)+1, 
                                       this.state.notes.length));
    const orderedNotes = newNotes.map((note, i) => {
      return Object.assign(note, {key: i}) 
    })
    this.setState({ noteid: Number(this.state.notes.length)-1})
    this.setState({ notes: orderedNotes }, () => this.syncNotes());
  }


  getNotes = user => {
    return fetch(`https://floating-badlands-26353.herokuapp.com/notes/${user}`, {
        method: "get",
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(res => {
        return res;
      });
  }

  syncNotes = () => {
    fetch('https://floating-badlands-26353.herokuapp.com/notes', {
        method: "put",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({  
          user: this.state.user,
          notes: this.state.notes
        })
      })
      .then(response => response.json())
      .then(res => {
        if (res === 'unable to sync') {
          console.log(res);
        }
      });
  }
  
  render() {
    const { noteMenu, notes } = this.state;
    return (
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
    );
  }
}

export default MainPage;
