import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Kitas from "./components/kitas/Kitas";
import KitaDetails from "./components/kitas/KitaDetails";
import { Route, Switch } from "react-router-dom";
import Signup from './components/auth/Signup';



class App extends React.Component {

  NotFound = () => {
    return <h1>404 Not Found 🙃</h1>
  }

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }


  render() {
    return (
      <div className="App">
        <Navbar setUser={this.setUser} />
        <Switch>
          <Route exact path="/" component={Kitas} />
          <Route exact path="/kitas/:id" component={KitaDetails} />
          <Route exact path="/signup" render={props => <Signup setUser={this.setUser} {...props} />} />
          <Route component={this.NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;