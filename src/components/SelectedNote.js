import React from 'react';

const SelectedNote = ({ titleChange, noteChange, title, body }) => {
	
		return (
			<div>
			<div><textarea rows="1" cols="50" 
			onChange={titleChange} placeholder="Title" 
			value={title}></textarea></div>
			<div><textarea rows="16" cols="50" 
			onChange={noteChange} placeholder="Note"
			value={body}></textarea></div>
			</div>
			)
	
}

export default SelectedNote;