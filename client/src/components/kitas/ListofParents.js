import React, { Component } from 'react'
import axios from 'axios';

export default class ListofParents extends Component {

state = {
parentsList: [],


}

getData = () => {
  axios.get("/api/parent").then(response => {
    console.log(response.data)
    //here goes filtering wit the userId in props
   // setState of parentsList
   this.setState({
      parentsList: response.data
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
           return (<li>{parent.childFName}, {parent.boyGirl},  {parent.dob}</li>)
         })}
          </ul>
      </div>
    )
  }
}
