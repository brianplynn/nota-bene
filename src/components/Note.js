import React from 'react';

const Note = ({ selectNote, title, body, id }) => {
	
		return (
			<div id={id} onClick={selectNote}>{title}</div>
			)
	
}

export default Note;