import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import './Kitas.css';
import { Container, Row, Col } from "react-bootstrap";


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
      
        <Container>
          <Row className="justify-content-md-center"> 
            <Col md="auto"><h1 className="h1-kitas">Kitas</h1></Col>
          </Row>

          <Row className="justify-content-md-center"> 
            <Col md="auto">
              {kitas.map(kita => (
                  <div key={kita._id}>
                    <p className="kita-list">
                      <Link to={`/kitas/${kita._id}`}>{kita.kitaName}</Link>
                      ,  {kita.Address}
                      ,  {kita.Postcode}
                      {this.props.user && this.props.user.parent && this.props.user.parent.applications && this.props.user.parent.applications.find(app => app.kitaId === kita._id.toString()) &&
                        (<span className="applied">&nbsp;&nbsp;&nbsp;Applied</span>)
                      }
                    </p>
                  </div>
                )
              )}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

