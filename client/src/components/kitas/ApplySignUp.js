import React, { Component } from 'react'
import axios from 'axios';
import {Form, Button} from 'react-bootstrap'
export default class ApplySignUp extends Component {

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
  

  handleSubmit = event => {
    event.preventDefault();
    //axios.post here
  }

  render() {
    
    return (
      <div>
        {this.state.kita && (
          <>

Add your Kita


<Form onSubmit={this.handleSubmit} >
<Form.Group controlId="kitaName">
    <Form.Control type="text" placeholder="Kita Name" />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>


  <Form.Group controlId="kitaAddress">
    <Form.Control type="text" placeholder="Address of Kita" />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

<Form.Group controlId="kitaTelephone">
  {/* <Form.Label>Child's First Name</Form.Label> */}
  <Form.Control type="text" placeholder="Phone number" />
  <Form.Text className="text-muted">
  </Form.Text>
</Form.Group>

<Form.Group controlId="kitaEmail">
  {/* <Form.Label>Second Parent / Guardian</Form.Label> */}
  <Form.Control type="email" placeholder="Email Address of Kita Administrator" />
  <Form.Text className="text-muted">
  </Form.Text>
</Form.Group>

<Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Languages(s) used in Kita</Form.Label>
    <Form.Control as="select" multiple>
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

<Form.Group controlId="kitaPlaces">
  <Form.Control type="text" placeholder="Total number of places in Kita" />
  <Form.Text className="text-muted">
  </Form.Text>
</Form.Group>








<Form.Group controlId="Parent1SName">
  {/* <Form.Label>Child's First Name</Form.Label> */}
  <Form.Control type="text" placeholder="Last Name" />
  <Form.Text className="text-muted">
  </Form.Text>
</Form.Group>



<Form.Group controlId="Parent2FName">
  <Form.Label>Second Parent / Guardian </Form.Label>
  <Form.Control type="text" placeholder="First Name" />
  <Form.Text className="text-muted">
  </Form.Text>
</Form.Group>


<Form.Group controlId="Parent2SName">
  {/* <Form.Label>Child's First Name</Form.Label> */}
  <Form.Control type="text" placeholder="Last Name" />
  <Form.Text className="text-muted">
  </Form.Text>
</Form.Group>


<Form.Group controlId="Parent2Phone">
  {/* <Form.Label>Child's First Name</Form.Label> */}
  <Form.Control type="text" placeholder="Phone number" />
  <Form.Text className="text-muted">
  </Form.Text>
</Form.Group>


<Form.Group controlId="Parent2Email">
  {/* <Form.Label>Second Parent / Guardian</Form.Label> */}
  <Form.Control type="text" placeholder="Email Address" />
  <Form.Text className="text-muted">
  </Form.Text>
</Form.Group>
  <Form.Group controlId="specialNeeds">
    <Form.Check type="checkbox" label="Child has special needs" />
  </Form.Group>


  <Form.Group controlId="specialNeedsDetails">
    <Form.Label>Special needs details</Form.Label>
    <Form.Control as="textarea" placeholder="Details of special needs" rows={3} readOnly />
  </Form.Group>



  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>





            {/* <h1>Apply to asdf {this.state.kita.kitaName}</h1>
            <p><strong>Address: </strong>{this.state.kita.Address}</p>
            <p><strong>Postcode: </strong>{this.state.kita.Postcode}</p>
            <p><strong>Telephone: </strong>{this.state.kita.Telephone}</p>
            <p><strong>Email: </strong><a href={"mailto:" + this.state.kita.emailAddress}> {this.state.kita.emailAddress}</a></p>
            <p><button>Apply to this Kita: </button>{this.state.kita._id}</p> */}
          </>
        )}
      </div>
    )
  }
}