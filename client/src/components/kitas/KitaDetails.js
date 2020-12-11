import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class KitaDetails extends Component {

  state = {
    kita: null
  }

  getData = () => {
    const id = this.props.match.params.id;
    console.log("KitaID is", id)
    axios.get(`/api/kitas/${id}`)
      .then(response => {
        console.log("response from details", response);
        this.setState({
          kita: response.data,
        })
      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status === 404) {
          this.setState({
            error: 'Sorry - Kita Not found 🤷‍♀️ 🤷‍♂️'
          })
        }
      })
  }

  componentDidMount = () => {
    this.getData();
  }
  

  render() {
    
    return (
      <div>
        {this.state.kita && (
          <>
            <h1>Kita details {this.state.kita.kitaName}</h1>
            <p><strong>Address: </strong>{this.state.kita.Address}</p>
            <p><strong>Postcode: </strong>{this.state.kita.Postcode}</p>
            <p><strong>Telephone: </strong>{this.state.kita.Telephone}</p>
            <p><strong>Email: </strong><a href={"mailto:" + this.state.kita.emailAddress}> {this.state.kita.emailAddress}</a></p>
            
            <Link to={`/kitas/${this.state.kita._id}/signup`}> Apply to {this.state.kita.kitaName}</Link> 

          </>
        )}
      </div>
    )
  }
}
