import React, { Component } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './ListOfKitas.css';
import { Container, Col, Row } from "react-bootstrap";

export default class ListOfKitas extends Component {
  state = {
    kitas: [],
    parentsList: [],
  };

  componentDidMount = () => {
    const parent = this.props.user.parent._id;

    axios
      .get(`/api/parent/${parent}/ListOfkitas`)
      .then((response) => {
        console.log("kitas", response.data);
        this.setState({
          kitas: response.data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.kitas);

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
      padding: grid * 2,
      margin: `0 0 ${grid}px 0`,

      // change background colour if dragging
      background: isDragging ? "lightgreen" : "grey",

      // styles we need to apply on draggables
      ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
      background: isDraggingOver ? "lightblue" : "lightgrey",
      padding: grid,
      width: 250,
    });

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    const onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      console.log(result);

      const items = reorder(
        this.state.kitas,
        result.source.index,
        result.destination.index
      );

      const editedItems = items.map((application, index) => {
        application.parentPriority = index;
        return application;
      });

      const parentId = this.props.user.parent._id;
      axios.put(`/api/parent/${parentId}/reOrderApplications`, {
        applications: editedItems,
      });

      this.setState({
        kitas: editedItems,
      });
    };

    return (
      <Container>

        <Row className="justify-content-md-center"> 
          <Col md="auto"><h1 className="list-h1">List of kitas I've applied</h1></Col>
        </Row>

        <Row className="justify-content-md-center"> 
          <Col md="auto"><p>Here you should order you applications according to your priority. <br />This order will impact on the kita’s decision when allocating their available places. </p></Col>
        </Row>

        <Row className="justify-content-md-center"> 
          <Col md="auto">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.kitas.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item.kitaName}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Col>
        </Row>
      </Container>
    );
  }
}
