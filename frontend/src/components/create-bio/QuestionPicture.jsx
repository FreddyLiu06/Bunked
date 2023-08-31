import {useState, useRef} from 'react';
import {Box, Grid, Paper} from '@mui/material';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function QuestionPicture({label, question, changeAnswer, visible}) {
    // ********************* Variables & Functions **********************

    let [pics, setPics] = useState([]);

    const hiddenInput = useRef();

    const addPic = (e) => {
        console.log(e.target.files);
        let tmp = [...pics, e.target.files[0]]
        setPics(tmp);
        changeAnswer(label, tmp)
    }

    const deletePic = (i) => {
        let tmp = [...pics];
        tmp.splice(i, 1);
        setPics(tmp);
        changeAnswer(label, tmp)
    }

    // ********************* Styling **********************

    const uploadStyle = {
        border: '3px dashed lightslategray',
        height: '187px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '50px',
        color: 'lightslategray',
        cursor: 'pointer',
        transition: 'background-color 0.3s, box-shadow 0.3s',
        '&:hover': {
        backgroundColor: 'rgba(119,136,153, 0.1)',
        },
        '&:active': {
            backgroundColor: 'rgba(119,136,153, 0.17)',
            },
    }

    const emptyPicStyle = {
        border: '3px dashed lightslategray',
        height: '187px',
        borderRadius: '10px',
    }

    const pictureWrapperStyle = {
        padding: '1px',
        height: '187px',
        border: 'solid 1px transparent',
        position: 'relative',
    }

    const pictureStyle = {
        height: '100%',
        borderRadius: '10px',
        objectFit: 'cover',
        overflow: 'hidden',
    }

    const deleteButtonStyle = {
        position: 'absolute',
        top: '-7px',
        right: '-8px',
        height: '20px',
        width: '20px',
        color: 'red',
        cursor: 'pointer',
    }

    const deleteButtonOverlayStyle = {
        position: 'absolute',
        top: '-7px',
        right: '-8px',
        height: '18px',
        width: '18px',
        borderRadius: '50%',
        backgroundColor: 'white',
    }

    return (
        <Box display = {visible ? 'block' : 'none'}>
            <Box fontSize = '17px' marginBottom={'18px'}>
                <Box>
                    {question}
                </Box>
            </Box>
            <Box>
                <Grid container columns = {12} spacing = {2}>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <Grid item xs = {4} key = {i}>
                            {(i === pics.length) ? (
                                <>
                                    <input 
                                        id = "upload-files"
                                        type="file" 
                                        onChange={addPic}
                                        accept="image/png, image/jpeg"
                                        ref = {hiddenInput}
                                        hidden
                                    />
                                    <Box sx = {uploadStyle} onClick = {() => {hiddenInput.current.click()}}>
                                        <p>+</p>
                                    </Box>
                                </>
                            ) : i < pics.length ? (
                                <Box style = {pictureWrapperStyle}>
                                    <Box height = {'100%'} overflow = {'hidden'}>
                                        <img src={URL.createObjectURL(pics[i])} style = {pictureStyle}/>
                                    </Box>
                                    <Box style = {deleteButtonOverlayStyle}></Box>
                                    <HighlightOffIcon style = {deleteButtonStyle} onClick = {() => {deletePic(i)}}/>
                                </Box>
                            ) : (
                                <Box sx = {emptyPicStyle}/>                                    
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>
            
        </Box>
    )
}

export default QuestionPicture;