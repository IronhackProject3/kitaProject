import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar as Bootnav, Nav } from 'react-bootstrap';
import { logout } from '../services/auth';
import './Navbar.css';


const handleLogout = props => {
  console.log(props);
  logout().then(() => {
    props.setUser(null);
  })
}

export default function Navbar(props) {
  return (
  
    <Bootnav collapseOnSelect expand="sm" bg='primary'>
      <Bootnav.Brand>
        {/* <Logo alt="" width="30" height="30" className="d-inline-block align-top" /> */}
        <Link to='/'>Home</Link>
      </Bootnav.Brand>
      
      <Bootnav.Toggle aria-controls="responsive-navbar-nav" />
      <Bootnav.Collapse id="responsive-navbar-nav">
        
        <Nav className="mr-auto">
          {props.user && props.user.type === 'kita' && props.user.kita ? (
            <>
              <Nav.Link as={Link} to={`/kitas/${props.user.kita}`}>My Kita</Nav.Link>
              <Nav.Link className="justify-content-end" as={Link} to='/' onClick={() => handleLogout(props)}>Logout</Nav.Link>
            </>
          ) : props.user && props.user.type === 'kita' && !props.user.kita ? (
            <>
              <Nav.Link as={Link} to="AddKita/">Add Kita</Nav.Link>
              <Nav.Link className="justify-content-end" as={Link} to='/' onClick={() => handleLogout(props)}>Logout</Nav.Link>
            </>
          ) : props.user && props.user.type === 'parent' && !props.user.parent ? (
            <>
              <Nav.Link as={Link} to="/kitas/myKita">My Application</Nav.Link>
              <Nav.Link className="justify-content-end" as={Link} to='/' onClick={() => handleLogout(props)}>Logout</Nav.Link>
            </>
          ) : props.user && props.user.type === 'parent' && !props.user.parent ? (
            <>
              <Nav.Link as={Link} to="/kitas/myKita">Edit Application</Nav.Link>
              <Nav.Link className="justify-content-end" as={Link} to='/' onClick={() => handleLogout(props)}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to='/signup'>Signup</Nav.Link>
              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            </>
         )}
        </Nav>
      
      </Bootnav.Collapse>
    </Bootnav>

  

  )
}

<Link to="AddKita/"> Add your Kita </Link>
