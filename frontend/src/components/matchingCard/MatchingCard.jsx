import React, { useState, useEffect } from 'react';
import './MatchingCard.css';
import { Grid, Card, Button } from '@mui/material';
import axios from '../AxiosInstance';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';

const MatchingCard = () => {
    // baseEmail is the email address of the current logged in user
    const baseEmail = Cookies.get("email")
    const [roomUsers, setRoomUsers] = useState(); // State for all users in the current user's waiting room

    const navigate = useNavigate();

    const getWaitroomUsers = () => {
        // Initial function to retrieve all users in waiting room from database and setting the state to be displayed

        axios.get('/actions/getWaitUsers', {params: {email: baseEmail}})
        .then(async (res) => {
            setRoomUsers(res.data);
        })
        .catch(err => 
            alert('ERROR ' + err)
        )
    }

    const generateRecs = () => {
        // Generate new recommendations to fill the waiting room
         axios.post('/actions/generateNewRecs', {email: baseEmail})
         .then(async (res) => {
            window.location.reload(false);
         })
         .catch(err =>
            alert('ERROR ' + err)    
        )
    }

    useEffect(() => {
        getWaitroomUsers();
    }, [])

    return (
        <div className="wrapper">
            <div className="Header">
                <h1>Matching</h1>    
            </div>
            <Grid container spacing={2} className="cards">

                {/* For each user return a card */}
                {roomUsers ?
                 roomUsers.length > 0 ? (
                    roomUsers && roomUsers.map(user => {
                        return (
                            <Grid item xs={4}>
                                <Card className="personCard" onClick={() => {navigate("/home/matchingDetail", {state: {user: user}})}}>
                                    <div className="personCardDiv">
                                        {user.name}
                                    </div>
                                </Card>
                            </Grid>
                        )
                    }))
                    :
                    // If there is not enough recommenders, generate new recs
                    <div className="buttondiv">
                        <Button onClick={()=>{generateRecs()}}>Generate</Button>
                    </div>
                    : null
                }

            </Grid>
        </div>
    )

}

export default MatchingCard