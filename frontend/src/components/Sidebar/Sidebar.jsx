import React from 'react'
import Cookies from 'js-cookie'
import logo from "../../NewLogo.png"
import './Sidebar.css'
import axios from '../AxiosInstance'
import { useNavigate } from 'react-router-dom'

import {Home, Chat, Person, Settings} from '@mui/icons-material'
import { Button } from '@mui/material'

const Sidebar = () => {

    const siderbarData = [
        {
            title: "Home",
            icon: <Home />,
            navigateLink: ""
        },
        {
            title: "Chat",
            icon: <Chat />,
            navigateLink: "chat"
        },
        {
            title: "Profile",
            icon: <Person />,
            navigateLink: "profile"
        },
        {
            title: "Settings",
            icon: <Settings />
        },
    ]

    const logout = async () => {
        axios.delete('/logout').then(() => {
            Cookies.remove('email');
            navigate('/');
        });
    }

    const navigate = useNavigate();

    return (
        <div className="Sidebar">
            {/* Replace with higher quality image */}
            <div className="logo">
                <img src = {logo} />
            </div>
            
            <div>User: {` ${Cookies.get('email')}`}</div>
            <ul className="SidebarList">
                {siderbarData.map((val, key) => {
                    return (
                        <li className="SidebarItem" key={key} onClick={() => {navigate(`/home/${val.navigateLink}`)}}>
                            <div className='icon'>{val.icon}</div>
                            <div className='title'>{val.title}</div>
                        </li>
                    )
                })}
            </ul>

            <button className="temp" onClick= {() => {navigate('/home/temp')}}>temp</button>

            <div className="logoutButton">
                <Button variant="text" onClick={logout} color="error">Log out</Button>
            </div>

            {/* <Matches baseEmail={Cookies.get('email')}/> */}
        </div>
    )

}

export default Sidebar