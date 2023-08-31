import {useEffect, useState} from 'react';
import './Home.css';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../AxiosInstance';
import { useNavigate, Routes, Route } from 'react-router-dom';
import MatchingDetail from "../matchingDetail/MatchingDetail";
import Waitroom from '../waitroom/Waitroom';
import Matches from "../matches/Matches";
import MatchingCard from '../matchingCard/MatchingCard';
import Sidebar from '../Sidebar/Sidebar';
import Profile from '../profile/Profile';
import Chat from '../chat/Chat';

function Home() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bio, setBio] = useState({});

    const [displayMode, setDisplayMode] = useState(0); // 0 for matching, 1 for chat, 2 for waiting room

    const [recommendedUsers, setRecommendedUsers] = useState([]); // Recommended users

    const [lastIndex, setLastIndex] = useState(-1); // Keep track of which index the matching was on

    const resetRecommend = async () => { // Resets the recommended users when lastIndex hits the end of user array
        axios.get('/recommend', {params:{email:Cookies.get('email')}}) // Get recommended users from API
        .then(async (res) => {
            setRecommendedUsers(res.data);
            setLastIndex(0);
        })
    }


    useEffect(() => {

        const init = () => {
            axios.get(`/get-bio?email=${encodeURIComponent(Cookies.get('email'))}`)
            .then(async (res) => {
                setBio(res.data);
                setLoading(false);
            })
            .catch(() => {
                Cookies.remove('email');
                setBio({err: true});
                setLoading(false);
            })

            // Get recommended users for matching component
            axios.get('/recommend', {params:{email:Cookies.get('email')}}) // Get recommended users from API
            .then(async (res) => {
                setRecommendedUsers(res.data);
            })

            setLastIndex(0);

        };

        init();
        
    }, []);


    // if (!Cookies.get('email')) {
    //     return <Navigate to = "/"/>;
    // } else if (!loading) {
    //     if (bio.err) {
    //         return <Navigate to = "/"/>;
    //     }
    //     else if (bio.notCreated) {
    //         return <Navigate to = '/create-bio' state = {{internal: true}}/>;
    //     } 
    //     else {
            return (
                <div className = "homepage-container">

                    <Sidebar setDisplayMode={setDisplayMode}/>

                    <div className = "interface-wrapper">
                        <div className = "interface-inner-wrapper">
                            {/* { recommendedUsers.length>0 && displayMode === 0 && 
                                <Matching baseEmail={Cookies.get('email')} userArr={recommendedUsers} lastIndex = {lastIndex} setLastIndex = {setLastIndex} resetRecommend={resetRecommend}/>
                            }
                            {
                                displayMode === 1 && <Waitroom baseEmail={Cookies.get('email')}/>
                            }
                            {
                                displayMode === 2 && <MatchingCard baseEmail={Cookies.get('email')}></MatchingCard>
                            } */}
                            <Routes>
                                <Route path="/" element={<MatchingCard />} />
                                <Route path="/temp" element={<MatchingDetail baseEmail={Cookies.get('email')} userArr={recommendedUsers} lastIndex = {lastIndex} setLastIndex = {setLastIndex} resetRecommend={resetRecommend}/>} />

                                <Route path="/matchingDetail" element={<MatchingDetail />}/>

                                {/* <Route path="/chat" Chat component here />  */}
                                <Route path="/profile" element={<Profile />}/>
                                <Route path="/chat" element = {<Chat/>}/> 
                            </Routes>
                        </div>
                    </div>
                </div>
            )
    //     }
    // } else {
    //     return <>Loading...</>;
    // }
    
}

export default Home;