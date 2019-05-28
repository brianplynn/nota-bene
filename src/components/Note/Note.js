import React from 'react';
import "./Note.css"

const Note = ({ selectNote, deleteNote, title, body, id }) => {
	
	const handleSelect = () => {
		selectNote(id);
	}

	const handleDelete = () => {
		deleteNote(id);
	}

	return (
		<article id={id} className="fade-in note br2 grow near-white bg-near-white b--gray center mw5 mw6-ns br3 hidden ba b--black-10 mv0">
			<article className="fade-in note-title br2 center mw5 mw6-ns br3 hidden b--black-10 mv0">
				<h1 
					data-testid="title" 
					className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3"
					onClick={handleSelect}>
					{title}
				</h1>	
			</article>
			<div data-testid="delete" className="delete-btn f4 bg-near-white br3 br--top mv0 pv2 ph3"
			  		onClick={handleDelete}>
			  		Delete
			</div>
		</article>
		);
	
}

export default Note;