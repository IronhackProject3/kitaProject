import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./KitaDetails.css";

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

    axios
      .post(`/api/parent/${this.props.user.parent._id}/addApplication`, {
        kitaId: kitaId,
        kitaPriority: 0,
        parentPriority: 0,
        date: new Date().toString(),
      })
      .then((response) => {
        console.log(response);
        this.props.setUserParentApplication(response);
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
    return (
      <>
        {this.state.kita && (
          <>
            <h1 className="h1-details">{this.state.kita.kitaName}</h1>

            <div className="details-wrapper">
              <div className="left-div">
                <img
                  style={{ width: "400px" }}
                  src={this.state.imageURL}
                  alt={this.state.kitaName}
                />
                <br />
                <br />
                <iframe
                  title="kitamap"
                  width="400"
                  height="270"
                  frameBorder="0"
                  src={`https://www.google.com/maps?q=${this.state.kita.Address}&output=embed`}
                ></iframe>
              </div>

              <div className="right-div">
                <div className="general-info">
                <h2 className="details-h2">General Information:</h2>
                    <p>
                        <strong>Languages: </strong>
                        {this.state.kita.emailAddress}
                      </p>
                      <p>
                        <strong>Total number of Places: </strong>
                        {this.state.kita.totalPlaces}
                      </p>
                      <p>
                        <strong>Available Places: </strong>
                        {this.state.kita.freePlaces}
                      </p>
                      <p>
                        <strong>Open Time: </strong>
                        {this.state.kita.openTime}&nbsp;&nbsp;
                        <strong>Close Time: </strong>
                        {this.state.kita.closeTime}
                      </p>
                      <p>
                        <strong>Min Age: </strong>
                        {this.state.kita.minAge}&nbsp;&nbsp;
                        <strong>Max Age: </strong>
                        {this.state.kita.maxAge}
                      </p>
                </div>
                  
                <div className="contact-info">
                <h2 className="details-h2">Contact:</h2>
                <p>
                  <strong>Address: </strong>
                  {this.state.kita.Address}
                </p>
                <p>
                  <strong>Postcode: </strong>
                  {this.state.kita.Postcode}
                </p>
                <p>
                  <strong>Telephone: </strong>
                  {this.state.kita.Telephone}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={"mailto:" + this.state.kita.emailAddress}>
                    {this.state.kita.emailAddress}
                  </a>
                </p>
                </div>
                
                
              </div>
            </div>
            <div class="col-md-12 text-center">

            {!this.props.user ? (
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
            ) : this.props.user.parent ? (
              <>
                <Button variant="primary" onClick={this.oneClickApplyToKita}>
                  {/* display if userid corrsponds to parent and DOES NOT exist in the parents table and kitaId is not in the parent applications array*/}
                  {/* <Link to={`/kitas/${this.state.kita._id}/signup`}> Apply to {this.state.kita.kitaName} with 1 click</Link>  */}
                  Apply to {this.state.kita.kitaName} with 1 click
                </Button>
              </>
            ) : this.props.user &&
              this.props.user.type === "parent" &&
              this.props.user.parent ? (
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
              <></>
            )}
              
            </div>
            
          </>
        )}
      </>
    );
  }
}
