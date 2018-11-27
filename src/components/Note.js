import React from 'react';

const Note = ({ selectNote, title, body, id }) => {
	
		return (
			<article id={id} className="br2 grow b--gray center mw5 mw6-ns br3 hidden ba b--black-10 mv4" onClick={selectNote}>
			  <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{title}</h1>
			</article>
			)
	
}

export default Note;