import React from "react";

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInUser: '',
			signInPassword: '',
		}
	}

	onUserChange = (event) => {
		this.setState({signInUser: event.target.value})
	}
	
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('https://localhost:3001/signin', {
			method: "post",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.signInUser,
				password: this.state.signInPassword,
			})
		})
		.then(response => response.json())
		.then(notes => {
			console.log(notes);
			if (notes) {
				this.props.onRouteChange('home');
				this.props.loadNotes(notes);
				this.props.loadUser(this.state.signInUser);
			}
		});
		
	}
	render() {
		const { onRouteChange } = this.props;
		return (
			<main className="container pa4 black-80">
			  <form className="measure center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <h1 className="header ma0">Nota Bene</h1>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        name="name"  id="name" 
			        onChange={this.onUserChange} />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" name="password"  id="password" 
			        onChange={this.onPasswordChange} />
			      </div>
			      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
			    </fieldset>
			    <div className="">
			      <p className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" onClick={this.onSubmitSignIn}>
			      Sign in </p>
			    </div>
			    <div className="lh-copy mt3">
			      <p className="f6 link dim black db" 
			      onClick={() => onRouteChange("register")}>Sign up</p>
			    </div>
			  </form>
			</main>
			)
	}
}

export default Signin;