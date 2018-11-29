import React from "react";

const Signin = ({ onRouteChange }) => {
	return (
		<main class="container pa4 black-80">
		  <form class="measure center">
		    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
		      <h1 className="header ma0">Nota Bene</h1>
		      <div class="mt3">
		        <label class="db fw6 lh-copy f6" for="email-address">Name</label>
		        <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="email" name="name"  id="name" />
		      </div>
		      <div class="mv3">
		        <label class="db fw6 lh-copy f6" for="password">Password</label>
		        <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="password" name="password"  id="password" />
		      </div>
		      <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
		    </fieldset>
		    <div class="">
		      <p class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
		      type="submit" onClick={() => onRouteChange("home")}>
		      Sign in </p>
		    </div>
		    <div class="lh-copy mt3">
		      <p class="f6 link dim black db" 
		      onClick={() => onRouteChange("register")}>Sign up</p>
		    </div>
		  </form>
		</main>
		);
}

export default Signin;