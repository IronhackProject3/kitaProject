import React, { Component } from 'react';
import axios from 'axios';
import {Form, Button } from 'react-bootstrap';
import './AddKita.css';

export default class AddKita extends Component {

  state = {
    //kita: null,
    languages: [],
    kitaName: '',
    address: '',
    postcode: '',
    telephone: '',
    emailAddress: '',
    freePlaces: 0,
    mapLink: '',
    totalPlaces: 0,
    theme: '',
    openTime: '',
    closeTime: '',
    minAge: '',
    maxAge: '',
  }

  handleChange = (event) => {
    const {name, value} = event.target

    this.setState ({[name]: name === 'languages'
      ? [...event.target.selectedOptions].map(opt => opt.value)
      : value})

  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api/kitas/addKita',this.state)
    .then(response => {
      console.log(response);
      this.props.setUserKita(response.data._id);
      this.props.history.push(`/kitas/${response.data._id}`);
    })
  }

  allLanguages = {
    German: 'ge',
    English: 'en',
    Turkish: 'tr',
    Russian: 'ru',
    Spanish: 'es',
    French: 'fr',
    Arabic: 'ar',
    Polish: 'pl',
    Italian: 'it',
    Kurdish: 'ku', 
    Greek: 'el',
    Portugese: 'pt',
    Dutch: 'nl',
    SignLanguage: 'Sign Language',
    Other: 'other'

  }

  render() {
    
    return (
      <>
        <h4>Add your Kita</h4>

        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="kitaName">
            <Form.Control 
              type="text" 
              placeholder="Kita Name" 
              name='kitaName'
              value={this.state.kitaName}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Control 
              type="text" 
              placeholder="Address of Kita" 
              name='address'
              value={this.state.address}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="postcode">
            <Form.Control 
              type="text" 
              placeholder="Postcode" 
              name='postcode'
              value={this.state.postcode}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="telephone">
            <Form.Control 
              type="text" 
              placeholder="Phone number" 
              name='telephone'
              value={this.state.telephone}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="emailAddress">
            <Form.Control 
              type="email" 
              placeholder="Email Address of Kita Administrator" 
              name='emailAddress'
              value={this.state.emailAddress}
              onChange={this.handleChange}
              required      
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="mapLink">
            <Form.Control 
              type="text" 
              placeholder="Google Maps link" 
              name='mapLink'
              value={this.state.mapLink}
              onChange={this.handleChange}
              required      
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Languages(s) used in Kita</Form.Label>
              <Form.Control 
                as="select" 
                multiple
                name='languages'
                onChange={this.handleChange}
                required
              >
                {Object.keys(this.allLanguages).map( lang => (
                  <option key={lang} value={this.allLanguages[lang]}>{lang}</option>
                ))}
              </Form.Control>
          </Form.Group>

          <Form.Group controlId="totalPlaces">
          <Form.Label>Total number of places in Kita</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Total number of places in Kita" 
              name='totalPlaces'
              value={this.state.totalPlaces}
              onChange={this.handleChange}
              required 
            />
          </Form.Group>

          <Form.Group controlId="freePlaces">
          <Form.Label>Number of available places in Kita</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Total number of free places in Kita" 
              name='freePlaces'
              value={this.state.freePlaces}
              onChange={this.handleChange}
              required   
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="theme">
            <Form.Control
                as="select"
                className="mr-sm-2"
                custom
                name='theme'
                value={this.state.theme}
                onChange={this.handleChange}
                required
              >
                <option value="0">Pedagogical focus</option>
                <option value="Situational Approach">Situational Approach</option>
                <option value="Montessori Pedagogy">Montessori Pedagogy</option>
                <option value="Emmi Pikler's">Emmi Pikler's</option>
                <option value="Body and Movement">Body and Movement</option>
                <option value="Integration of children with disabilities">Integration of children with disabilities</option>
                <option value="Reggio Education">Reggio Education</option>
                <option value="Waldorf Education">Waldorf Education</option>
                <option value="Aesthetic Education (Music & Art)">Aesthetic Education (Music & Art)</option>
                <option value="Bilingual">Bilingual</option>
                <option value="Nature and environmental education">Nature and environmental education</option>
                <option value="Religious Education">Religious Education</option>
                <option value="Health">Health</option>
                <option value="Intercultural Pedagogy">Intercultural Pedagogy</option>
                <option value="Basic scientific experience">Basic scientific experience</option>
                <option value="Exercise / Sports">Exercise / Sports</option>
                <option value="Froebel pedagogy">Froebel pedagogy</option>
                <option value="Freinet pedagogy">Freinet pedagogy</option>
                <option value="Others">Others</option>
              </Form.Control>
          </Form.Group>

          <Form.Group controlId="openTime">
            <Form.Control 
              type="text" 
              placeholder="Open time" 
              name='openTime'
              value={this.state.openTime}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="closeTime">
            <Form.Control 
              type="text" 
              placeholder="Close time" 
              name='closeTime'
              value={this.state.closeTime}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="minAge">
            <Form.Control 
              type="number" 
              placeholder="Minimum age (months)"
              name='minAge'
              value={this.state.minAge}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="maxAge">
            <Form.Control 
              type="number" 
              placeholder="Maximum age (months)" 
              name='maxAge'
              value={this.state.maxAge}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    )
  }
}
