// import {useRef, useEffect, useState } from 'react';
// import './Login.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Register from './Register';
// import axios from '../AxiosInstance';
// import Cookies from 'js-cookie';

// import { useNavigate } from 'react-router-dom';

// function Login() {

//     let [login, setLogin] = useState(true);

//     let [loginEmail, setLoginEmail] = useState("");

//     let [loginPassword, setLoginPassword] = useState("");

//     let [emailError, setEmailError] = useState('');

//     let [passwordError, setPasswordError] = useState('');

//     let [serverError, setServerError] = useState('');

//     const emailRef = useRef();
//     const navigate = useNavigate();

//     const validEmailRegex = RegExp(
//         /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
//     );


//     useEffect(() => {
//         emailRef.current.focus();
//     }, []);

//     var handleChange = (event) => {
//         event.preventDefault();
//         const {name, value} = event.target;
//         if (name === 'email') {
//             setLoginEmail(value);
//             if (validEmailRegex.test(value)) {
//                 setEmailError('');
//             } else {
//                 setEmailError('Email is not valid!');
//             }
//         } else {
//             setLoginPassword(value);
//             if (value.length === 0) {
//                 setPasswordError("Password can't be empty!");
//             } else {
//                 setPasswordError('');
//             }
//         };
//     }

//     var handleLogin = async (event) => {
//         event.preventDefault();
//         if (emailError.length === 0 && passwordError.length === 0
//             && loginEmail.length !== 0 && loginPassword.length !== 0) {
//             var params = {
//                 email: loginEmail,
//                 password: loginPassword,
//             };
//             axios.post('/login', params).then((res) => {
//                 console.log(res.data);
//                 Cookies.set('email', res.data.email, {expires: 3});
//                 navigate('/home');
//             }).catch((error) => {
//                 setServerError(error.response.data);
//             });
//         }
//     }


//     return (
//         <div className = "login-box-wrapper">
//             <h1>
//                 {login ? "Log in" : "Sign up"}
//             </h1>
//             {login ? (
//                 <div>
//                     <form className = "login-register-form" onSubmit = {handleLogin}>
//                         <div className = "input-name">
//                             Email
//                         </div>
//                         <input
//                             className={"login-register-input form-control " 
//                                 + (emailError.length > 0 ? "is-invalid":"")}
//                             id="login-email-input"
//                             name = "email"
//                             ref={emailRef}
//                             type="text"
//                             placeholder="Enter your email address"
//                             onChange={handleChange}
//                             value={loginEmail}
//                         />

//                         {emailError.length > 0 &&
//                             <span className = 'input-error'>{emailError}</span>
//                         }
//                         <div className = "input-name" style = {{marginTop: '20px'}}>
//                             Password
//                         </div>
//                         <input
//                             className = {"login-register-input form-control "
//                                 + (passwordError.length > 0 ? "is-invalid":"")}
//                             id = "login-password-input"
//                             name = "password"
//                             type = "password"
//                             placeholder = "Enter your password"
//                             onChange = {handleChange}
//                             value = {loginPassword}
//                         />

//                         {passwordError.length > 0 &&
//                             <span className = 'input-error'>{passwordError}</span>
//                         }

//                         {serverError.length > 0 && 
//                             <div className = 'server-error-box'>
//                                 {serverError}
//                             </div>
//                         }

//                         <button type="submit" className="submit-button btn btn-primary">Login</button>

//                     </form>

//                     <div className = "toggle-btn-wrapper">
//                         <div className = "toggle-btn" onClick = {() => setLogin(!login)}>Register</div>
//                     </div>
                    
//                 </div>
//             ): (
//                 <Register login = {login} setLogin = {setLogin}/>
//             )}
//         </div>
//     )
// }

// export default Login;


