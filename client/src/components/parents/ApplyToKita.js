import React, { Component } from 'react'
import axios from 'axios';
import {Form, Button} from 'react-bootstrap'
import { newParent } from '../../services/auth';

// const Parent = require('../.././.././.././models/Parent');
export default class ApplyToKita extends Component {

  state = {
    childFName: '',
    childSName: '',
    dob: '',
    Parent1FName: '',
    Parent1SName: '',
    Parent1Phone: '',
    Parent1Email: '',
    Parent2FName: '',
    Parent2SName: '',
    Parent2Phone: '',
    Parent2Email: '',
    homeLanguage: '',
    specialNeeds: '',
    specialNeedsDetails: ''
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
    
    
handleChange = (event) => {
  const {name, value} = event.target
  this.setState ({[name]: value})
}
    
handleSubmit = event => { // work here
  event.preventDefault()
    axios.post('/api/parent/addParent',this.state)
    .then(response => {
      console.log(response);
    })
}



    

render() {

return (
  <div>
    {this.state.kita && (
      <>

      <h4>Apply to   {this.state.kita.kitaName}</h4>


      <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="childFName">
            <Form.Control 
            type="text"  
            name="childFName" 
            placeholder="Child's First Name" 
            value={this.state.childFName} 
            onChange={this.handleChange}  
            />
              <Form.Text className="text-muted">
              </Form.Text>
          </Form.Group>



        <Form.Group controlId="childSName">
          <Form.Control type="text"
                      value={this.state.childSName} 
                      onChange={this.handleChange}            
          name="childSName"  placeholder="Child's Last Name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date"
          value={this.state.dob}
          onChange={this.handleChange}      
         name="dob" placeholder="Date of Birth" />
        </Form.Group>

        <Form.Group >
          <Form.Label as="legend" column sm={2}>
          </Form.Label>
            <Form.Check
              type="radio"
              label="Girl"
              name="girl"
              id="girl"
            />
            <Form.Check
              type="radio"
              label="Boy"
              name="boy"
              id="boy"
            />
        </Form.Group>

        <Form.Group controlId="Parent1FName">
          <Form.Label>First Parent / Guardian </Form.Label>
          <Form.Control type="text" 
              value={this.state.Parent1FName}
              onChange={this.handleChange} 
            name="Parent1FName"  placeholder="First Name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent1SName">
          <Form.Control  type="text" 
              value={this.state.Parent1SName}
              onChange={this.handleChange} 
          placeholder="Last Name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent1Phone">
          <Form.Control type="text" 
              value={this.state.Parent1Phone}
              onChange={this.handleChange} 
          placeholder="Phone number" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="Parent1Email">
          <Form.Control type="text"
                              value={this.state.Parent1Email}
                              onChange={this.handleChange} 
           placeholder="Email Address" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent2FName">
          <Form.Label>Second Parent / Guardian </Form.Label>
          <Form.Control type="text" 
                              value={this.state.Parent2FName}
                              onChange={this.handleChange} 
           placeholder="First Name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent2SName">
          <Form.Control type="text" 
          value={this.state.Parent2SName}
          onChange={this.handleChange} 
           placeholder="Last Name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent2Phone">
          <Form.Control type="text" 
                              value={this.state.Parent2Phone}
                              onChange={this.handleChange} 
           placeholder="Phone number" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent2Email">
          <Form.Control type="text" 
                              value={this.state.Parent2Email}
                              onChange={this.handleChange} 
           placeholder="Email Address" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="homeLanguage">
            <Form.Label>Home languages(s)</Form.Label>
            <Form.Control 
              value={this.state.homeLanguage}
              onChange={this.handleChange} 
             as="select" multiple>
              <option>German</option>
              <option>English</option>
              <option>Turkish</option>
              <option>Russian</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Arabic</option>
              <option>Polish</option>
              <option>Italian</option>
              <option>Kurdish</option>
              <option>Greek</option>
              <option>Polish</option>
              <option>Portugese</option>
              <option>Sign Language</option>
              <option>Dutch</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="specialNeeds">
            <Form.Check type="checkbox" label="Child has special needs" />
          </Form.Group>


          <Form.Group controlId="specialNeedsDetails">
            <Form.Label>Special needs details</Form.Label>
            <Form.Control as="textarea" 
                                value={this.state.specialNeedsDetails}
                                onChange={this.handleChange} 
             placeholder="Details of special needs" rows={3} readOnly />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit your application to {this.state.kita.kitaName}
          </Button>
      </Form>

      </>
    )}
  </div>
)
}
}