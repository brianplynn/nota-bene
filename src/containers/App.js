import React, { Component } from 'react';
import './App.css';
import Signin from "../components/Signin/Signin.js";
import Register from "../components/Register/Register.js";
import MainPage from "../components/MainPage/MainPage.js";

const initialState = {
      user: "",
      initialNotes: [],
      route: "sign-in",
      isSignedIn: false,
    }

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      initialNotes: [],
      route: "sign-in",
      isSignedIn: false,
    }
  }

  onRouteChange = (route) => {
    if (route === "sign-out") {
      this.setState(initialState)
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    } 
    this.setState({ route: route });
  }

  loadUser = (user) => {
    this.setState({ user: user });
  }
  render() {
    const { route, user } = this.state;
    return (
      <div className="App">
        {route === "home" ?
        <MainPage user={user}/>
        : ( route === "sign-in" || route === "sign-out" 
            ? <Signin onRouteChange={this.onRouteChange}
                      loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange}  
                        loadUser={this.loadUser} /> )
      }
      </div>
    );
  }
}

export default App;
