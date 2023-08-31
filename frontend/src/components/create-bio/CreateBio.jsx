// import {useEffect, useRef, useState} from 'react';
// import './CreateBio.css';
// import axios from '../AxiosInstance';
// import Cookies from 'js-cookie';
// import { useNavigate, Navigate, useLocation} from 'react-router-dom';
// import CreateBioQuestion from './CreateBioQuestion';

// function CreateProfile() {

//     var questions = [
//         {
//             param: "gender",
//             question: "What is your gender?",
//             required: true,
//             type: "string",
//             structure: "options",
//             private: false,
//             multiple: false,
//             options: ["Male", "Female", "Other", "Prefer not to say"],
//         },
//         {
//             param: "majors",
//             question: "What is/are your majors?",
//             required: true,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: [],
//         },
//         {
//             param: "year",
//             question: "What year will you be this fall?",
//             required: true,
//             type: "number",
//             structure: "options",
//             private: false,
//             multiple: false,
//             options: ["Freshman", "Sophomore", "Junior", "Senior"],
//         },
//         {
//             param: "extroversion",
//             question: "Would you rather go out or stay in?",
//             required: true,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["Def staying in", "Prefer staying in", "Hmmm", "Prefer going out", "Def going out"],
//         },
//         {
//             param: "cleanliness",
//             question: "How clean do you keep your room?",
//             required: true,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["It's a mess", "Almost a mess", "Meh", "Pretty clean", "Pristine"],
//         },
//         {
//             param: "noise",
//             question: "Do you mind your room being noisy?",
//             required: true,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["I plan on throwing parties", "Nah", "Only when I'm sleeping", "Only when I'm sleeping and studying", "I prefer quiet"]
//         },
//         {
//             param: "sleep",
//             question: "What's your weekday sleep schedule?",
//             required: false,
//             type: "number",
//             structure: "sleepSpecial",
//             private: true,
//             multiple: false,
//             options: [],
//         },
//         {
//             param: "guests",
//             question: "Guests in the room?",
//             required: false,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["No guests", "Some guests", "Don't mind", "Want guests"]
//         },
//         {
//             param: "dorm",
//             question: "Where do you plan on living?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: ["Quad", "Hill", "KCECH", "DuBois", "High Rises", "Off Campus"],
//         },
//         {
//             param: "greek",
//             question: "Do you plan on joining greek life?",
//             required: false,
//             type: "number",
//             structure: "options",
//             private: false,
//             multiple: false,
//             options: ["Nope", "Prob not", "Maybe", "Considering it", "Yes"],
//         }, 
//         {
//             param: "smoke",
//             question: "Do you smoke?",
//             required: false,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["Never", "Socially", "Yes"],
//         }, 
//         {
//             param: "drink",
//             question: "Do you drink?",
//             required: false,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["Never", "Socially", "Yes"]
//         },
//         {
//             param: "hobbies",
//             question: "What are your hobbies?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: [],
//         },
//         {
//             param: "hometown",
//             question: "Where do you call home?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: false,
//             options: [],
//         },
//         {
//             param: "music",
//             question: "Favorite music genres?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: [],
//         },
//         {
//             param: "shows",
//             question: "Favorite TV shows?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: [],
//         },
//         {
//             param: "instagram",
//             question: "What's your instagram?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: false,
//             options: [],
//         }
//     ]

//     const navigate = useNavigate();
//     const {state} = useLocation();
    
//     var [questionNum, setQuestionNum] = useState(0);

//     var [filled, setFilled] = useState(false);
//     var [error, setError] = useState("");

//     useEffect (() => {

//     }, []);

//     const logout = async () => {
//         axios.delete('/logout').then(() => {
//             Cookies.remove('email');
//             navigate('/');
//         });
//     }

//     const childRefs = useRef([]);

//     const prevQ = async () => {
//         console.log(childRefs.current[questionNum].getAns());
//         console.log(childRefs.current[questionNum].getListAns());

//         setQuestionNum(questionNum - 1);
//         setError("");
//         // resetAns();
//     }

