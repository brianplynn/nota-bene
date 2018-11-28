import React from 'react';
import Note from "../components/Note.js"

const NoteList = ({ notes, deleteNote, selectNote }) => {
	return (
		<div>
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