import React, { Component } from 'react'
import axios from 'axios';


export default class ListOfKitas extends Component {

  state = {
    kitas: [],
  }

  componentDidMount = () => {
    const parent = this.props.parent;
    console.log("parent from listOfKitas", parent);
    
    const id = parent._id;
    axios.get(`/api/parent/${id}/ListOfkitas`)
    .then(response => {
      console.log(response.data);
      this.setState({
        kitas: response.data
      })
    })
    .catch(err => console.log(err))
  }


  render() {
    //console.log(this.state.kitas);
    
    
    return (
      <>
        <h1>List of kitas I've applied</h1>
        {/* {this.kitas.map( application => (
                  <li>{application}</li>
                ))} */}
      </>
    )
  }
}