//     const nextQ = async () => {
//         if (questions[questionNum].type === "string") {
//             if ((questions[questionNum].multiple && childRefs.current[questionNum].getListAns().length === 0) ||
//                 (!questions[questionNum].multiple && childRefs.current[questionNum].getAns().length === 0)) {
//                     // if (!questions[questionNum].required) {
//                     //     return skipQ();
//                     // } else {
//                         return setError("Please enter an input.");
//                     // }
//             }
//         }

//         childRefs.current[questionNum].setSkip(false);
//         setQuestionNum(questionNum + 1);
//         setError("");

//         console.log(childRefs.current[questionNum].getAns());
//         console.log(childRefs.current[questionNum].getListAns());

//         // resetAns();
//     }

//     const skipQ = async () => {
//         childRefs.current[questionNum].setSkip(true);
//         if (questionNum === questions.length - 1) {
//             return submit();
//         }
//         setError("");
//         setQuestionNum(questionNum + 1);
//     }

//     const submit = async () => {
//         var bioInfo = {};
//         questions.map((q, index) => {
//             var curr = childRefs.current[index]
//             if (!curr.getSkip()) {
//                 if (q.structure === "sleepSpecial") {
//                     bioInfo[q.param] = {
//                         start: parseInt(curr.getListAns()[0]),
//                         end: parseInt(curr.getListAns()[1]),
//                     }
//                 } else if (q.multiple) {
//                     bioInfo[q.param] = curr.getListAns();
//                 } else if (q.type === "number") {
//                     bioInfo[q.param] = parseInt(curr.getAns());
//                 } else if (q.type === "string") {
//                     bioInfo[q.param] = curr.getAns();
//                 }
//             }
//         });


//         bioInfo["email"] = Cookies.get('email');
//         axios.post('/create-bio', bioInfo).then((res) => {
//             console.log(res.data)
//         }).catch((error) => {
//             console.log(error.response.data);
//         });
//     }

//     // Disabled for development:
//     // if (!state || !state.internal) {
//     //     return <Navigate to = '/'/>;
//     // } else {
//         return (
//             <div className = 'create-bio-wrapper'>
//                 { Cookies.get('email') ? "" : <h1>Not Logged In!</h1> }
                
//                 <div className = "q-wrapper">
//                     {/* <CreateBioQuestion 
//                         question = {questions[questionNum]}
//                         answer = {answer}
//                     /> */}
//                     {questions.map((question, key) => {
//                         if (key === questionNum) {
//                             return (
//                                 <CreateBioQuestion
//                                     ref = {e => (childRefs.current[key] = e)}
//                                     question = {question}
//                                     // bio = {bio}
//                                     className = {"bio-question bio-question-open"}
//                                     key = {key}
//                                 />
//                             );
//                         } else {
//                             return (
//                                 <CreateBioQuestion
//                                     ref = {e => (childRefs.current[key] = e)}
//                                     question = {question}
//                                     // bio = {bio}
//                                     className = {"bio-question bio-question-closed"}
//                                     key = {key}
//                                 />
//                             );
//                         }
//                     })}
//                     {error.length === 0 ? 
//                         ""
//                         :
//                         <div className = "bio-error-msg">{error}</div>
//                     }

//                 </div>
                
//                 {/* <button onClick = {logout}>Logout</button> */}

//                 <div className = "bio-btn-container">
//                     <div className = "bl-btn-wrapper">
//                         {questionNum === 0 ? 
//                             ""
//                             :
//                             <button className = "bio-question-btn btn btn-info btn-lg" 
//                                 onClick = {prevQ}>
//                                 Back
//                             </button>
//                         }
//                     </div>
//                     <div className = "br-btn-wrapper">
//                         {questions[questionNum].required ? 
//                             ""
//                             :
//                             <button className = "bio-question-btn btn btn-info btn-lg" id = "bio-skip-btn"
//                                 onClick = {skipQ}>
//                                 Skip
//                             </button>
                    
//                         }
                        
