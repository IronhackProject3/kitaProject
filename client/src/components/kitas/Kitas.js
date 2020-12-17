import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import './Kitas.css';


export default class Kitas extends Component {

  state = {
    kitas: [],
    search: ''
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

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      search: value,
    });
  };

  render() {
    // console.log(this.state.kitas);

    const kitas = [...this.state.kitas].filter(kita => {
      return kita.kitaName.toLowerCase().includes(this.state.search.toLowerCase())
      || kita.Postcode.includes(this.state.search)
    });
    
    
      // console.log("filtered kitas", kitas);

    return (
      <>
      <div className="header">
        <h1 className="tagline">Easily search and apply to kitas in Berlin using KitaFinder</h1>
      </div>
        <Form className="search-form">
          <Form.Group controlId="SearchKita">
            <Form.Control 
              type="text" 
              placeholder="Search for a kita by name or Postcode" 
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
      
      <div className="search-results">
        <h1>Kitas</h1>
          {kitas.map(kita => (
              <div className="kita-names" key={kita._id}>
                <p>
                  <Link to={`/kitas/${kita._id}`}>{kita.kitaName}</Link>,  {kita.Address},  {kita.Postcode}
                </p>
              </div>
            )
          )}
      </div>

      </>
    )
  }
}

