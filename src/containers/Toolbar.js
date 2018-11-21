import React from 'react';

const Toolbar = ({ submitNote, noteMenu, newNote }) => {
	return (
		!noteMenu ? <button onClick={submitNote}>done</button> : <button onClick={newNote}>+</button>
		)

}

export default Toolbar;