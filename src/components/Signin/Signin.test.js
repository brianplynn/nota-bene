import React from 'react'
import {render, fireEvent, cleanup} from 'react-testing-library'
import Signin from './Signin'

afterEach(cleanup);

describe('Signin', () => {
	const mockRouteChange = jest.fn();
	const mockLoadUser = jest.fn();
	const { getByTestId } = render(<Signin
									onRouteChange={mockRouteChange}
                      				loadUser={mockLoadUser}
									/>);
	let newText = "cookies"
	fireEvent.change(getByTestId('user-field'), { target: { value: newText }})

})
	