import {useRef, useEffect, useState } from 'react';
import {Box, Grid, Paper, Stack, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from '../AxiosInstance';
import Cookies from 'js-cookie';


function Login() {

    // ********************* Variables & Functions **********************

    let [login, setLogin] = useState(true);

    let [signEmErr, setSignEmErr] = useState(false);
    let [signFirstErr, setSignFirstErr] = useState(false);
    let [signLastErr, setSignLastErr] = useState(false);
    let [signPwErr, setSignPwErr] = useState(false);
    let [signPw2Err, setSignPw2Err] = useState(false);

    let [submitError, setSubmitError] = useState(false);
    let [submitErrorText, setSubmitErrorText] = useState("");

    let [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    const validEmailRegex = RegExp(
        /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    );

    const [loginData, setLoginData] = useState( {
        email: '',
        password: '',
    })

    const handleLoginChange = (event) => {
        const {name, value} = event.target;
        setLoginData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const [signupData, setSignupData] = useState( {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        password2: '',
    })

    const handleSignupChange = (event) => {
        const {name, value} = event.target;
        setSignupData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
        if (name === 'email') {
            setSignEmErr(!validEmailRegex.test(value));
        } else if (name === 'firstname') {
            setSignFirstErr(value.trim() === '');
        } else if (name === 'lastname') {
            setSignLastErr(value.trim() === '');
        } else if (name === 'password') {
            setSignPwErr(value.length < 8);
            setSignPw2Err(value !== signupData.password2);
        } else if (name === 'password2') {
            setSignPw2Err(value !== signupData.password);
        }
    }

    const handleLogin = async () => {
        if (loginData.email.trim() !== '' && loginData.password.trim() !== '') {
            var params = {
                email: loginData.email,
                password: loginData.password,
            }
            axios.post('/login', params).then((res) => {
                console.log(res.data);
                Cookies.set('email', res.data.email, {expires: 3});
                navigate('/home');
            }).catch((error) => {
                setSubmitError(true);
                setSubmitErrorText(error.response.data);
            })
        } else {
            setSubmitError(true);
            setSubmitErrorText('Please enter a valid email and password')
        }
    }

    const handleSignup = async () => {
        if (signupData.email.trim() !== '' && signupData.firstname.trim() !== ''
                && signupData.lastname.trim() !== '' && signupData.password.trim() !== ''
                && signupData.password2.trim() !== '' && !signEmErr && !signFirstErr
                && !signLastErr && !signPwErr && !signPw2Err) {
            if (!signupData.email.toLowerCase().endsWith('upenn.edu')) {
                console.log(signupData.email.toLowerCase());
                setSubmitError(true);
                setSubmitErrorText('We only support UPenn students at this moment')
            } else {
                // axios....
                var params = {
                    email: signupData.email,
                    password: signupData.password,
                    name: signupData.firstname,
                }
                axios.post('/register', params).then((res) => {
                    Cookies.set('email', res.data.email, {expires: 3});
                    navigate('/create-bio');
                    setSubmitError(true);
                    setSubmitErrorText('Yeah!!!');                    
                }).catch((error) => {
                    setSubmitError(true);
                    setSubmitErrorText(error.response.data);
                })
            }
        }
    }

    // ********************* Styling **********************

    const loginPanelStyle = {
        // height: '430px',
        width: '363px',
        padding: '30px 35px 20px 35px',
        height: (login && !submitError) ? '347px' :
                (login && submitError) ? '364px' :
                (!login && !submitError) ? '493px' :
                '510px',
        transition: 'height 0.3s ease',
        overflow: 'hidden',
    }
    const loginTitleStyle = {
        fontSize: '33px',
        lineHeight: 1.2,
        alightItems: 'center',
        fontWeight: 'bold',
        color: 'primary.main',
    }

    const textBoxStyle = {
        '& input': {
            padding: '12px 10px',
        },
        '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.05)',
            backgroundColor: '#D9D9D91A',
        },
        '& label': {
            top: '-4px',
        },
        '.MuiInputLabel-shrink': {
            top: '0px',
            left: '1px',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover:not(.Mui-focused):not(.Mui-error) fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
            },
        },
        '& p': {
            marginTop: '1px',
            fontSize: '11px',
        },
        maxHeight: '47px',
    }

    const buttonStyle = {
        color: 'white',
        textTransform: 'none',
        fontSize: '22px',
        borderRadius: '6px',
        boxShadow: 'none',
        height: '47px',
        '&:hover': {
            backgroundColor: 'rgba(0, 178, 183, 1)',
        },
        '&:active': {
            backgroundColor: 'rgba(0, 178, 183, 0.8)',
        }
    }

    const submitErrorStyle = {
        // borderRadius: '4px',
        // border: '1px solid silver',
        marginTop: '7px',
        // padding: '20px',
        marginLeft: '4px',
        height: '10px',
        fontSize: '13px',
        color: 'rgb(211, 47, 47)',
    }



    return (
        <Paper sx = {loginPanelStyle}>
            <Stack spacing = '26px'>
                <Box sx = {loginTitleStyle}>
                    {login ? "Login" : "Sign up"}
                </Box>

                {login ? (
                    <>
                        <TextField
                            id="login-email"
                            label="Email"
                            fullWidth
                            sx = {textBoxStyle}
                            name = "email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />
                        <TextField
                            id="login-password"
                            label="Password"
                            type="password"
                            fullWidth
                            sx = {textBoxStyle}
                            name = "password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            onKeyDown = {(e) => {
                                (e.key === 'Enter' && handleLogin());
                            }}
                        />
                        <Stack>
                            <Button
                                variant = 'contained'
                                sx = {buttonStyle}
                                disableRipple
                                onClick = {handleLogin}
                            >
                                Login
                            </Button>
                            {submitError ? (
                                <Box sx = {submitErrorStyle}>
                                    {submitErrorText}
                                </Box>
                            ) : ""}
                        </Stack>
                        
                    </>
                ) : (
                    <>
                        <TextField
                            id="signup-email"
                            label="UPenn Email"
                            fullWidth
                            sx = {textBoxStyle}
                            name = "email"
                            value={signupData.email}
                            onChange={handleSignupChange}
                            error = {signEmErr}
                            helperText={signEmErr ? "Please enter a valid email address" : ""}
                        />

                        <Grid 
                            container 
                            columns = {30}
                            justifyContent="space-between"
                        >
                            <Grid 
                                item
                                xs = {14}
                            >
                            <TextField
                                id="signup-firstname"
                                label="First Name"
                                fullWidth
                                sx = {textBoxStyle}
                                name = "firstname"
                                value={signupData.firstname}
                                onChange={handleSignupChange}
                                error = {signFirstErr}
                                helperText={signFirstErr ? "Invalid first name" : ""}
                            />
                            </Grid>
                            <Grid  
                                item
                                xs = {14}
                            >
                            <TextField
                                id="signup-lastname"
                                label="Last Name"
                                fullWidth
                                sx = {textBoxStyle}
                                name = "lastname"
                                value={signupData.lastname}
                                onChange={handleSignupChange}
                                error = {signLastErr}
                                helperText={signLastErr ? "Invalid last name" : ""}
                            />                                
                            </Grid>
                        </Grid>
                        
                        <TextField
                            id="signup-password"
                            label="Password"
                            type="password"
                            fullWidth
                            sx = {textBoxStyle}
                            name = "password"
                            value={signupData.password}
                            onChange={handleSignupChange}
                            error = {signPwErr}
                            helperText={signPwErr ? "Password must have at least 8 characters" : ""}
                        />
                        <TextField
                            id="signup-password-confirm"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            sx = {textBoxStyle}
                            name = "password2"
                            value={signupData.password2}
                            onChange={handleSignupChange}
                            error = {signPw2Err}
                            helperText={signPw2Err ? "Passwords do not match" : ""}
                        />
                        <Stack>
                            <Button
                                variant = 'contained'
                                sx = {buttonStyle}
                                disableRipple
                                onClick = {handleSignup}
                            >
                                Sign up
                            </Button>
                            {submitError ? (
                                <Box sx = {submitErrorStyle}>
                                    {submitErrorText}
                                </Box>                    
                            ) : ""}
                        </Stack>
                        
                    </>
                )}
                
                <Box
                    sx = {{
                        display: 'flex',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                >
                    <div 
                        style = {{marginTop: '-12px'}}
                        onClick = {() => {setSubmitError(false); setSubmitErrorText(''); setLogin(!login)}}
                    >
                        {login ? "Sign up" : "Login"}
                    </div>
                </Box>
            </Stack>
        </Paper>
    )
}

export default Login;