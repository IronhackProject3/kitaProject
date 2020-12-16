import React, { Component } from 'react'
import axios from 'axios';
import './ListofParents.css';
export default class ListofParents extends Component {

state = {
parentsList: [],


}

getData = () => {
  axios.get("/api/parent").then(response => {
    console.log(response.data)
    //here goes filtering wit the userId in props

    const obj = response.data.map( element => {
      return {...element, applications: element.applications.filter(applicant => {
        console.log(applicant) 
      
        return  applicant.kitaId == this.props.user.kita })}  // true if the ids match  - filter further by adding conditions 
    })
    const filteredApplication = obj.filter(applicant => applicant.applications.length > 0) //filtering by populated or not
   // setState of parentsList
   
   this.setState({ // puts the filtered set of data into the state
      parentsList: filteredApplication
    })
  }).catch(error => {
    console.log(error)
  })
}

componentDidMount() {
this.getData()
}

  render() {
    console.log(this.props)
    
    return (
      <div>
        <h1>List of Applicants</h1>
        <ul>
         {this.state.parentsList.map(parent => {
           return (<li data-gender={parent.boyGirl}>{parent.childFName},  born {parent.dob.split("T")[0].split("-").reduce((t,v) => t = v + "." + t)} </li>)
         })}
          </ul>
      </div>
    )
  }
}
