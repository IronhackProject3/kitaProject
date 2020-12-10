import React, { Component } from 'react'
import axios from 'axios';

export default class Kitas extends Component {

state = {
  kitas: []
}

  getData = () => {
    axios.get('/api/kitas')
      .then(response => {
        console.log(response.data);
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
      {this.state.kitas.map(kita => {
        return (
          <div key={kita._id}>
            <p>
              {kita.kitaName}
            </p>
          </div>
        )
      })}
    </div>
    )
  }
}
