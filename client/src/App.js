import React from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Kitas from "./components/kita/Kitas";

function App() {
  return (
    <div className="App">
      <h1>List of Kitas</h1>
      <Route exact path="/" component={Kitas} />
    </div>
  );
}

export default App;