import {useRef, useEffect, useState } from 'react';
import {Box, Grid, Paper, Stack, TextField} from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Cookies from 'js-cookie';
import io from "socket.io-client";
import socket from "./socket"

import ted from "../../testImages/Ted.jpg"
import barney from "../../testImages/Barney.jpeg"
import marshall from "../../testImages/Marshall.jpeg"
function Chat() {
    
    // ********************* Variables & Functions **********************

    const tedMatches = [
        {
            chatID: '00002',
            email: 'barney@upenn.edu',
            name: 'Barney',
            picture: barney,
            msg: [
                {
                    timeStamp: '2023-07-01',
                    sender: 'ted@upenn.edu',
                    text: "Hey, how's it going?",
                },
                {
                    timeStamp: '2023-07-02',
                    sender: 'barney@upenn.edu',
                    text: "Not much, how are you?",
                }
            ],
        },
        {
            chatID: '00005',
            email: 'marshall@upenn.edu',
            name: 'Marshall',
            picture: marshall,
            msg: [],
        },
    ]

    const barneyMatches = [
        {
            chatID: '00002',
            email: 'ted@upenn.edu',
            name: 'Ted',
            picture: ted,
            msg: [
                {
                    timeStamp: '2023-07-01',
                    sender: 'ted@upenn.edu',
                    text: "Hey, how's it going?",
                },
                {
                    timeStamp: '2023-07-02',
                    sender: 'barney@upenn.edu',
                    text: "Not much, how are you?",
                }
            ]
        }
    ]

    const myMatches = [
        {
            chatID: '00001',
            email: 'ted@upenn.edu',
            name: 'Ted',
            picture: ted,
            msg: [
                {
                    timeStamp: '2023-07-01',
                    sender: 'ted@upenn.edu',
                    text: "Hey, how's it going?",
                },
                {
                    timeStamp: '2023-07-02',
                    sender: 'ydu24@seas.upenn.edu',
                    text: "Not much, how are you?",
                }
            ]
        },
        {
            chatID: '00003',
            email: 'barney@upenn.edu',
            name: 'Barney',
            picture: barney,
            msg: [],
        },
        {
            chatID: '00004',
            email: 'marshall@upenn.edu',
            name: 'Marshall',
            picture: marshall,
            msg: [],
        },
    ]

    const currMatches = (Cookies.get('email') === 'ted@upenn.edu') ? tedMatches :
                        (Cookies.get('email') === 'barney@upenn.edu') ? barneyMatches :
                        myMatches;




    // Hard-coded Matches
    const [matches, setMatches] = useState(currMatches);

    let [current, setCurrent] = useState(-1);

    let [msgInput, setMsgInput] = useState('');

    const sendMsg = () => {
        if (msgInput.trim() !== '') {
            
            // Update local data
            var timeStamp = new Date().toLocaleString();
            
            updateLocalMsg(
                current, 
                timeStamp, 
                Cookies.get('email'), 
                msgInput,
            );

            // Send socket message
            const messageData = {
                room: matches[current].chatID,
                sender: Cookies.get('email'),
                timeStamp: timeStamp,
                text: msgInput,
            };

            socket.emit("send_message", messageData);

            // setMatches((prevMatches) => {
            //     const updated = [...prevMatches];
            //     updated[current] = {
            //         ...updated[current],
            //         msg: [
            //             ...updated[current].msg,
            //             {
            //                 timeStamp: new Date().toLocaleString(),
            //                 sender: Cookies.get('email'),
            //                 text: msgInput,
            //             }
            //         ]
            //     }
                
            //     console.log(updated);

            //     return(updated);
            // });

            setMsgInput("");
        }
    }

    const updateLocalMsg = (index, timeStamp, sender, text) => {
        setMatches((prevMatches) => {
            const updated = [...prevMatches];
            updated[index] = {
                ...updated[index],
                msg: [
                    ...updated[index].msg,
                    {
                        timeStamp: timeStamp,
                        sender: sender,
                        text: text,
                    }
                ]
            }

            console.log(updated);
            return(updated);
        });
    }

    useEffect(() => {
        matches.map( (m, _) => {
            socket.emit("join_room", m.chatID);
        });
    }, []);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("Message received");
            for (var i = 0; i < matches.length; i++) {
                if (matches[i].chatID === data.room && Cookies.get('email') !== data.sender) {
                    updateLocalMsg(i, data.timeStamp, data.sender, data.text);
                    break;
                }
            }
        });
        return () => socket.off('receive_message');
    }, [socket])


    
    // ********************* Styling **********************

    const tempStyle = {
        margin: '-30px',
        height: '100% + 30px',
        width: 'calc(100% + 55px)',
    }

    const matchListWrapperStyle = {
        height: '100%',
        padding: '36px',
        paddingLeft: '36px',
        paddingRight: '36px',
        borderRight: '1px solid silver',
    }

    const chatTitleStyle = {
        fontSize: '33px',
        lineHeight: 1.2,
        alightItems: 'center',
        fontWeight: 800,
        color: 'primary.main',
        marginBottom: '26px',
    }

    const matchItemStyle = {
        width: '100%',
        height: '90px',
        cursor: 'pointer',
        borderBottom: '1px solid silver',
    }

    const chatListPicStyle = {
        height: '60px',
        width: '60px',
        margin: '15px',
        marginTop: '16px',
        borderRadius: '50%',
        objectFit: 'cover',
    }

    const chatListNameStyle = {
        marginTop: '16px',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '6px'
    }

    const chatBoxWrapperStyle = {
        height: '100%',
        // backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
    }

    const chatBoxTitleStyle = {
        fontSize: '33px',
        alightItems: 'center',
        fontWeight: 'bold',
        marginLeft: '20px',
        marginTop: '22px',
    }

    const messagePaneWrapperStyle = {
        width: '100%',
        flexGrow: 1,
        padding: '30px 30px 0 30px',
    }

    const chatInputWrapperStyle = {
        width: '100%',
        height: '140px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }

    const messageBoxStyle = {
        padding: '8px 14px 8px 14px',
        fontSize: '18px',
        borderRadius: '10px',
    }

    return (
            <Grid container direction = 'row' sx = {tempStyle}>
                <Grid item xs = {4}>
                    <Box sx = {matchListWrapperStyle}>
                        <Box sx = {chatTitleStyle}>
                                Chats
                        </Box>
                        <Stack>
                            {matches.map((m, i) => (
                                <Box 
                                    sx = {matchItemStyle} 
                                    key = {i} 
                                    borderTop = {i === 0 ? '1px solid silver' : 'none'}
                                    onClick = {() => setCurrent(i)}>
                                    <Stack direction = 'row' height = '100%'>
                                        <Box item xs = {3}>
                                            <img src = {m.picture} style = {chatListPicStyle} alt = 'User'/>
                                        </Box>
                                        <Box item xs = {9}>
                                            <Box sx = {chatListNameStyle}>
                                                {m.name}
                                            </Box>
                                            <Box>
                                                {m.msg.length === 0 ? "Send your first message!" : m.msg[m.msg.length - 1].text}
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs = {8}>
                    <Box sx = {chatBoxWrapperStyle}>
                        <Box width = '100%' height = '90px' borderBottom = '1px solid grey'>
                            <Box sx = {chatBoxTitleStyle}>
                                {current === -1 ? "" : matches[current]['name']}
                            </Box>
                        </Box>
                        <Stack sx = {messagePaneWrapperStyle} spacing = '16px'>
                            { current === -1 ? "" :
                                matches[current]['msg'].map((msg, i) => (
                                    <Box fullWidth
                                        key = {i}
                                        display = 'flex'
                                        flexDirection = {msg['sender'] === Cookies.get('email') ? 'row-reverse' : 'row'}
                                    >
                                        <Box 
                                            sx = {messageBoxStyle}
                                            backgroundColor = {msg['sender'] === Cookies.get('email') ? 'secondary.main' : '#0000000d'}
                                            color = {msg['sender'] === Cookies.get('email') ? 'white' : 'black'}
                                        >
                                            {msg['text']}
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Stack>
                        <Box sx = {chatInputWrapperStyle} >
                            <Box sx = {{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                marginLeft: '40px',
                                marginRight: '10px',
                            }}>
                                <TextField 
                                    fullWidth variant = 'outlined' 
                                    placeholder = 'Type your message here'
                                    color = 'secondary'
                                    value = {msgInput}
                                    onChange = {(e) => {
                                        setMsgInput(e.target.value);
                                    }}
                                    onKeyDown = {(e) => {
                                        (e.key === 'Enter') && sendMsg();
                                    }}
                                />
                            </Box>
                            <Box sx = {{
                                width: '60px',
                                height: '100%',
                                marginRight: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                paddingBottom: '5px',
                            }}>
                                <ArrowCircleRightIcon 
                                    sx = {{
                                        height: '60px',
                                        fontSize: '52px',
                                        color: 'secondary.main',
                                        cursor: 'pointer',
                                    }}
                                    onClick = {() => sendMsg()}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
    );
}

export default Chat;