import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Kitas from "./components/kitas/Kitas";
import KitaDetails from "./components/kitas/KitaDetails";
import ApplyToKita from "./components/parents/ApplyToKita";
import AddKita from "./components/kitas/AddKita";
import EditKita from "./components/kitas/EditKita";
import EditApplication from "./components/parents/editApplication";
import { Route, Switch } from "react-router-dom";
import Signup from './components/auth/Signup';
import ListOfKitas from './components/parents/ListOfKitas';
import Login from './components/auth/Login';
import { Container } from "react-bootstrap";



class App extends React.Component {

  NotFound = () => {
    return <h1>404 Not Found 🙃</h1>
  }

  state = {
    user: this.props.user,
    parent: null
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  setUserKita = kita => {
    this.setState({
      user: {
        ...this.state.user,
        kita: kita
      }
    })
  }

  setUserParent = parent => {
    this.setState({
      user: {
        ...this.state.user,
        parent: parent
      }
    })
  }
  // trying to get the parent info across the app
  setParent = parent => {
    this.setState({
      parent: parent
    })
  }


  render() {
    return (
      <Container fluid>
        <Navbar setUser={this.setUser} user={this.state.user} />
        <Switch>
          <Route exact path="/signup" render={props => <Signup setUser={this.setUser} {...props} />} />
          <Route exact path="/login" render={props => <Login setUser={this.setUser} setParent={this.setParent} {...props} />} />

          <Route exact path="/" component={Kitas} />
          <Route exact path="/kitas/:id" render={props => <KitaDetails user={this.state.user} {...props} />} />
          <Route exact path="/kitas/:id/edit" component={EditKita} />
          <Route exact path="/AddKita" render={props => <AddKita setUserKita={this.setUserKita} {...props} />} />
          
          <Route exact path="/addProfile" render={props => <ApplyToKita setUserParent={this.setUserParent} {...props} user={this.state.user} />} />
          <Route exact path="/kitas/:id/signup" render={props => <ApplyToKita setUserParent={this.setUserParent} {...props} user={this.state.user} />} />
          <Route exact path="/parents/:id/edit" component={EditApplication} />
          <Route exact path="/parents/applications" render={props => <ListOfKitas {...props} parent={this.state.parent} />} />


          <Route component={this.NotFound} />
        </Switch>
      </Container>
    );
  }

}

export default App;
