import React from 'react'
import NoteHeader from '../../component/header/header'
import MiniDrawer from '../../component/navbar/navBar'
import NoteOne from '../../component/noteOne/noteOne'
import NoteThree from '../../component/noteThree/noteThree'
import NoteTwo from '../../component/noteTwo/noteTwo'
import { getArchieveNotes, getNotes, getTrashedNotes } from '../../service/dataServices'
import './dashboard.css'


function Dashboard() {
    const[switchNotesContainers, setSwitchNotesContainers]= React.useState(false)

    const[noteArray, setNoteArray] = React.useState([])

    const[openNav, setOpenNav] = React.useState(false)


    const GetNotes =() => {
            getNotes().then((resp) => {
            console.log(resp.data.data)  
            setNoteArray(resp.data.data)    
        }).catch((err) => {
            console.log(err)
        })
    }

    const GetArchieves =() => {
            getArchieveNotes().then((resp) => {
            console.log(resp.data.data)  
            setNoteArray(resp.data.data)    
        }).catch((err) => {
            console.log(err)
        })
    }

    const GetTrashNotes =() => {    
            getTrashedNotes().then((resp) => {
            console.log(resp.data.data)  
            setNoteArray(resp.data.data)    
        }).catch((err) => {
            console.log(err)
        })
    }
    
    React.useEffect(() =>{
        GetNotes();
        },[switchNotesContainers])

    const listentotakenote1 = (data) => {
        console.log(data)
        if (data === true){
            setSwitchNotesContainers(true)
        }
        else{
            setSwitchNotesContainers(false)
        }
    } 

    const getResponse  = (data) =>{
        if(data==="Notes"){
            GetNotes();
        }    
        else if(data==="ArchieveNotes"){
            GetArchieves();
        }  
        else{
            GetTrashNotes();
        } 
     }

    const listenToArchieve = (data) => {
        console.log(data)
        if (data === true){
            GetNotes();
        }
    } 

    const listenToTrash = (data) => {
        console.log(data)
        if (data === true){
            GetNotes();
        }
    } 

    const listenToUpdate = (data) => {
        console.log(data)
        if (data === true){
            GetNotes();
        }
    }

    const getColorUpdate  = (data) =>{
        if(data==true){
            GetNotes();
        }         
     }

    const listenToHeader  = (data) =>{
        if(data==true){
            setOpenNav(true)
        } 
        else
        {
            setOpenNav(false)
        }
     }
     

    const noteList=noteArray.map((x)=>(<NoteThree key={x.noteId} allNotes={x} getColorUpdate={getColorUpdate} listenToArchieve={listenToArchieve} listenToUpdate={listenToUpdate} listenToTrash={listenToTrash}/>))
    return (
        <div>
            <NoteHeader listenToHeader = {listenToHeader}/>
            <div className="takeNotesContainer" >
                {
                    switchNotesContainers ? <NoteTwo listentotakenote1={listentotakenote1} /> :<NoteOne  listentotakenote1={listentotakenote1}/>
                }
            </div>
            <MiniDrawer openNav = {openNav} getResponse={getResponse}/>     
            <div className="mainNotesContainer" >
                {noteList} 
            </div>
        </div>
    )
}

export default Dashboard
