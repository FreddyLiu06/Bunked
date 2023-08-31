// import {useState } from 'react'
// import './Register.css'
// import axios from '../AxiosInstance';
// import Cookies from 'js-cookie';

// import { useNavigate } from 'react-router-dom';


// function Register({login, setLogin}) {

//     let [email, setEmail] = useState("");
//     let [name, setName] = useState("");
//     let [password, setPassword] = useState("");
//     let [confirmPW, setConfirmPW] = useState("");
//     let [emailError, setEmailError] = useState("");
//     let [nameError, setNameError] = useState("");
//     let [passwordError, setPasswordError] = useState("");
//     let [confirmPWError, setConfirmPWError] = useState("");
//     let [serverError, setServerError] = useState('');

//     const navigate = useNavigate();

//     const validEmailRegex = RegExp(
//         /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
//     );

//     const handleChange = (event) => {
//         event.preventDefault();
//         const {name, value} = event.target;
//         if (name === 'email') {
//             setEmail(value);
//             if (validEmailRegex.test(value)) {
//                 setEmailError('');
//             } else {
//                 setEmailError('Email is not valid!');
//             }
//         } else if (name === 'name') {
//             setName(value);
//             if (value.length === 0) {
//                 setNameError("Name can't be empty!");
//             } else {
//                 setNameError('');
//             }
//         } else if (name === 'password') {
//             setPassword(value);
//             if (value.length < 8) {
//                 setPasswordError("Password needs to have at least 8 characters");
//             } else {
//                 setPasswordError('');
//             }
//             if (value !== confirmPW) {
//                 setConfirmPWError("The password confirmation does not match.")
//             } else {
//                 setConfirmPWError("");
//             }
//         } else if (name === 'confirmPW') {
//             setConfirmPW(value);
//             if (value !== password) {
//                 setConfirmPWError("The password confirmation does not match.")
//             } else {
//                 setConfirmPWError("");
//             }
//         }
//     }

//     const handleRegister = async (event) => {
//         event.preventDefault();
//         if (emailError.length === 0 && nameError.length === 0
//             && passwordError.length === 0 && confirmPWError.length === 0
//             && email.length !== 0 && name.length !== 0
//             && password.length !== 0 && confirmPW.length !== 0) {
            
//             var params = {
//                 email,
//                 password,
//                 name,
//             }
//             axios.post('/register', params).then((res) => {
//                 Cookies.set('email', res.data.email, {expires: 3});
//                 navigate('/home');
//             }).catch((error) => {
//                 setServerError(error.response.data);
//             });
//         }
//     }

//     return (
//         <>
//             <form className = "login-register-form" onSubmit = {handleRegister}>
//                 <div className = "input-name">
//                     Email
//                 </div>
//                 <input
//                     className = {"login-register-input form-control "
//                         + (emailError.length > 0 ? "is-invalid":"")}
//                     id = "register-email-input"
//                     name = "email"
//                     type = "text"
//                     placeholder = "Enter your email address"
//                     onChange = {handleChange}
//                     value = {email}
//                 />
//                 {emailError.length > 0 &&
//                     <span className = 'input-error'>{emailError}</span>
//                 }

//                 <div className = "input-name" style = {{marginTop: '20px'}}>
//                     Name
//                 </div>
//                 <input
//                     className = {"login-register-input form-control "
//                         + (nameError.length > 0 ? "is-invalid":"")}
//                     id = "register-name-input"
//                     name = "name"
//                     type = "text"
//                     placeholder = "Enter your first and last name"
//                     onChange = {handleChange}
//                     value = {name}
//                 />
//                 {nameError.length > 0 &&
//                     <span className = 'input-error'>{nameError}</span>
//                 }

//                 <div className = "input-name" style = {{marginTop: '20px'}}>
//                     Password
//                 </div>
//                 <input
//                     className = {"login-register-input form-control "
//                         + (passwordError.length > 0 ? "is-invalid":"")}
//                     id = "register-password-input"
//                     name = "password"
//                     type = "password"
//                     placeholder = "Enter your password"
//                     onChange = {handleChange}
//                     value = {password}
//                 />
//                 {passwordError.length > 0 &&
//                     <span className = 'input-error'>{passwordError}</span>
//                 }

//                 <div className = "input-name" style = {{marginTop: '20px'}}>
//                     Confirm Password
//                 </div>
//                 <input
//                     className = {"login-register-input form-control "
//                         + (confirmPWError.length > 0 ? "is-invalid":"")}
//                     id = "register-confirm-password-input"
//                     name = "confirmPW"
//                     type = "password"
//                     placeholder = "Confirm your password"
//                     onChange = {handleChange}
//                     value = {confirmPW}
//                 />
//                 {confirmPWError.length > 0 &&
//                     <span className = 'input-error'>{confirmPWError}</span>
//                 }

//                 {serverError.length > 0 && 
//                     <div className = 'server-error-box'>{serverError}</div>
//                 }

//                 <button type="submit" className="submit-button btn btn-primary">Register</button>

//             </form>
            
//             <div className = "toggle-btn-wrapper">
//                 <div className = "toggle-btn" onClick = {() => setLogin(!login)}>Login</div>
//             </div>

//         </>
//     )
// }

// export default Register