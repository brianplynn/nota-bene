import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import Note from './Note'

afterEach(cleanup);	

describe('Note', () => {
	test('renders title from props, props function called on click', () => {
		const mockSelectNote = jest.fn();
		const mockDeleteNote = jest.fn();
		const mockTitle = "to do later:"
		const id = 1;
		const { getByTestId } = render(<Note
									selectNote={mockSelectNote}
									deleteNote={mockDeleteNote}
									title={mockTitle}
									body={""}
									key={id}
									id={id}
									/>);
		const title = getByTestId('title');
		const deleteBtn = getByTestId('delete');

		expect(title.textContent).toEqual(mockTitle);

		fireEvent.click(title);
		expect(mockSelectNote).toBeCalledWith(id);
		expect(mockSelectNote).toHaveBeenCalledTimes(1);

		fireEvent.click(deleteBtn);
		expect(mockDeleteNote).toBeCalledWith(id);
		expect(mockDeleteNote).toHaveBeenCalledTimes(1);
	})

})
	