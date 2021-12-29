import React from 'react'
import './noteOne.css'
import check from '../../assets/check-mark (1).png';
import draw from '../../assets/icons8-draw-64.png';
import listed from '../../assets/icons8-image-24.png';
import { Input, Space, Button } from 'antd';
import "antd/dist/antd.css";

function NoteOne(props) {
    const takeclick =  () => {
        console.log(props)
        props.listentotakenote1(true)
    }

    return (
        <div>
            <div className="noteone" onClick={takeclick}>
            <Input style={{borderColor:'rgb(255 254 251)',width: 328}} placeholder="Take a note..."/>
                <div>
                    <img src={check} id="option2" alt="Image"/>
                    <img src={draw} id="option2" alt="Draw"/>
                    <img src={listed} id="option2" alt="List"/>
                </div>
            </div> 
        </div>
    )
}

export default NoteOne
