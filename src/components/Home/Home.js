import React, { useEffect, useState } from 'react';
import DataInfo from '../../Imagae/Image.json';
import Cart from '../Cart/Cart';
import './Home.css';

const Home = () => {

    const [data, setData] = useState([])

    useEffect( ()=> {
        setData(DataInfo)
        console.log(DataInfo)
    },[])

    return (
        <div className="bkg">
            <div className="col-md-3 num">
            {
                data.map(d=> <Cart name={d}></Cart>)
            }
            </div>
        </div>
    );
};

export default Home;