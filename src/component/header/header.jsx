import React from 'react'
import './header.css'
import menuBotton from '../../assets/icons8-menu.svg';
import keep from '../../assets/icons8-google-keep.svg';
import search from '../../assets/icons8-search.svg';
import refresh from '../../assets/icons8-refresh.svg';
import list from '../../assets/icons8-view-headline-24.png';
import setting from '../../assets/icons8-settings.svg';
import moreApps from '../../assets/moreapps.svg';
import profile from '../../assets/Ellipse -1.png';
import { Input, Space, Button } from 'antd';
import "antd/dist/antd.css";
import { useHistory } from 'react-router';

function NoteHeader(props) {  

    const[menu,setMenu]=React.useState(false);   
    // const  MenuContent= () => {
    //     if(props.navBar==false)
    //     {
    //         props.listenToHeader(true)
    //     }
    //     else{
    //         props.listenToHeader(false)
    //     }        
    // }
    let history = useHistory();
    const logout = () => {
        localStorage.clear();
        history.push("/")
    }

    const MenuContent= () => {
        setMenu(!menu);
        props.listenToHeader(menu)      
    }
    return (
        <div>
            <div className="headerContent">        
                <div className="logoContent">
                    <img src={menuBotton} onClick={MenuContent} alt="logo"  id="menu"/>
                    <img src={keep} alt="Logo" width="40" />
                    <span className="Text">Keep</span>
                </div>
                <div className="Search">
                    <img className="Search-logo" src={search} alt="search"/>
                    <Input className="Search-Text" style={{background:'rgb(233, 231, 222)',borderColor:'rgb(233, 231, 222)'}} placeholder="Search"/>           
                </div>
                <div className="frame1">
                    <img src={refresh} id="option1" alt="refresh"/> 
                    <img src={list} id="option1" alt="List view"/>
                    <img src={setting}  id="option1" alt="settings"/> 
                </div>
                <div className="frame2">
                    <img src={moreApps}  id="option1" alt="apps"/> 
                    <img src={profile} onClick={logout} id="option1" alt="profile"/> 
                </div>
            </div>
        </div>
    )
}

export default NoteHeader
