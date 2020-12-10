import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar as Nav } from 'react-bootstrap';


export default function Navbar(props) {
  return (
    <Nav className='nav justify-content-start' bg='primary'>
      <Nav.Brand>
        <Link to='/'>Home</Link>
      </Nav.Brand>
    </Nav>
  )
}