import React from 'react';

const Toolbar = ({ submitNote, noteMenu, newNote }) => {
	return (
		!noteMenu ? <div className="fade-in f6 link dim br3 ph3 pv2 mb4 dib white bg-dark-blue" 
						 onClick={submitNote}>done</div> 
				  : <div className="fade-in f6 link dim br3 ph3 pv2 mb4 dib white bg-dark-blue" 
						 onClick={newNote}>+</div>
		)

}

export default Toolbar;