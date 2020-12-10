import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Kitas extends Component {

state = {
  kitas: []
}

  getData = () => {
    axios.get('/api/kitas')
      .then(response => {
        // console.log(response.data);
        this.setState({
          kitas: response.data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    console.log(this.state.kitas);
    
    return (

    <div>
      <h1>List of Kitas</h1>
        {this.state.kitas.map(kita => {
          return (
            <div key={kita._id}>
              <p>
                <Link to={`/kitas/${kita._id}`}>{kita.kitaName}</Link>
              </p>
            </div>
          )
        })}
    </div>
    )
  }
}
