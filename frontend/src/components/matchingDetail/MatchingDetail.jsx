import './MatchingDetail.css';
import { useState, useEffect } from 'react';
import axios from '../AxiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Grid, Chip, Button } from '@mui/material';
import { LocationOn, CalendarToday, School } from '@mui/icons-material';

function MatchingDetail() {
    // baseEmail is the email of the current user
    const baseEmail = Cookies.get('email')
    
    // targetUser is the user dictionary that contains details about the user
    const {state} = useLocation()
    const targetUserData = state.user

    const navigate = useNavigate()

    useEffect(() => {
    }, [])

    // Method to get the start and end time string in 12 hr format from a sleep object which is in 24 hr
    const getSleepString = (sleepobj) => {
        let start =
            sleepobj.start % 12 === 0
                ? (sleepobj.start % 12) + 12
                : sleepobj.start % 12;
        let startstr = start > 7 ? "pm" : "am";

        let end =
            sleepobj.end % 12 === 0 ? (sleepobj.end % 12) + 12 : sleepobj.end % 12;
        let endstr = end < 4 || end === 12 ? "pm" : "am";

        return `${start}${startstr} - ${end}${endstr}`;
    };

    // // Function to get the next recommended user from recommendedUser array
    // const nextRec = async () => {
    //     if (index + 1 >= userArr.length) {
    //         setLoading(true);
    //         await resetRecommend();
    //         setTimeout(() => {setIndex(0); setLoading(false)}, 500);
    //     } else {
    //         setIndex(index + 1);
    //         setLastIndex(index + 1);
    //     }
    // }

    // Method to check if there is a match between the newly accepted user and current user, and handle the match if there is
    const handleMatch = async () => {
        const match = (await axios.get('/actions/checkMatch', {params: {firstEmail: baseEmail, secEmail: targetUserData.email}})).data; // Check if there is a match between the newly accepted user
        if (match) {
            alert("Matched!");
            // TODO: Handle the match here, create new chat room/send new message
            await axios.post('/match/createNewMatch', {email1: baseEmail, email2: targetUserData.email})
            .then(res => {
                console.log('Matched');
            }).catch(err => {
                alert('ERROR: ' + err);
            })
        }
    }

    // Function to add user to waiting room
    const addWaitRoom = () => {
        axios.post('/actions/addUserWait', {baseEmail: baseEmail, targetEmail: targetUserData.email})
        .then(res => {
            alert("Added to waiting room");
        }).catch( err =>
            alert('ERROR: ' + err)
        )
    }

    // Function accept user
    const acceptUser = () => {
        // TODO: Need to implement checking if there is a match
        axios.post('/actions/acceptUser', {baseEmail: baseEmail, targetEmail: targetUserData.email})
        .then(res => {
            alert("User Accepted");
            handleMatch(); // Check and handle match
            navigate('/home');
        }).catch(err => 
            alert('ERROR: ' + err) 
        )
    }

    // Reject user
    const rejectUser = () => {
        axios.post('/actions/rejectUser', {baseEmail: baseEmail, targetEmail: targetUserData.email})
        .then(res => {
            alert("User Rejected");
            navigate('/home');
        }).catch(err => 
            alert('ERROR: ' + err) 
        )
    }


    return (      
    <>
            {targetUserData.email ? (
                <Grid container spacing={2}>
                    <Grid item xs={4} className="left">
                        <div className="imagediv">PROFILE IMAGE HERE</div>
                        <div className="textdiv">
                            <h1 style={{ marginBottom: 0 }}>{targetUserData.name}</h1>
                            <ul className="smallerinfo">
                                <li className="leftlistitem">
                                    <div className="icon">
                                        <LocationOn />
                                    </div>
                                    <div className="text">
                                        {targetUserData.hometown ? targetUserData.hometown : "no location"}
                                    </div>
                                </li>
                                <li className="leftlistitem">
                                    <div className="icon">
                                        <CalendarToday />
                                    </div>
                                    <div className="text">{targetUserData.year}</div>
                                </li>
                                <li className="leftlistitem">
                                    <div className="icon">
                                        <School />
                                    </div>
                                    <div className="text">{targetUserData.majors}</div>
                                </li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid item xs={8} className="right">
                        <div className="about">
                            <h1 style={{ marginTop: 0 }}>About</h1>
                            <div className="intro">
                                {(
                                    !targetUserData.aboutBio || targetUserData.aboutBio === "" ? (
                                        <i>User has not filled this section out!</i>
                                    ) : (
                                        targetUserData.aboutBio
                                    )
                                )}
                            </div>
                        </div>
                        <div className="categories">
                            <div className="categoriesInner">
                                <div className="subtitle">
                                    <h2>Preferred Dorms</h2>
                                </div>
                                <div className="chips">
                                    {targetUserData.dorm.map((dorm, ind) => {
                                        return(
                                            <Chip
                                                className="chip"
                                                key={ind}
                                                label={dorm}
                                                variant="outlined"
                                            />
                                        );
                                    })}
                                </div>
                                <div className="subtitle">
                                    <h2>Sleep Schedule</h2>
                                </div>
                                <div className="chips">
                                    {
                                        <Chip
                                            className="chip"
                                            label={getSleepString(targetUserData.sleep)}
                                            variant="outlined"
                                        />
                                    }
                                </div>
                                <div className="subtitle">
                                    <h2>Hobbies</h2>
                                </div>
                                <div className="chips">
                                    {targetUserData.hobbies.map((hobby, ind) => {
                                        return (
                                            <Chip
                                                className="chip"
                                                label={hobby}
                                                key={ind}
                                                variant="outlined"
                                            />
                                        );
                                    })}
                                </div>
                                <div className="subtitle">
                                    <h2>Music</h2>
                                </div>
                                <div className="chips">
                                    {targetUserData.music.map((mus, ind) => {
                                        return (
                                            <Chip
                                                className="chip"
                                                label={mus}
                                                key={ind}
                                                variant="outlined"
                                            />
                                        );
                                    })}
                                </div>
                                <div className="subtitle">
                                    <h2>Shows</h2>
                                </div>
                                <div className="chips">
                                    {targetUserData.shows.map((show, ind) => {
                                        return (
                                            <Chip
                                                className="chip"
                                                label={show}
                                                key={ind}
                                                variant="outlined"
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="buttons">
                            {(
                                <>
                                    <Button
                                        variant="contained"
                                        className="disc bttn"
                                        color="error"
                                        onClick={() => {rejectUser()}}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="bttn"
                                        color="success"
                                        onClick={() => {acceptUser()}}
                                    >
                                        Accept
                                    </Button>
                                </>
                            )}
                        </div>
                    </Grid>
                </Grid>
            ) : null}
        </>
    
    );
}

export default MatchingDetail;