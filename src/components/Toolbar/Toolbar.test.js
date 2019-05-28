import React from 'react'
import {render, fireEvent, cleanup} from 'react-testing-library'
import Toolbar from './Toolbar'

afterEach(cleanup);

it('renders successfully', () => {
	const noteMenu = false;
	const newNote = jest.fn();
	const submitNote = jest.fn();
	expect(render(<Toolbar 
					noteMenu={noteMenu} 
					newNote={newNote} 
					submitNote={submitNote}/>)).toMatchSnapshot();
})