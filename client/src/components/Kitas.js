import React, { Component } from 'react'
import axios from 'axios';

export default class Kitas extends Component {

  getData = () => {
    axios.get('/api/kitas')
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
