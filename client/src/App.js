import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Kitas from "./components/kitas/Kitas";
import KitaDetails from "./components/kitas/KitaDetails";
import AddKita from "./components/kitas/AddKita";
import EditKita from "./components/kitas/EditKita";
import { Route, Switch } from "react-router-dom";
import Signup from './components/auth/Signup';
import { Container } from "react-bootstrap";



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
      <Container fluid>
        <Navbar setUser={this.setUser} user={this.state.user} />
        <Switch>
          <Route exact path="/signup" render={props => <Signup setUser={this.setUser} {...props} />} />
          
          <Route exact path="/" component={Kitas} />
          <Route exact path="/kitas/:id" component={KitaDetails} />
          <Route exact path="/kitas/:id/edit" component={EditKita} />
          <Route exact path="/AddKita" render={props => <AddKita {...props} />} />
          
          <Route component={this.NotFound} />
        </Switch>
      </Container>
    );
  }

}

export default App;
