import React, { Component } from 'react'
import axios from 'axios';



export default class ListOfKitas extends Component {

  state = {
    kitas: [],
    parentsList: [],
  }

  componentDidMount = () => {
    const parent = this.props.parent;
    console.log("parent from listOfKitas", parent);
    
    const id = parent._id;
    axios.get(`/api/parent/${id}/ListOfkitas`)
    .then(response => {
      console.log(response.data);
      this.setState({
        kitas: response.data
      })
    })
    .catch(err => console.log(err))
  }


  render() {
    console.log(this.state.kitas);
    
    return (
      <>
        <h1>List of kitas I've applied</h1>
        <ul>
          {this.state.kitas.map( application => (
            <li key={application}>{application}</li>
          ))}
        </ul>
        
      </>
    )
  }
}

 {/* <DragDropContext>
          <Droppable droppableId="characters">
            <Draggable>
              {(provided) => (
                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.kitas.map( application => => {
                    return (
                      <li key={application}>{application}</li>
                    );
                  })}
                </ul>
              )}
            </Draggable>
          </Droppable>
        </DragDropContext> */}
