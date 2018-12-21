import React from "react";

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInUser: '',
			signInPassword: '',
			errorText: '',
		}
	}

	onUserChange = (event) => {
		this.setState({signInUser: event.target.value})
	}
	
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3001/signin', {
			method: "post",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.signInUser,
				password: this.state.signInPassword,
			})
		})
		.then(response => response.json())
		.then(res => {
			if (typeof res != "string") {
				this.props.onRouteChange('home');
				this.props.loadNotes(res);
				this.props.loadUser(this.state.signInUser);
			} else {
				this.setState({ errorText: res });
				document.getElementById("name-desc").classList.remove("hid");
				document.getElementById("name-desc").classList.add("vis");
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
			        <label className="db fw6 lh-copy f6">Name</label>
			        <input className="sign-in-bar pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
			        name="name"  id="name" 
			        onChange={this.onUserChange} />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" name="password"  id="password" 
			        onChange={this.onPasswordChange} />
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