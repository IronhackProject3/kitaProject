import React, { Component } from 'react'
import axios from 'axios';
import {Form, Button} from 'react-bootstrap'

// const Parent = require('../.././.././.././models/Parent');
export default class ApplyToKita extends Component {
 
  state = {
    childFName: '',
    childSName: '',
    dob: '',
    boyGirl: '',
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


  componentDidMount = () => {
    const id = this.props.match.params.id;
    axios.get(`/api/parents/${id}`)
      .then(response => {
        console.log("response from details", response);
        this.setState({
          childFName: response.data.childFName,
          childSName: response.data.childSName,
          dob: response.data.dob,
          boyGirl: response.data.boyGirl,
          Parent1FName: response.data.Parent1FName,
          Parent1SName: response.data.Parent1SName,
          Parent1Phone: response.data.Parent1Phone,
          Parent2FName: response.data.Parent2FName,
          Parent2SName: response.data.Parent2SName,
          Parent2Phone: response.data.Parent2Phone,
          Parent2Email: response.data.Parent2Email,
          homeLanguage: response.data.homeLanguage,
          specialNeeds: response.data.specialNeeds,
          specialNeedsDetails: response.data.specialNeedsDetails,
        })
      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status === 404) {
          this.setState({
            error: 'Sorry - Application Not found'
          })
        }
      })
  }
  


  handleChange = (event) => {
    const {name, value} = event.target
    this.setState ({[name]: name === 'homeLanguage'
    ? [...event.target.selectedOptions].map(opt => opt.value)
    : value})
    console.log('boy & girl', this.state.boyGirl)
    
  }
  
  handleSubmit = event => { // work here
    event.preventDefault()
    axios.post('/api/parent/addParent',this.state)
    .then(response => {
      console.log(response);
    })
  }
  
  
  allLanguages = {
    German: 'de',
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



<Form.Group controlId="boyGirl">
            {/* <Form.Label>User type: </Form.Label> */}
            <Form.Control 
              as="select" 
              custom
              name='boyGirl'
              onChange={this.handleChange}
              value={this.state.type}
            >
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </Form.Control>
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
              name="Parent1SName"
              onChange={this.handleChange} 
          placeholder="Last Name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent1Phone">
          <Form.Control type="text" 
              value={this.state.Parent1Phone}
              name="Parent1Phone"
              onChange={this.handleChange} 
          placeholder="Phone number" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="Parent1Email">
          <Form.Control type="text"
                              value={this.state.Parent1Email}
                              name="Parent1Email"
                              onChange={this.handleChange} 
           placeholder="Email Address" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent2FName">
          <Form.Label>Second Parent / Guardian </Form.Label>
          <Form.Control type="text" 
                              value={this.state.Parent2FName}
                              name="Parent2FName"
                              onChange={this.handleChange} 
           placeholder="First Name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent2SName">
          <Form.Control type="text" 
          value={this.state.Parent2SName}
          name="Parent2SName"
          onChange={this.handleChange} 
           placeholder="Last Name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent2Phone">
          <Form.Control type="text" 
                              value={this.state.Parent2Phone}
                              name="Parent2Phone"
                              onChange={this.handleChange} 
           placeholder="Phone number" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Parent2Email">
          <Form.Control type="text" 
                              value={this.state.Parent2Email}
                              name="Parent2Email"
                              onChange={this.handleChange} 
           placeholder="Email Address" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>



          <Form.Group controlId="homeLanguage">
            <Form.Label>Home langauge</Form.Label>
              <Form.Control 
                as="select" multiple
                // value={this.state.homeLanguage}
                name='homeLanguage'
                onChange={this.handleChange}
                required
              >
                {Object.keys(this.allLanguages).map( lang => (
                  <option key={lang} value={this.allLanguages[lang]}>{lang}</option>
                ))}
              </Form.Control>
          </Form.Group>




          <Form.Group controlId="specialNeeds">
            <Form.Check type="checkbox" name="specialNeeds" label="Child has special needs" />
          </Form.Group>


          <Form.Group controlId="specialNeedsDetails">
            <Form.Label>Special needs details</Form.Label>
            <Form.Control as="textarea" 
                                value={this.state.specialNeedsDetails}
                                name="specialNeedsDetails"
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