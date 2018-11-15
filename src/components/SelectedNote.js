import React from 'react';

const SelectedNote = ({ title, body }) => {
	
		return (
			<div>
			<div><textarea rows="1" cols="50" placeholder="Title">{title}</textarea></div>
			<div><textarea rows="16" cols="50" placeholder="Note">{body}</textarea></div>
			</div>
			)
	
}

export default SelectedNote;