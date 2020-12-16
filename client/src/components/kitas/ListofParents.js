import React, { Component } from "react";
import axios from "axios";
import "./ListofParents.css";
export default class ListofParents extends Component {
  state = {
    parentsList: [],
  };

  getData = () => {
    axios
      .get("/api/parent")
      .then((response) => {
        console.log('lll', response.data);
        //here goes filtering wit the userId in props

        const obj = response.data.map((element) => {
          return {
            ...element,
            applications: element.applications.filter((applicant) => {
              console.log(applicant);

              return applicant.kitaId == this.props.user.kita._id;
            }),
          }; // true if the ids match  - filter further by adding conditions
        });
        const filteredApplication = obj.filter(
          (applicant) => applicant.applications.length > 0
        ); //filtering by populated or not

        //   const sortedAndFiltered  =  filteredApplication.fromEntries(
        //     filteredApplication.entries(filteredApplication.childFName).sort(([,a],[,b]) => a-b));
        //  // setState of parentsList
        //  console.log('sortedAndFiltered ',  filteredApplication)

        this.setState({
          // puts the filtered set of data into the state

          parentsList: filteredApplication, //sortedAndFiltered
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
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

    console.log(this.props);

    return (
      <div>
        <h1>List of Applicants</h1>
        <ul>
          {this.state.parentsList.map((parent) => {
            return (
              <li data-gender={parent.boyGirl}>
                {parent.childFName}, born{" "}
                {parent.dob
                  .split("T")[0]
                  .split("-")
                  .reduce((t, v) => (t = v + "." + t))}
                ,{" "}
                {parent.homeLanguage.map((language) => allLanguages[language])}{" "}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
