import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'


export default class KitaDetails extends Component {

  state = {
    kita: null,
    imageURL: "",
  }

  getData = () => {
    const id = this.props.match.params.id;
    // console.log("KitaID is", id)
    axios.get(`/api/kitas/${id}`)
      .then(response => {
        console.log("response from details", response);
        this.setState({
          kita: response.data,
          imageURL: response.data.imageURL
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

  componentDidUpdate(prevProps, prevState){
    // console.log("prevprops", prevProps, "prevstate", prevState);
    // console.log("props", this.props);
    if(prevProps.match.params.id !== this.props.match.params.id) {
      this.getData();
    }
  }

  
  render() {
    
    return (
      // julianas code
      <div>
        {this.state.kita && (
          <>
            <h4>{this.state.kita.kitaName}</h4>
            <img style={{ width: "300px" }} src={this.state.imageURL} alt={this.state.kitaName} />
            <p><strong>Address: </strong>{this.state.kita.Address}</p>
            <p><strong>Postcode: </strong>{this.state.kita.Postcode}</p>
            <p><strong>Telephone: </strong>{this.state.kita.Telephone}</p>
            <p><strong>Email: </strong><a href={"mailto:" + this.state.kita.emailAddress}> {this.state.kita.emailAddress}</a></p>
            
            <iframe title='kitamap' width='300' height='200' frameborder='0' src={`https://www.google.com/maps?q=${this.state.kita.Address}&output=embed`}></iframe>
            <br /><br />
            <Button variant="primary">
              <Link to={`/kitas/${this.state.kita._id}/signup`}> Apply to {this.state.kita.kitaName}</Link> 
            </Button>
            <br /><br />

            <Button variant="primary">
              <Link to={`/kitas/${this.state.kita._id}/edit`}> Edit {this.state.kita.kitaName}</Link> 
            </Button>
            

          </>
        )}
      </div>
    )
  }
}