//                         {questionNum === questions.length - 1 ? 
//                             <button className = "bio-question-btn btn btn-info btn-lg"
//                                 onClick = {submit}>
//                                 Submit
//                             </button>
//                             :
//                             <button className = "bio-question-btn btn btn-info btn-lg"
//                                 onClick = {nextQ}>
//                                 Next
//                             </button>
                            
//                         }
//                     </div>
//                 </div>
//             </div>
//         )
//     // }

// }

// export default CreateProfile;


import {useRef, useEffect, useState } from 'react';
import {Box, Button, Grid, Paper, Stack} from '@mui/material';
import axios from '../AxiosInstance';
import Cookies from 'js-cookie';
import {Navigate, useNavigate, useLocation} from 'react-router-dom';

import QuestionChoice from './QuestionChoice'
import QuestionTextbox from './QuestionTextbox'
import QuestionSlider from './QuestionSlider'
import QuestionRange from './QuestionRange'
import QuestionPicture from './QuestionPicture'


function CreateBio() {

    // ********************* Variables & Functions **********************

    const {state} = useLocation();
    const navigate = useNavigate();

    var questions = [
        {
            label: "gender",
            question: "What is your gender?",
            required: true,
            type: "choice",
            private: false,
            options: ["Male", "Female", "Other"],
        },
        {
            label: "majors",
            question: "What is/are your majors?",
            required: true,
            type: "textMultiple",
            private: false,
        },
        {
            label: "year",
            question: "What year will you be entering this fall?",
            required: true,
            type: "choice",
            private: false,
            options: ["Freshman", "Sophomore", "Junior", "Senior"],
        },
        {
            label: "extroversion",
            question: "Would you rather go out or stay in?",
            required: true,
            type: "slider",
            private: true,
            marks: [
                {
                    value: 1,
                    label: 'Stay in',
                },
                {
                    value: 5,
                    label: 'Go out'
                }
            ],
            min: 1,
            max: 5,
            default: 3,
        },
        {
            label: "cleanliness",
            question: "How clean do you keep your room?",
            required: true,
            type: "slider",
            private: true,
            marks: [
                {
                    value: 1,
                    label: "Messy",
                },
                {
                    value: 5,
                    label: "Pristine"
                }
            ],
            min: 1,
            max: 5,
            default: 3,
        },
        {
            label: "noise",
            question: "How quiet do you keep your room?",
            required: true,
            type: "slider",
            private: true,
            marks: [
                {
                    value: 1,
                    label: "Parties",
                },
                {
                    value: 5,
                    label: "Silence"
                }
            ],
            min: 1,
            max: 5,
            default: 3,
        },
        {
            label: "sleep",
            question: "What's your weekday sleep schedule?",
            marks: [
                {
                    value: 0,
                    label: '8pm',
                },
                {
                    value: 5,
                    label: '1am',
                },
                {
                    value: 10,
                    label: '6am',
                },
                {
                    value: 15,
                    label: '11am',
                },
            ],
            min: 0,
            max: 15,
            required: true,
            type: "range",
            private: true,
        },
        {
            label: "guests",
            question: "Guests in the room?",
            required: false,
            type: "slider",
            private: true,
            marks: [
                {
                    value: 1.2,
                    label: "No guests",
                },
                {
                    value: 4.75,
                    label: "Want guests"
                }
            ],
            min: 1,
            max: 5,
            default: 3,
        },
        {
            label: "dorm",
            question: "Where are you thinking of living?",
            required: false,
            type: "textMultiple",
            private: false,
        },
        {
            label: "greek",
            question: "Do you plan on joining greek life?",
            required: false,
            type: "slider",
            private: true,
            marks: [
                {
                    value: 1,
                    label: "Nope",
                },
                {
                    value: 5,
                    label: "Yes"
                }
            ],
            min: 1,
            max: 5,
            default: 3,
        }, 
        {
            label: "smoke",
            question: "Do you smoke?",
            required: false,
            type: "choice",
            private: true,
            options: ["Never", "Socially", "Yes"],
        }, 
        {
            label: "drink",
            question: "Do you drink?",
            required: false,
            type: "choice",
            structure: "options",
            private: true,
            options: ["Never", "Socially", "Yes"]
        },
        {
            label: "hometown",
            question: "Where do you call home?",
            required: false,
            type: "textSingle",
            private: false,
        },
        {
            label: "instagram",
            question: "What is your ig handle?",
            required: false,
            type: "textSingle",
            private: false,
        },
        {
            label: "hobbies",
            question: "What are your hobbies?",
            required: false,
            type: "textMultiple",
            private: false,
        },
        {
            label: "music",
            question: "Favorite music genres?",
            required: false,
            type: "textMultiple",
            private: false,
        },
        {
            label: "shows",
            question: "Favorite TV shows?",
            required: false,
            type: "textMultiple",
            private: false,
        },
        {
            label: "pictures",
            question: "Upload some pictures",
            required: true,
            type: "uploadPics",
            private: false,
        }
    ]

    var temp = {};
    for (const q of questions) {
        temp[q.label] = [];
    }

    let [answers, setAnswers] = useState(temp);

    let [currQ, setCurrQ] = useState(0);

    let [errorMsg, setErrorMsg] = useState("");

    const nextQ = () => {
        if (currQ === questions.length - 2) {
            var params = {}
            questions.map((q) => {
                if (answers[q.label].length > 0) {
                    if (q.type === 'textMultiple') {
                        params[q.label] = answers[q.label];
                    } else if (q.type === 'range') {
                        var temp = {
                            start: answers[q.label][0],
                            end: answers[q.label][1],
                        }
                        params[q.label] = temp;
                    } else {
                        params[q.label] = answers[q.label][0];
                    }
                }
            })
            
            params['email'] = Cookies.get('email');
            console.log(params)
            axios.post('/create-bio', params).then((res) => {
                console.log(res.data);
                setCurrQ(currQ + 1);
            }).catch((error) => {
                setErrorMsg(error.response.data);
            });

            setCurrQ(currQ + 1);

        } else if (currQ === questions.length - 1) {
            // Upload picture
            const formData = new FormData();
            formData.append('email', Cookies.get('email'));
            answers['pictures'].map((pic) => {
                formData.append('pictures', pic);
            })
            console.log(formData);
            
            axios.post('/profile-pic', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                // Generate initial recommendations
                axios.post('/generateNewRecs', {email: Cookies.get('email')})
                .then(() => {
                    navigate('/home');
                }).catch((error) => {
                    setErrorMsg(error.response.data);
                }) 
            }).catch((error) => {
                setErrorMsg(error.response.data);
            });

        } else {
            if (!questions[currQ].required || answers[questions[currQ].label].length !== 0) {
                setCurrQ(currQ + 1);
            }
        }
    }
    
    const skipQ = () => {
        if (currQ >= questions.length - 2) {
            nextQ();
        } else {
            setAnswers((prevAnswers) => ({ ...prevAnswers, [questions[currQ].label]: [] }))
            setCurrQ(currQ + 1);
        }
    }
    const prevQ = () => {
        setCurrQ(currQ - 1);
        setErrorMsg("");
    }

    const changeAnswer = (label, newAnswer) => {
        const answer = Array.isArray(newAnswer) ? newAnswer : [newAnswer];
        setAnswers((prevAnswers) => ({ ...prevAnswers, [label]: answer }));
    }

    // useEffect(() => {
    //     console.log(answers);
    // }, [answers]);




    // ********************* Styling **********************

    const mainContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    }

    const createBioPanelStyle = {
        width: currQ === questions.length - 1 ? '512px': '380px',
        padding: '30px 30px 25px 30px',
        backgroundColor: 'white',
    }

    const buttonStyle = {
        color: 'white',
        textTransform: 'none',
        padding: '4px 12px 4px 12px',
        fontSize: '17px',
        fontWeight: 500,
        borderRadius: '5px',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'rgba(0, 178, 183, 0.85)',
            boxShadow: 'none'
        },
        '&:active': {
            backgroundColor: 'rgba(0, 178, 183, 0.7)',
        }
    }

    const errorMsgStyle = {
        display: (errorMsg.length === 0) ? 'none' : 'block',
        paddingTop: '10px',
        paddingBottom: '7px',
        height: '10px',
        fontSize: '13px',
        color: 'rgb(211, 47, 47)',
    }

    if (!state || !state.internal) {
        return <Navigate to = '/'/>;
    } return (
        <>
            <Box sx = {mainContainerStyle}>
                <Paper sx = {createBioPanelStyle}>
                    <Stack spacing='25px'>
                        <Stack spacing = '0px'>
                        {questions.map((question, index) => {
                            switch (question.type) {
                                case 'choice':
                                    return (
                                        <QuestionChoice
                                            label = {question.label}
                                            question = {question.question}
                                            options = {question.options}
                                            isPrivate = {question.private}
                                            changeAnswer = {changeAnswer}
                                            visible = {index === currQ}
                                            key = {index}
                                        />
                                    );
                                case 'textMultiple':
                                    return (
                                        <QuestionTextbox
                                            label = {question.label}
                                            multiple = {true}
                                            question = {question.question}
                                            isPrivate = {question.private}
                                            changeAnswer = {changeAnswer}
                                            visible = {index === currQ}
                                            key = {index}
                                        />
                                    );
                                case 'textSingle':
                                    return (
                                        <QuestionTextbox
                                            label = {question.label}
                                            multiple = {false}
                                            question = {question.question}
                                            isPrivate = {question.private}
                                            changeAnswer = {changeAnswer}
                                            visible = {index === currQ}
                                            key = {index}
                                        />
                                    )
                                case 'slider':
                                    return(
                                        <QuestionSlider
                                            label = {question.label}
                                            question = {question.question}
                                            marks = {question.marks}
                                            min = {question.min}
                                            max = {question.max}
                                            isPrivate = {question.private}
                                            changeAnswer = {changeAnswer}
                                            visible = {index === currQ}
                                            key = {index}
                                        />
                                    );
                                case 'range':
                                    return(
                                        <QuestionRange
                                            label = {question.label}
                                            question = {question.question}
                                            marks = {question.marks}
                                            min = {question.min}
                                            max = {question.max}
                                            isPrivate = {question.private}
                                            changeAnswer = {changeAnswer}
                                            visible = {index === currQ}
                                            key = {index}
                                        />
                                    );
                                case 'uploadPics':
                                    return(
                                        <QuestionPicture
                                            label = {question.label}
                                            question = {question.question}
                                            changeAnswer = {changeAnswer}
                                            visible = {index === currQ}
                                            key = {index}
                                        />
                                    );
                                default:
                                    return null;
                            }
                            })} 
                            <Box sx = {errorMsgStyle}>
                                {errorMsg}
                            </Box>
                        </Stack>

                        <Grid
                            container
                            justifyContent="space-between"
                            columns={30}
                        >
                            <Grid item xs={currQ === questions.length - 1 ? 6 : 8}>
                                {currQ !== 0 ? 
                                    (<Button 
                                        variant='contained'
                                        sx={buttonStyle}
                                        fullWidth
                                        disableRipple
                                        onClick = {prevQ}
                                    >
                                        Previous
                                    </Button>) : ""
                                }
                            </Grid>
                            
                            <Grid item xs={14}> 
                                <Grid
                                    container
                                    justifyContent='space-between'
                                    columns={14}
                                >
                                    <Grid item xs={6}>
                                        {!questions[currQ].required ? 
                                            (<Button
                                                variant = 'contained'
                                                sx = {buttonStyle}
                                                fullWidth
                                                disableRipple
                                                onClick = {skipQ}
                                            >
                                                Skip
                                            </Button>) : ""
                                        }
                                        
                                    </Grid>
                                    <Grid item xs={currQ === questions.length - 1 ? 5.5 : 6}>
                                        <Button
                                            variant = 'contained'
                                            sx = {buttonStyle}
                                            fullWidth
                                            disableRipple
                                            onClick = {nextQ}
                                        >
                                            {currQ === questions.length - 1 ? 'Submit' : 'Next'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}


export default CreateBio;