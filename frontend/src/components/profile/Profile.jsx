import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../AxiosInstance";
import { Grid, Button, Chip, TextField } from "@mui/material";
import "./Profile.css";

import { LocationOn, CalendarToday, School } from "@mui/icons-material";

const Profile = () => {
    const baseEmail = Cookies.get("email");

    // User bio data that will be displayed
    const [userData, setUserData] = useState({});
    let [prevData, setPrevData] = useState({});

    // State to keep track of whether or not the page is in edit mode
    const [edit, setEdit] = useState(false);

    // States for the textfield inputs
    const [aboutText, setAboutText] = useState("");

    const [dormsText, setDormsText] = useState("");
    const [hobbiesText, setHobbiesText] = useState("");
    const [musicText, setMusicText] = useState("");
    const [showsText, setShowsText] = useState("");

    // Init method to get the user data
    const getUserData = () => {
        axios
            .get("/get-bio", { params: { email: baseEmail } })
            .then(async (res) => {
                setUserData(res.data);
                setAboutText(res.data.aboutBio);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getUserData();
    }, []);

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

    // Method to process saving the updates
    const processSave = () => {
        setEdit(false);

        // Update about text
        userData.aboutBio = aboutText;
        
        // Save userData into the database
        axios
            .post("/update-bio", userData)
            .then(async (res) => {
                console.log("updated");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Method to process discarding the updates
    const processDiscard = () => {
        console.log(prevData);
        setEdit(false);
        setUserData(prevData); // Return the state of information back to old state before edit
    };

    const handleDelete = (field, ind) => {
        if (field === "dorms") {
            let dormsArr = userData.dorm;
            dormsArr.splice(ind, 1);
            setUserData({
                ...userData,
                dorm: dormsArr,
            })
        } else if (field === "hobbies") {
            userData.hobbies.splice(ind, 1);
            setUserData(userData);
        } else if (field === "music") {
            userData.music.splice(ind, 1);
            setUserData(userData);
        } else if (field === "shows") {
            userData.shows.splice(ind, 1);
            setUserData(userData);
        } else {
            throw "error";
        }
    };

    // Method to handle adding a new entry to an array field like dorms or hobbies
    const handleAdd = (field) => {
        if (field === "dorms") {
            setDormsText("");
            // Add new preference to array
            userData.dorm.push(dormsText);
        } else if (field === "hobbies") {
            setHobbiesText("");
            userData.hobbies.push(hobbiesText);
        } else if (field === "music") {
            setMusicText("");
            userData.music.push(musicText);
        } else if (field === "shows") {
            setShowsText("");
            userData.shows.push(showsText);
        } else {
            throw "error";
        }
    };

    return (
        <>
            {userData.email ? (
                <Grid container spacing={2}>
                    <Grid item xs={4} className="left">
                        <div className="imagediv">PROFILE IMAGE HERE</div>
                        <div className="textdiv">
                            <h1 style={{ marginBottom: 0 }}>{userData.name}</h1>
                            <ul className="smallerinfo">
                                <li className="leftlistitem">
                                    <div className="icon">
                                        <LocationOn />
                                    </div>
                                    <div className="text">
                                        {userData.hometown ? userData.hometown : "no location"}
                                    </div>
                                </li>
                                <li className="leftlistitem">
                                    <div className="icon">
                                        <CalendarToday />
                                    </div>
                                    <div className="text">{userData.year}</div>
                                </li>
                                <li className="leftlistitem">
                                    <div className="icon">
                                        <School />
                                    </div>
                                    <div className="text">{userData.majors}</div>
                                </li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid item xs={8} className="right">
                        <div className="about">
                            <h1 style={{ marginTop: 0 }}>About</h1>
                            <div className="intro">
                                {!edit ? (
                                    !userData.aboutBio || userData.aboutBio === "" ? (
                                        <i>Add something here!</i>
                                    ) : (
                                        userData.aboutBio
                                    )
                                ) : (
                                    <TextField
                                        multiline
                                        fullWidth
                                        value={aboutText}
                                        onChange={(e) => {
                                            setAboutText(e.target.value);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="categories">
                            <div className="categoriesInner">
                                <div className="subtitle">
                                    <h2>Preferred Dorms</h2>
                                </div>
                                <div className="chips">
                                    {edit ? (
                                        <div className="textinput">
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={dormsText}
                                                onChange={(e) => setDormsText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    e.key === "Enter" && handleAdd("dorms");
                                                }}
                                            />
                                            <Button variant="text" onClick={() => handleAdd("dorms")}>
                                                Add
                                            </Button>
                                        </div>
                                    ) : null}
                                    {userData.dorm.map((dorm, ind) => {
                                        return edit ? (
                                            <Chip
                                                className="chip"
                                                key={ind}
                                                label={dorm}
                                                variant="outlined"
                                                onDelete={() => handleDelete("dorms", ind)}
                                            /> // If edit mode make chip deletable
                                        ) : (
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
                                            label={getSleepString(userData.sleep)}
                                            variant="outlined"
                                        />
                                    }
                                </div>
                                <div className="subtitle">
                                    <h2>Hobbies</h2>
                                </div>
                                <div className="chips">
                                    {edit ? (
                                        <div className="textinput">
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={hobbiesText}
                                                onChange={(e) => setHobbiesText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    e.key === "Enter" && handleAdd("hobbies");
                                                }}
                                            />
                                            <Button
                                                variant="text"
                                                onClick={() => handleAdd("hobbies")}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    ) : null}
                                    {userData.hobbies.map((hobby, ind) => {
                                        return edit ? (
                                            <Chip
                                                className="chip"
                                                label={hobby}
                                                key={ind}
                                                variant="outlined"
                                                onDelete={() => handleDelete("hobbies", ind)}
                                            />
                                        ) : (
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
                                    {edit ? (
                                        <div className="textinput">
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={musicText}
                                                onChange={(e) => setMusicText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    e.key === "Enter" && handleAdd("music");
                                                }}
                                            />
                                            <Button variant="text" onClick={() => handleAdd("music")}>
                                                Add
                                            </Button>
                                        </div>
                                    ) : null}
                                    {userData.music.map((mus, ind) => {
                                        return edit ? (
                                            <Chip
                                                className="chip"
                                                label={mus}
                                                key={ind}
                                                variant="outlined"
                                                onDelete={() => handleDelete("music", ind)}
                                            />
                                        ) : (
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
                                    {edit ? (
                                        <div className="textinput">
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={showsText}
                                                onChange={(e) => setShowsText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    e.key === "Enter" && handleAdd("shows");
                                                }}
                                            />
                                            <Button variant="text" onClick={() => handleAdd("shows")}>
                                                Add
                                            </Button>
                                        </div>
                                    ) : null}
                                    {userData.shows.map((show, ind) => {
                                        return edit ? (
                                            <Chip
                                                className="chip"
                                                label={show}
                                                key={ind}
                                                variant="outlined"
                                                onDelete={() => handleDelete("shows", ind)}
                                            />
                                        ) : (
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
                            {!edit ? (
                                <Button
                                    variant="contained"
                                    className="bttn"
                                    onClick={() => {
                                        setEdit(true);
                                        setPrevData(JSON.parse(JSON.stringify(userData))); // Deep copy
                                    }}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="contained"
                                        className="disc bttn"
                                        color="error"
                                        onClick={() => processDiscard()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="bttn"
                                        color="success"
                                        onClick={() => processSave()}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                        </div>
                    </Grid>
                </Grid>
            ) : null}
        </>
    );
};

export default Profile;
