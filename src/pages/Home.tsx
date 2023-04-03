import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import home_cream from '../assets/home_cream.jpg';
import home_logo from '../assets/home_logo.png';
import { designSystem } from "../assets/designSystem";
const Home = () => {
    const navigate = useNavigate();
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <img src={home_cream} style={{width:'100%',  zIndex: '-1', maxHeight: '100vh'}} alt="" />
            <img src={home_logo} style={{width: '13%',left: 'calc(50vw - 6.5%)', top: 'calc(50vh - 6.5%)' }}/>
            <div style={{display: 'flex', gap:'100px', marginTop: '3rem' }}>
               <div style={{width: '19rem', height: '17rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: designSystem.colors.lightgrey}} 
               onClick={() => navigate('/concept')} >컨셉 추천</div>
               <div style={{width: '19rem', height: '17rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: designSystem.colors.lightgrey}}
               onClick={() => navigate('/site')} >지역 추천</div>
            </div>
        </div>
    )
}
export default Home;

{/*
            <div>
                <img src={home_cream} style={{width:'100%', position: 'fixed', zIndex: '-1', maxHeight: '100vh'}} alt="" />
            </div>
            <img src={home_logo} style={{width: '13%', position: 'fixed',left: 'calc(50vw - 6.5%)', top: 'calc(50vh - 6.5%)' }}/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', bottom: '0', width: '100%'}}> 
            <div>
               <button onClick={() => navigate('/concept')} >컨셉 추천</button>
               <button onClick={() => navigate('/site')} >지역 추천</button>
            </div>
        </div>
*/}