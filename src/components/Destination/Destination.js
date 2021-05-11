import React from 'react';
import Map from '../../Pciture/Map.png';
import './Destination.css'

const Destination = () => {

    return (
        <div className="container">
            <div className='row just'>
                <div className='col-md-5 just5'>
                    <h6>Pick From</h6>
                    <input type="text" name=""  placeholder="from" id="" /><br /><br />
                    <h6>Pick To</h6>
                    <input type="text"  name="" placeholder="to" id="" /><br /><br />
                    <button> Click hare </button>

                </div>

                <div className='col-md-7'>

                    <img style={{height:'500px', paddingLeft:'20px'}} src={Map} alt="" />

                </div>
            </div>

        </div>
    );
};

export default Destination;