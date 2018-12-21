import React from "react";

class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
			confirmPassword: '',
			errorText: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onConfirmPasswordChange = (event) => {
		this.setState({confirmPassword: event.target.value})
	}

	onRegister = () => {
		if (this.state.password === this.state.confirmPassword) {
			fetch('http://localhost:3001/register', {
				method: "post",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: this.state.name,
					password: this.state.password
				})
			})
			.then(response => response.json())
			.then(res => {
				if (res.command) {
					this.props.onRouteChange('home')
					this.props.loadUser(this.state.signInUser);
				} else {
				this.setState({ errorText: res });
				document.getElementById("name-desc").classList.remove("hid");
				document.getElementById("name-desc").classList.add("vis");
				}
			})
		} else {
			this.setState({ errorText: "Passwords must match" });
			document.getElementById("name-desc").classList.remove("hid");
			document.getElementById("name-desc").classList.add("vis");
		}
	}


	render() {
		const { onRouteChange } = this.props;
		return (
			<main className="container pa4 black-80">
			  <form className="measure center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <h1 className="header ma0">Nota Bene</h1>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" name="name"  id="name" 
			        onChange={this.onNameChange} />

			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" name="password"  id="password" 
			        onChange={this.onPasswordChange} />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Confirm</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" name="password"  id="confirmPassword"
			        onChange={this.onConfirmPasswordChange}
			         />
			        <div id="name-desc" className="center br2 f6 bg-washed-red db w5 pa2 hid mt1 ">
			        	<svg class="w1" data-icon="info" viewBox="0 0 32 32">
						    <title>info icon</title>
						    <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
						</svg>
					 	<span class="lh-title ml3">{this.state.errorText}</span>
					</div>
				  </div>
			    </fieldset>
			    <div className="">
			      <p className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" onClick={this.onRegister}>
			      Sign up</p>
			    </div>
			    <div className="lh-copy mt3">
			      <p className="f6 link dim black db" 
			      onClick={() => onRouteChange("sign-in")}>Log in</p>
			    </div>
			  </form>
			</main>
		)
	}
}

export default Register;