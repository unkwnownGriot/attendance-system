import React,{useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav, Button} from 'react-bootstrap';
import { AuthContext } from '../Context/AuthContext';

const Header = () => {
    const {signOut} = useContext(AuthContext)
 
    return (
        <div>
            <Navbar className='nav-header'  style={{'padding':"10px"}}>
              <Nav>
                  <h1>hello mr test </h1>
              </Nav>
              <Nav className='d-flex justify-content-start'>
                <div className="img-container "
                onClick={signOut}>
                      <Button variant='danger'>
                          Se déconnecter
                      </Button>
                </div>
              </Nav>
            </Navbar>
        </div>
    );
};

export default Header;