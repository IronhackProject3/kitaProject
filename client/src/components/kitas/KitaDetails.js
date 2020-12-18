import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./KitaDetails.css";
import { Container, Row, Col } from "react-bootstrap";

export default class KitaDetails extends Component {
  state = {
    kita: null,
    imageURL: "",
  };

  getData = () => {
    const id = this.props.match.params.id;
    // console.log("KitaID is", id)
    axios
      .get(`/api/kitas/${id}`)
      .then((response) => {
        // console.log("response from details", response);
        this.setState({
          kita: response.data,
          imageURL: response.data.imageURL,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          this.setState({
            error: "Sorry - Kita Not found 🤷‍♀️ 🤷‍♂️",
          });
        }
      });
  };

  oneClickApplyToKita = () => {
    const kitaId = this.props.match.params.id;
    const newApplication = {
      kitaId: kitaId,
      kitaPriority: 0,
      parentPriority: 0,
      date: new Date().toString(),
    }
    axios
      .post(`/api/parent/${this.props.user.parent._id}/addApplication`, newApplication)
      .then((response) => {
        console.log(response);
        this.props.setUserParent(response.data);
        this.props.history.push(`/`);
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log("prevprops", prevProps, "prevstate", prevState);
    // console.log("props", this.props);
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getData();
    }
  }

  render() {
    console.log(this.state.kita);

    const alreadyApplied = this.state.kita && this.props.user.parent ? this.props.user.parent.applications.reduce((prev, current) => {
      if (current.kitaId === this.state.kita._id.toString()) {
        return true;
      }
      return prev;
    }, false) : false;
    //const alreadyApplied = false;

    return (
      <Container>
        {this.state.kita && (
          <>
            <Row>
              <Col>
                <h1 className="h1-details">{this.state.kita.kitaName}</h1>
              </Col>
            </Row>

            <Row>
              <Col>
                <img
                  style={{ width: "400px" }}
                  src={this.state.imageURL}
                  alt={this.state.kitaName}
                />
                <br />
                <br />
              </Col>
              <Col>
                <h2 className="details-h2">General Information:</h2>
                <p className="p-details">
                  <strong>Languages: </strong>
                  {this.state.kita.emailAddress}
                </p>
                <p className="p-details">
                  <strong>Total number of Places: </strong>
                  {this.state.kita.totalPlaces}
                </p>
                <p className="p-details">
                  <strong>Available Places: </strong>
                  {this.state.kita.freePlaces}
                </p>
                <p className="p-details">
                  <strong>Open Time: </strong>
                  {this.state.kita.openTime}&nbsp;&nbsp;
                  <strong>Close Time: </strong>
                  {this.state.kita.closeTime}
                </p>
                <p className="p-details">
                  <strong>Min Age: </strong>
                  {this.state.kita.minAge}&nbsp;&nbsp;
                  <strong>Max Age: </strong>
                  {this.state.kita.maxAge}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <iframe
                  title="kitamap"
                  width="400"
                  height="270"
                  frameBorder="0"
                  src={`https://www.google.com/maps?q=${this.state.kita.Address}&output=embed`}
                ></iframe>
              </Col>
              <Col>
                <h2 className="details-h2">Contact:</h2>
                <p className="p-details">
                  <strong>Address: </strong>
                  {this.state.kita.Address}
                </p>
                <p className="p-details">
                  <strong>Postcode: </strong>
                  {this.state.kita.Postcode}
                </p>
                <p className="p-details">
                  <strong>Telephone: </strong>
                  {this.state.kita.Telephone}
                </p>
                <p className="p-details">
                  <strong>Email: </strong>
                  <a href={"mailto:" + this.state.kita.emailAddress}>
                    {this.state.kita.emailAddress}
                  </a>
                </p>
              </Col>
            </Row>


            <Row className="justify-content-md-center apply-kita-button">
              <Col md="auto">
              {this.props.user.kita && this.props.user.type === 'kita' ? (
              <>

              </>
            ) : !this.props.user ? (
              <>
                <Button className="apply-button" variant="primary">
                  {/* not logged in */}
                  <Link to={`/login`}>
                    {" "}
                    Login to apply to {this.state.kita.kitaName}
                  </Link>
                </Button>
              </>
            ) : this.props.user.type === "parent" && !this.props.user.parent ? (
              <>
                {/* logged in  but does not have an application*/}
                <Button variant="primary">
                  <Link to={`/kitas/${this.state.kita._id}/signup`}>
                    {" "}
                    Apply to {this.state.kita.kitaName}
                  </Link>
                </Button>
              </>
            ) : this.props.user.parent && !alreadyApplied ? (
              <>
                <Button variant="primary" onClick={this.oneClickApplyToKita}>
                  {/* display if userid corrsponds to parent and DOES NOT exist in the parents table and kitaId is not in the parent applications array*/}
                  {/* <Link to={`/kitas/${this.state.kita._id}/signup`}> Apply to {this.state.kita.kitaName} with 1 click</Link>  */}
                  Apply to {this.state.kita.kitaName} with 1 click
                </Button>
              </>
            ) : this.props.user &&
              this.props.user.type === "parent" &&
              this.props.user.parent &&
              !alreadyApplied ? (
              <>
                <Button variant="primary">
                  {/* display if userid corrsponds to parent and DOES exist in the parents table and kitaId is not in the parent applications array */}
                  <Link to={`/kitas/${this.state.kita._id}/signup`}>
                    Edit application before applying to{" "}
                    {this.state.kita.kitaName}
                  </Link>
                </Button>
              </>
            ) : (
              <p className="already-applied">You have already applied for this kita</p>
            )}
              </Col>
            </Row>




            
          </>
        )}
      </Container>
    );
  }
}
