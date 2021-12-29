import React from 'react'
import './noteTwo.css'
import pin from '../../assets/Pinned.png';
import reminder from '../../assets/reminder.png';
import collab from '../../assets/icons8-people-24.png';
import gallary from '../../assets/icons8-image-24.png';
import archieve from '../../assets/Archieve.png';
import dot from '../../assets/dots.png';
import undo from '../../assets/undo.png';
import redo from '../../assets/redo.png';
import { Input, Space, Button } from 'antd';
import "antd/dist/antd.css";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { addNote } from '../../service/dataServices';
import ColorPopper from '../colorPopper/colorPopper';



function NoteTwo(props) {
    let noteUserId=parseInt(localStorage.getItem("userID"));
    const[noteObj , setNoteObj]= React.useState({userId:noteUserId,
        title:"", yourNotes:"", archive:false,color:""})

    const takeTitle= (e) => {
        setNoteObj({...noteObj, title:e.target.value})
    }
    const takeDescription= (e) =>{
        setNoteObj({...noteObj, yourNotes:e.target.value})
    }

    const setArchive = () => {
        setNoteObj({...noteObj,archive: !noteObj.archive})   
        console.log(noteObj.archive)    
    }

    const setColor = (data) => {
        setNoteObj({...noteObj,color: data})
    }

    const submit= () => {
        console.log(noteObj.userId)
        addNote(noteObj).then((resp) => {           
            console.log(resp)
            props.listentotakenote1(false)
        }).catch((err) => {
            console.log(err)
        })       
    }
    const handleClickAway = () =>{
        props.listentotakenote1(false)
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <div className="noteTwo" style={{backgroundColor:noteObj.color}}>
                    <div className="title">
                    <Input onChange={takeTitle} style={{borderColor: 'transparent',width: 328,backgroundColor:'transparent'}} placeholder="Title"/>
                        <img src={pin} id="item1" alt="pin"/>                              
                    </div>
                    <Input onChange={takeDescription} style={{borderColor: 'transparent',width: 328,backgroundColor:'transparent'}} placeholder="Take a note..."/> 
                    <div className="Options">
                        <div className="Part1">
                            <img src={reminder} id="pictures" alt="reminder"/> 
                            <img src={collab} id="pictures" alt="collab"/>
                            <ColorPopper action="create" setColor={setColor}/>
                            <img src={gallary}  id="pictures" alt="gallary"/> 
                            <img src={archieve} onClick={setArchive} style={{height:15}} id="pictures" alt="archieve"/> 
                            <img src={dot}  id="pictures" alt="more"/>
                            <img src={undo}  id="pictures" alt="undo"/> 
                            <img src={redo} style={{width:14,height:14}} alt="Redo"/>   
                        </div>
                        <div className="Part2">
                        <Button onClick={submit} style={{color:'black'}} id="button1" type="link">Close</Button>
                        </div>           
                    </div>        
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default NoteTwo
 
