import React from 'react';

const Toolbar = ({ selectedNote, newNote }) => {
	return (
		selectedNote >= 0 ? <button>done</button> : <button onClick={newNote}>+</button>
		)

}

export default Toolbar;