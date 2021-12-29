import React from 'react'
import pin from '../../assets/Pinned.png';
import reminder from '../../assets/reminder.png';
import collab from '../../assets/icons8-people-24.png';
import paint from '../../assets/paint-board-and-brush.png';
import gallary from '../../assets/icons8-image-24.png';
import archieve from '../../assets/Archieve.png';
import dot from '../../assets/dots.png';
import ColorPopper from '../colorPopper/colorPopper';
import './noteThree.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { updateArchive, UpdateNote,TrashNote,notePin } from '../../service/dataServices';
import undo from '../../assets/undo.png';
import redo from '../../assets/redo.png';
import { Input, Space, Button } from 'antd';
import Tooltip from '@mui/material/Tooltip';
import { borderRadius } from '@mui/system';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper'
  };

function NoteThree(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title,setTittle]=React.useState(props.allNotes.title);
  const [description,setDescription]=React.useState(props.allNotes.yourNotes);

    const takeDescription =(e) => {
        setDescription(e.target.value)
    }

    const takeTitle =(e) => {
        setTittle(e.target.value)
    }
    const getUpdateColor = (data) =>{
        if(data == true){
            props.getColorUpdate(true)
        }
    }

    const setArchive = () => {
        let noteId=props.allNotes.noteId
        updateArchive(noteId).then((resp) => {
            console.log(resp)
            props.listenToArchieve(true)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    const notePinned = () => {
        let noteId=props.allNotes.noteId
        notePin(noteId).then((resp) => {
            console.log(resp)
        }).catch((err) => {
            console.log(err)
        })
    }

    const trashNote = () => {
        TrashNote(props.allNotes.noteId).then((resp) => {
            console.log(resp)
            props.listenToTrash(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    const update =()=>{
        let obj={noteId:props.allNotes.noteId,
            title: title,
            yourNotes:description}
            UpdateNote(obj).then((res) => {
            console.log(res)
            handleClose();
            props.listenToUpdate(true);
        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <div>
            <div className="noteThree" style={{backgroundColor:props.allNotes.color}}>
                <div className="title1" > 
                    <div id="inputTitle" onClick={handleOpen}> {props.allNotes.title} </div>
                    <Tooltip title="Pin" placement="top"><img src={pin} onClick={notePinned} className="noteImage" style={{height:20,width:20}} alt="pin"/></Tooltip>                                
                </div>
                <div className="description" onClick={handleOpen}>
                    <div id="inputText">{props.allNotes.yourNotes}</div>
                </div>
                <div className="noteImage">
                    <Tooltip title="Reminder" placement="bottom"><img src={reminder} id="option3" alt=""/></Tooltip>
                    <Tooltip title="Collaborator" placement="bottom"><img src={collab} id="option3" alt=""/></Tooltip>
                    <ColorPopper id="option3" action="update" getUpdateColor={getUpdateColor} noteID={props.allNotes.noteId}/>
                    <Tooltip title="Image" placement="bottom"><img src={gallary} id="option3" alt=""/></Tooltip>
                    <Tooltip title="Archieve" placement="bottom"><img src={archieve} onClick={setArchive} style={{height:11}} id="option3" alt=""/></Tooltip>
                    <Tooltip title="Delete" placement="bottom"><img src={dot} onClick={trashNote} id="option3" alt=""/></Tooltip>
                </div>              
            </div>   
                <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
           >
            <Box sx={style}>
                    <div className="modelNoteThree" style={{backgroundColor:props.allNotes.color}}>
                        <div className="title">
                        <Input defaultValue={props.allNotes.title} onChange={takeTitle} style={{borderColor: 'transparent',width: 328,backgroundColor:'transparent'}} placeholder="Title"/>
                            <img src={pin} id="item1" alt="pin"/>                              
                        </div>
                        <Input defaultValue={props.allNotes.yourNotes}  onChange={takeDescription} style={{borderColor: 'transparent',width: 328,backgroundColor:'transparent'}} placeholder="Take a note..."/> 
                        <div className="Options">
                            <div className="Part1">
                                <img src={reminder} id="pictures" alt="reminder"/> 
                                <img src={collab} id="pictures" alt="collab"/>
                                <ColorPopper action="create" getUpdateColor={getUpdateColor} />
                                <img src={gallary}  id="pictures" alt="gallary"/> 
                                <img src={archieve}  style={{height:15}} onClick={setArchive} id="pictures" alt="archieve"/> 
                                <img src={dot}  id="pictures" alt="more"/>
                                <img src={undo}  id="pictures" alt="undo"/> 
                                <img src={redo} style={{width:14,height:14}} alt="Redo"/>   
                            </div>
                            <div className="Part2">
                            <Button  style={{color:'black'}} onClick={update} id="button1" type="link">Close</Button>
                            </div>           
                        </div>        
                    </div>
                </Box>
            </Modal>         
        </div>
    )
}

export default NoteThree
