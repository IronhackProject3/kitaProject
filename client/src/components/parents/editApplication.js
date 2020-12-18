import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import './EditApplication.css';
import { Container } from "react-bootstrap";


export default class EditProfile extends Component {
  state = {
    childFName: this.props.user.parent.childFName,
    childSName: this.props.user.parent.childSName,
    dob: this.props.user.parent.dob,
    boyGirl: this.props.user.parent.boyGirl,
    Parent1FName: this.props.user.parent.Parent1FName,
    Parent1SName: this.props.user.parent.Parent1SName,
    Parent1Phone: this.props.user.parent.Parent1Phone,
    Parent1Email: this.props.user.parent.Parent1Email,
    ParentAddress: this.props.user.parent.ParentAddress,
    ParentPostcode: this.props.user.parent.ParentPostcode,
    applications:this.props.user.parent.applications,
    homeLanguage: this.props.user.parent.homeLanguage
  };

  // getData = () => {
  //   const id = this.props.match.params.id;
  //   console.log("KitaID is", id);
  //   axios
  //     .get(`/api/kitas/${id}`)
  //     .then((response) => {
  //       // console.log("response from details", response);
  //       this.setState({
  //         kita: response.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       if (err.response.status === 404) {
  //         this.setState({
  //           error: "Sorry - Profile Not found 🤷‍♀️ 🤷‍♂️",
  //         });
  //       }
  //     });
  // };

  // componentDidMount = () => {
  //   this.getData();
  // };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]:
        name === "homeLanguage"
          ? [...event.target.selectedOptions].map((opt) => opt.value)
          : value,
    });
    // console.log('boy & girl', this.state.boyGirl)
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let parentInfo = this.state;
    console.log(this.props.user.parent._id);
    axios
      .put(`/api/parent/${this.props.user.parent._id}/EditApplication`, {
        childFName: this.state.childFName,
        childSName: this.state.childSName,
        dob: this.state.dob,
        boyGirl: this.state.boyGirl,
        Parent1FName: this.state.Parent1FName,
        Parent1SName: this.state.Parent1SName,
        Parent1Phone: this.state.Parent1Phone,
        Parent1Email: this.state.Parent1Email,
        ParentAddress: this.state.ParentAddress,
        ParentPostcode: this.state.ParentPostcode,
        homeLanguage: this.state.homeLanguage
      })
      .then((response) => {
        console.log(response);
         this.props.history.push(`/`);
      });
  };

  allLanguages = {
    German: "de",
    English: "en",
    Turkish: "tr",
    Russian: "ru",
    Spanish: "es",
    French: "fr",
    Arabic: "ar",
    Polish: "pl",
    Italian: "it",
    Kurdish: "ku",
    Greek: "el",
    Portugese: "pt",
    Dutch: "nl",
    SignLanguage: "Sign Language",
    Other: "other",
  };

  render() {
    console.log(this.props.user);
    return (
      <Container>
          <>
            <h2 className="edit-parent">Edit your profile</h2>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="childFName">
                <Form.Control
                  type="text"
                  name="childFName"
                  placeholder="Child's First Name"
                  value={this.state.childFName}
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="childSName">
                <Form.Control
                  type="text"
                  value={this.state.childSName}
                  onChange={this.handleChange}
                  name="childSName"
                  placeholder="Child's Last Name"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.dob}
                  onChange={this.handleChange}
                  name="dob"
                  placeholder="Date of Birth"
                />
              </Form.Group>

              <Form.Group controlId="boyGirl">
                {/* <Form.Label>User type: </Form.Label> */}
                <Form.Control
                  as="select"
                  custom
                  name="boyGirl"
                  onChange={this.handleChange}
                  value={this.state.boyGirl}
                >
                  <option value="boy">Boy</option>
                  <option value="girl">Girl</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="Parent1FName">
                <Form.Label>Parent / Guardian </Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.Parent1FName}
                  onChange={this.handleChange}
                  name="Parent1FName"
                  placeholder="First Name"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="Parent1SName">
                <Form.Control
                  type="text"
                  value={this.state.Parent1SName}
                  name="Parent1SName"
                  onChange={this.handleChange}
                  placeholder="Last Name"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="Parent1Phone">
                <Form.Control
                  type="text"
                  value={this.state.Parent1Phone}
                  name="Parent1Phone"
                  onChange={this.handleChange}
                  placeholder="Phone number"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="Parent1Email">
                <Form.Control
                  type="text"
                  value={this.state.Parent1Email}
                  name="Parent1Email"
                  onChange={this.handleChange}
                  placeholder="Email Address"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="ParentAddress">
                <Form.Control
                  type="text"
                  value={this.state.ParentAddress}
                  name="ParentAddress"
                  onChange={this.handleChange}
                  placeholder="Home Address"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="ParentPostcode">
                <Form.Control
                  type="text"
                  value={this.state.ParentPostcode}
                  name="ParentPostcode"
                  onChange={this.handleChange}
                  placeholder="Postcode"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="homeLanguage">
                <Form.Label>Home langauge</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="homeLanguage"
                  onChange={this.handleChange}
                  required
                >
                  {Object.keys(this.allLanguages).map((lang) => (
                    <option key={lang} value={this.allLanguages[lang]}>
                      {lang}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Update your profile
              </Button>
            </Form>
          </>
      </Container>
    );
  }
}