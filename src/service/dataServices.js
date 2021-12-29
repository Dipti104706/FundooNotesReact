import axios from 'axios'

let config = {
    headers:{
        Authorization:"Bearer" +" "+ localStorage.getItem("token")
    }
}
export const addNote = async(obj) =>{
    let response = await axios.post("https://localhost:44378/api/Note/addNote", obj, config)
    return response
}

export const getNotes = async() =>{
    let response = await axios.get(`https://localhost:44378/api/Note/getAllNotes?userId=${parseInt(localStorage.getItem("userID"))}`, config)
    return response
}

export const changeColor = async(obj) =>{
    let response = await axios.put(`https://localhost:44378/api/Note/changecolor?noteId=${obj.noteId}&color=${obj.color}`, null, config)
    return response
}

export const updateArchive = async(obj) =>{
    let response = await axios.put(`https://localhost:44378/api/Note/archive?notesId=${obj}`, null, config)
    return response
}

export const getArchieveNotes = async() =>{
    let response = await axios.get(`https://localhost:44378/api/Note/getArchieveNotes?userId=${parseInt(localStorage.getItem("userID"))}`, config)
    return response
}

export const UpdateNote = async (note) => {    
    return await axios.put(`https://localhost:44378/api/Note/editnote`, note, config)
}

export const TrashNote = async (obj) => {    
    return await axios.put(`https://localhost:44378/api/Note/Notetrashed?notesId=${obj}`, null, config)
}  

export const getTrashedNotes = async() =>{
    let response = await axios.get(`https://localhost:44378/api/Note/getTrashedNotes?userId=${parseInt(localStorage.getItem("userID"))}`, config)
    return response
}

export const notePin = async(obj) =>{
    let response = await axios.put(`https://localhost:44378/api/Note/pinnigNote?notesId=${obj}`, null, config)
    return response
}