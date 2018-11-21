import React from 'react';
import Note from "../components/Note.js"

const NoteList = ({ notes, selectNote }) => {
	return (
		<div>
			{
				notes.map((note, i) => {
					return <Note
						selectNote={selectNote}
						title={notes[i].title}
						body={notes[i].body}
						key={notes[i].key}
						id={notes[i].key}
						/>
				})
			}
		</div>
		)

}

export default NoteList;