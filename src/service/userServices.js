import axios from 'axios'

export const login=async(obj) => {
    let response=await axios.post("https://localhost:44378/api/User/Login",obj)
    return response
}

export const signup=async(obj) => {
    let response=await axios.post("https://localhost:44378/api/User/register",obj)
    return response
}