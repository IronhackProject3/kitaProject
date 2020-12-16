import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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
        console.log(err.response);
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
      .post(`/api/parent/${this.props.user.parent}/addApplication`, {
        kitaId: kitaId,
        kitaPriority: '',
        date: new Date().toString()
      })
      .then((response) => {
        console.log(response);
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
    return (
      <div>
        {this.state.kita && (
          <>
            <h4>{this.state.kita.kitaName}</h4>
            <img
              style={{ width: "300px" }}
              src={this.state.imageURL}
              alt={this.state.kitaName}
            />
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

            <iframe
              title="kitamap"
              width="300"
              height="200"
              frameBorder="0"
              src={`https://www.google.com/maps?q=${this.state.kita.Address}&output=embed`}
            ></iframe>
            <br />



            {!this.props.user ? (
            <>
            <Button variant="primary">
              {/* not logged in */}
              <Link to={`/login`}> Login to apply to {this.state.kita.kitaName}</Link> 
            </Button>
            </>
          ) : this.props.user.type === 'parent' && !this.props.user.parent ? (
            <>
            {/* logged in  but does not have an application*/}
            <Button variant="primary">
              <Link to={`/kitas/${this.state.kita._id}/signup`}> Apply to {this.state.kita.kitaName}</Link> 
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
          ) : this.props.user && this.props.user.type === 'parent' && this.props.user.parent ? (
            <>
            </>
          ) : (
            <>
            </>
         )}


            
            
            <br /><br />

            {this.props.user.parent && (
              <Button variant="primary" onClick={this.oneClickApplyToKita}>
                {/* display if userid corrsponds to parent and DOES NOT exist in the parents table and kitaId is not in the parent applications array*/}
                {/* <Link to={`/kitas/${this.state.kita._id}/signup`}> Apply to {this.state.kita.kitaName} with 1 click</Link>  */}
                Apply to {this.state.kita.kitaName} with 1 click
              </Button>
            )}

            <br />
            <br />

            <Button variant="primary">
              {/* display if userid corrsponds to parent and DOES exist in the parents table and kitaId is not in the parent applications array */}
              <Link to={`/kitas/${this.state.kita._id}/signup`}>
                Edit application before applying to {this.state.kita.kitaName}
              </Link>
            </Button>
            <br />
            <br />

            <Button variant="primary">
              {/* display if userid corrsponds to parent and DOES exist in the parents table and kitaId is not in the parent applications array */}
              <Link to={`/kitas/${this.state.kita._id}`}>
                You have applied to {this.state.kita.kitaName}
              </Link>
            </Button>
            <br />
            <br />
          </>
        )}
      </div>
    );
  }
}
