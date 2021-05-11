import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const { name, img } = props.name;
    console.log(name)

    return (
        <div  style={{textAlign:"center", border:"1px solid red"}}>
            <Link style={{textDecoration:"none"}} to='/destination'>
             <img style={{ width:"300px"}} src={img} alt=""/> <br/>
             <h3>{name}</h3>
             </Link>
        </div>
    );
};

export default Cart;