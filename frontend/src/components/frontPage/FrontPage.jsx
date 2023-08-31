import Cookies from 'js-cookie'
import './FrontPage.css';
import bunkedLogo from '../../BunkedLogo.png';
import Login from './Login';
import { Navigate } from 'react-router-dom';
import {Grid} from '@mui/material';


const outerGridStyle =  {
    height: '100vh',
    width: '100vw',
}
const innerGridStyle = {
    alignItems : 'center',
    justifyContent : 'center',
    height: '100vh',
}

// const loginPanelStyle = {
//     // height: '430px',
//     width: '363px',
//     padding: '30px 35px 30px 35px',
// }
// const loginTitleStyle = {
//     fontSize: '33px',
//     lineHeight: 1.2,
//     alightItems: 'center',
//     fontWeight: 'bold',
//     color: 'primary.main',
// }

// const textBoxStyle = {
//     '& input': {
//         padding: '12px 10px',
//     },
//     '& fieldset': {
//         borderColor: 'rgba(0, 0, 0, 0.05)',
//     },
//     '& label': {
//         top: '-4px',
//     },
//     '.MuiInputLabel-shrink': {
//         top: '0px',
//         left: '1px',
//     },
//     '& .MuiOutlinedInput-root': {
//         '&:hover:not(.Mui-focused) fieldset': {
//             borderColor: 'rgba(0, 0, 0, 0.2)',
//         },
//     },
//     backgroundColor: '#D9D9D91A',
// }

// const buttonStyle = {
//     color: 'white',
//     textTransform: 'none',
//     fontSize: '22px',
//     borderRadius: '6px',
//     boxShadow: 'none',
//     height: '47px',
//     '&:hover': {
//         backgroundColor: 'rgba(0, 178, 183, 1)',
//     },
//     '&:active': {
//         backgroundColor: 'rgba(0, 178, 183, 0.8)',
//     }
// }

function FrontPage() {


    if (Cookies.get('email')) {
        return <Navigate to = "/home"/>;
    } else {
        return (
            // <div className = "front-page-wrapper">
            //     <div className = "front-page-left">
            //     <img src={bunkedLogo} className="bunked-logo" alt = "Send"/>
            //     </div>
            //     <div className = "front-page-right">
            //         <div className = "login-box-strip">
            //             <div className = "login-box-margin-top"/>
    
            //             <Login/>
    
            //             <div className = "login-box-margin-bottom" />
            //         </div>
                    
            //     </div>
            // </div>

            <>
                <Grid container sx={outerGridStyle}>
                    <Grid item xs={12} md={6}>
                        <Grid container sx={innerGridStyle}>
                            <img 
                                src={bunkedLogo} 
                                alt = "Bunked"
                                style={{
                                    marginTop: '-20px',
                                    maxWidth: '478px' 
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container sx={innerGridStyle}>
                            <Login/>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}



export default FrontPage;

