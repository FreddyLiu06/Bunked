import {useEffect, useRef, useState} from 'react';
import './PicItem.css';

function PicItem({index, pics, setPics}) {

    const hiddenInput = useRef();

    const handleUploadClick = (e) => {
        console.log("HERE");
        hiddenInput.current.click();
    }

    const addPic = (e) => {
        console.log(e.target.files);
        
        setPics([...pics, URL.createObjectURL(e.target.files[0])]);
    }
    
    const transpose = (ind) => {
        var x = Math.floor(ind / 3);
        var y = ind % 3;
        return (y * 3 + x)
    }

    if (transpose(index) === pics.length) {
        return (
            <div className = 'add-pic-wrapper'>
                <input 
                    id = "upload-files"
                    type="file" 
                    onChange={addPic}
                    accept="image/png, image/jpeg"
                    ref = {hiddenInput}
                    hidden
                />
                <div id ="upload-pic-btn" onClick = {(e) => {handleUploadClick(e)}}>
                    +
                </div>
            </div>
        )
    } else if (transpose(index) < pics.length) {
        return (
            <div className = 'pic-item-wrapper'>
                <img className = 'pic-item' src={pics[transpose(index)]} />
            </div>
        )
    } else {
        return (
            <div className = 'empty-pic-wrapper'>

            </div>
        )
    }
}

export default PicItem;