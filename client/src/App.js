import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Kitas from "./components/kitas/Kitas";
import KitaDetails from "./components/kitas/KitaDetails";
import { Route, Switch } from "react-router-dom";

const NotFound = () => {
  return <h1>404 Not Found 🙃</h1>
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Kitas} />
        <Route exact path="/kitas/:id" component={KitaDetails} />
        <Route component={NotFound} />
      </Switch>
    </div>

  );
}

export default App;