import React from 'react';
import Note from "../components/Note.js"
import "./NoteList.css"

const NoteList = ({ notes, deleteNote, selectNote }) => {
	return (
		<div className="note-list">
			{
				notes.map((note, i) => {
					return <Note
						selectNote={selectNote}
						deleteNote={deleteNote}
						title={notes[i].title}
						body={notes[i].body}
						key={notes[i].key}
						id={notes[i].key}
						/>
				}).reverse()
			}
		</div>
		)

}

export default NoteList;