import React from 'react'
import { Input, Space, Button } from 'antd';
import './signin.css'
import "antd/dist/antd.css";
import img from '../../assets/download.png';
import { login } from '../../service/userServices';
import { useHistory } from 'react-router';


function SignIn() {
    let history = useHistory();
    const emailRegex=/^[a-zA-Z0-9]+[._+-]{0,1}[a-zA-Z0-9]*@[a-zA-Z0-9]{1,10}.[a-zA-Z]{2,10}[.]*[a-zA-Z]*$/
    const psRegex=/^[a-zA-Z0-9]{1,}[A-Z]*[0-9]*[@&#%$*_-]*[a-zA-Z0-9]*$/

    const[loginError,setloginError]=React.useState({emailBorder:"",emailErrorMsg:"",psBorder:"",psErrorMsg:""})
    const[loginObj,setLoginObj]=React.useState({email:"",password:""})

    const takeEmail=(e) => {
        setLoginObj({...loginObj,email:e.target.value})
    }
    const takePassword=(e) => {
        setLoginObj({...loginObj,password:e.target.value})
    }

    const submit=() => {
        console.log(loginObj)
        if((emailRegex.test(loginObj.email)==true) && (psRegex.test(loginObj.password)==true)) {
            console.log(true)
            setloginError("")
            login(loginObj).then((resp) => {   //then used for resolve stage of promise, grom the login async send a promise 
                console.log(resp)
                localStorage.setItem("token",resp.data.token);  //setitem takes two parameter name of  data , second actuall data
                localStorage.setItem("userID",resp.data.data.userId);
                history.push('/dashboard');
            }).catch((err) => {           //catch used for reject stage
                console.log(err)
            })
        }  
        else if((emailRegex.test(loginObj.email)==false) && (psRegex.test(loginObj.password)==true)){
            setloginError({emailBorder:"1px solid red",emailErrorMsg:"Invalid email",psBorder:"",psErrorMsg:""})
        }
        else if((psRegex.test(loginObj.password)==false) && (emailRegex.test(loginObj.email)==true)){
            setloginError({emailBorder:"",emailErrorMsg:"",psBorder:"1px solid red",psErrorMsg:"Invalid password"})
        }        
        else {
            console.log(false)
            setloginError({emailBorder:"1px solid red",emailErrorMsg:"Invalid email",psBorder:"1px solid red",psErrorMsg:"Invalid password"})
        }       
    }

    // const submit=() => {
    //     console.log(loginObj)
    //     if(emailRegex.test(loginObj.email)) {
    //         console.log(true)
    //         setloginError("")
    //     }
    //     else {
    //         console.log(false)
    //         setloginError({emailBorder:"1px solid red",emailErrorMsg:"Invalid email"})
    //     }
    //     if(psRegex.test(loginObj.password)) {
    //         console.log(true)
    //         setloginError("")
    //     }
    //     else {
    //         console.log(false)
    //         setloginError({psBorder:"1px solid red",psErrorMsg:"Invalid email"})
    //     }
    //     if((emailRegex.test(loginObj.email)== true) && (psRegex.test(loginObj.password) == true)){
    //         login(loginObj).then((resp) => {   //then used for resolve stage of promise, grom the login async send a promise 
    //             console.log(resp)
    //             history.push('/dashboard');
    //         }).catch((err) => {           //catch used for reject stage
    //             console.log(err)
    //         })
    //     }
    //     else{
    //         setloginError({emailBorder:"1px solid red",emailErrorMsg:"Invalid email",psBorder:"1px solid red",psErrorMsg:"Invalid password"})
    //     }         
    // }

    return (
        <div className="signin">
            <img src={img} alt="" className="googlelogo"/>
            <h2 className = "sign">Sign in</h2>
            <p id ="account">Use your Google Account</p>  
            <div className = "email">
                <Input style={{border:loginError.emailBorder}} onChange={takeEmail} placeholder="Email or phone" />
                <p id="error">{loginError.emailErrorMsg}</p>               
                <Space direction="vertical">
                    <Input.Password style={{border:loginError.psBorder}} onChange={takePassword} placeholder="Password" />                   
                </Space>
                <p id="error">{loginError.psErrorMsg}</p>
                <Button style={{color:'#1a73e8'},{fontWeight:'bold'}} id="button" type="link">Forgot Password?</Button>
            </div> 
            <br/>
            <p id = "text2">Not your computer? Use Guest mode to sign in privately.</p>
            <Button id="button" style={{fontWeight:'bold'}} type="link">Learn more</Button> 
            <br/>
            <div className="button1">
                <Button style={{fontWeight:'bold'}} id="button" type="link" onClick={()=>(history.push('/signup'))}>Create account</Button>
                <Button onClick={submit} type="primary">Next</Button>
            </div>
        </div>
    )
}

export default SignIn
