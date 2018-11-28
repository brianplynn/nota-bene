import React from 'react';

const SelectedNote = ({ titleChange, noteChange, title, body }) => {
	
		return (
			<div className="fade-in center mw5 mw6-ns br3 hidden ba b--black-10 mv1">
			<textarea className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3"
			rows="1" cols="50" 
			onChange={titleChange} placeholder="Title" 
			value={title}></textarea>
			<textarea className="f4 br3 br--top black-60 mv0 pv2 ph3"
			rows="16" cols="50" 
			onChange={noteChange} placeholder="Note"
			value={body}></textarea>
			</div>
			)
	
}

export default SelectedNote;