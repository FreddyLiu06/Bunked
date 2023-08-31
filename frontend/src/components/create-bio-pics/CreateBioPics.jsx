import {useEffect, useState} from 'react';
import './CreateBioPics.css';
import axios from '../AxiosInstance';
import Cookies from 'js-cookie';
import PicItem from './PicItem';


function CreateBioPics() {

    console.log("User: " + Cookies.get('email'));

    var [pics, setPics] = useState([]);

    return (
        <div className = "bio-pics-body">
            <h1 className = "bio-pics-temp-title">{"Bio Pics for " + Cookies.get('email')}</h1>
            <div className = "bio-pics-container">
                <h1 className = "bio-pics-title">
                    Add some photos
                </h1>
                <div className = "bio-pics-wrapper">
                    <ul>
                    {Array.apply(null, Array(9)).map((x, i) => (
                        <div key = {i}>
                            <PicItem 
                                index = {i}
                                pics = {pics}
                                setPics = {setPics}
                            />
                        </div>
                    ))}
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default CreateBioPics;