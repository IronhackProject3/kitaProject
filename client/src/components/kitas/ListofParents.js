import React, { Component } from "react";
import axios from "axios";
import "./ListofParents.css";
import { Container, Col, Row } from "react-bootstrap";

export default class ListofParents extends Component {
  state = {
    parentsList: [],
    englishAtHome: false,
  };

  handleInputChange = (event) => {
    console.log(event.target);
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(value);
    this.setState({
      englishAtHome: value,
    });
  };

  getData = () => {
    axios
      .get("/api/parent")
      .then((response) => {
        // console.log(response.data)
        //here goes filtering wit the userId in props

        const obj = response.data.map((element) => {
          return {
            ...element,
            applications: element.applications.filter((applicant) => {
              // console.log(applicant)
              return applicant.kitaId === this.props.user.kita._id;
            }),
          }; // true if the ids match  - filter further by adding conditions
        });
        const filteredApplication = obj.filter(
          (applicant) => applicant.applications.length > 0
        ); //filtering by populated or not

        const sortedByDate = filteredApplication.sort(function (a, b) {
          return (
            new Date(a.applications[0].date) - new Date(b.applications[0].date)
          );
        });
        console.log("sortedAndFiltered ", sortedByDate);

        this.setState({
          parentsList: sortedByDate, //sortedAndFiltered
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getData();
  }

  englishCheck = () => {};

  render() {
    this.englishCheck();
    const allLanguages = {
      de: "German ",
      en: "English ",
      Turkish: "tr",
      ru: "Russian ",
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

    let englishFilterd = this.state.parentsList;
    if (this.state.englishAtHome) {
      englishFilterd = this.state.parentsList.filter((applicant) => {
        if (applicant.homeLanguage.includes("en")) {
          return applicant;
        }
      }); //filtering by english language in there or not
    }

    console.log(this.state.englishAtHome);

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1 className="parents-h1">List of Applicants</h1>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <form>
              <label>
                <span className="english">English at home </span>&nbsp;&nbsp;
                <input
                  name="englishAtHome"
                  type="checkbox"
                  checked={this.state.englishAtHome}
                  onChange={this.handleInputChange}
                />
              </label>
            </form>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">
          <ul>
          {englishFilterd.map((parent) => {
            return (
              <li className="applicants" data-gender={parent.boyGirl}>
                {parent.childFName}, born{" "}
                {parent.dob
                  .split("T")[0]
                  .split("-")
                  .reduce((t, v) => (t = v + "." + t))}
                , applied {parent.applications[0].date},{" "}
                {parent.homeLanguage.map((language) => allLanguages[language])}{" "}
              </li>
            );
          })}
        </ul>
          </Col>
        </Row>
        
      </Container>
    );
  }
}
