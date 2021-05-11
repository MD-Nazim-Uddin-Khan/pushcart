import { Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserContext } from '../../App';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li style={{paddingRight:"650px",fontSize:"25px"}}>    
                        Pushcart
                    </li>

                    {setLoggedInUser ? <li> {loggedInUser.email}</li> : <li> </li>}

                    <li>                         
                        <Link style={{textDecoration:"none"}} to="/home"> Home</Link>
                    </li>                     
                    <li>
                        <Link style={{textDecoration:"none"}} to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/blog">Blog</Link>
                    </li>
                    {/* <li>
                        <Link style={{textDecoration:"none"}} to="/contact">Contact</Link>
                    </li> */}
                    <li>
                        <Link  style={{textDecoration:"none"}} to="/login" >
                        <Button variant="warning">Login</Button></Link>
                    </li>                    
                </ul>
            </nav>
            
        </div>
    );
};

export default Header;