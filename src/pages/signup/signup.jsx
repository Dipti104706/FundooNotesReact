import React from 'react'
import { Input , Button, Checkbox} from 'antd';
import './signup.css'
import "antd/dist/antd.css";
import logo from '../../assets/download.png';
import logo1 from '../../assets/Logo2.jpg';
import { signup } from '../../service/userServices';
import { useHistory } from 'react-router';

function Signup() {
    let history=useHistory()
    const firstNameRegex=/^[A-Z]{1}[a-z]{2,}$/
    const lastNameRegex=/^[A-Z]{1}[a-z]{2,}$/
    const emailSignUpRegex=/^[a-zA-Z0-9]+[._+-]{0,1}[a-zA-Z0-9]*@[a-zA-Z0-9]{1,10}.[a-zA-Z]{2,10}[.]*[a-zA-Z]*$/
    const psSignUpRegex=/^[a-zA-Z0-9]{1,}[A-Z]*[0-9]*[@&#%$*_-]+[a-zA-Z0-9]*$/

    const[signUpError,setSignUpError]=React.useState({firstBorder:"",firstErrorMsg:"",lastBorder:"",lastErrorMsg:"",emailSignUpBorder:"",emailSignUpErrorMsg:"",psSignUpBorder:"",psSignUpErrorMsg:"",confirmPsBorder:"",confirmPsErrorMsg:""})
    const[signUpObj,setSignUpObj]=React.useState({firstNameSign:"",lastNameSign:"",emailSign:"",passwordSign:"",confirmPsSign:""})
    
    const takeFirstName=(e) => {
        setSignUpObj({...signUpObj,firstNameSign:e.target.value})
    }
    
    const takeLastName=(e) => {
        setSignUpObj({...signUpObj,lastNameSign:e.target.value})
    }

    const takeEmailSignUp=(e) => {
        setSignUpObj({...signUpObj,emailSign:e.target.value})
    }

    const takeSignUpPassword=(e) => {
        setSignUpObj({...signUpObj,passwordSign:e.target.value})
    }

    const takeConfirmPassword=(e) => {
        setSignUpObj({...signUpObj,confirmPsSign:e.target.value})
    }
    
    const register=() => {
        console.log(signUpObj)
        if(signUpObj.passwordSign==signUpObj.confirmPsSign){
            if((firstNameRegex.test(signUpObj.firstNameSign)==true) && (lastNameRegex.test(signUpObj.lastNameSign)==true) && (emailSignUpRegex.test(signUpObj.emailSign)==true) && (psSignUpRegex.test(signUpObj.passwordSign)==true)) {
                console.log(true)
                setSignUpError("")
                const signUpDb={firstName:signUpObj.firstNameSign,lastName:signUpObj.lastNameSign,email:signUpObj.emailSign,password:signUpObj.passwordSign};
                signup(signUpDb).then((resp) => {   //then used for resolve stage of promise, grom the login async send a promise 
                    console.log(resp)
                    history.push('/')
                }).catch((err) => {           //catch used for reject stage
                    console.log(err)
                })
            }     
            else if((firstNameRegex.test(signUpObj.firstNameSign)==false) &&  (lastNameRegex.test(signUpObj.lastNameSign)==true) && (emailSignUpRegex.test(signUpObj.emailSign)==true) && (psSignUpRegex.test(signUpObj.passwordSign)==true)){
                console.log(false)
                setSignUpError({firstBorder:"1px solid red",firstErrorMsg:"Invalid firstname"})
            }
            else if((lastNameRegex.test(signUpObj.lastNameSign)==false) && (firstNameRegex.test(signUpObj.firstNameSign)==true) && (emailSignUpRegex.test(signUpObj.emailSign)==true) && (psSignUpRegex.test(signUpObj.passwordSign)==true)){
                console.log(false)
                setSignUpError({lastBorder:"1px solid red",lastErrorMsg:"Invalid lastname"})
            }
            else if((emailSignUpRegex.test(signUpObj.emailSign)==false && (firstNameRegex.test(signUpObj.firstNameSign)==true) && (lastNameRegex.test(signUpObj.lastNameSign)==true) && (psSignUpRegex.test(signUpObj.passwordSign)==true))){
                console.log(false)
                setSignUpError({emailSignUpBorder:"1px solid red",emailSignUpErrorMsg:"Invalid email"})
            }
            else if((psSignUpRegex.test(signUpObj.passwordSign)==false) && (firstNameRegex.test(signUpObj.firstNameSign)==true) && (lastNameRegex.test(signUpObj.lastNameSign)==true) && (emailSignUpRegex.test(signUpObj.emailSign)==true)){
                console.log(false)
                setSignUpError({psSignUpBorder:"1px solid red",psSignUpErrorMsg:"Invalid password"})
            }
            else{
                console.log(false)
                setSignUpError({firstBorder:"1px solid red",firstErrorMsg:"Invalid firstname",lastBorder:"1px solid red",lastErrorMsg:"Invalid lastname",emailSignUpBorder:"1px solid red",emailSignUpErrorMsg:"Invalid email",psSignUpBorder:"1px solid red",psSignUpErrorMsg:"Invalid password",confirmPsBorder:"1px solid red",confirmPsErrorMsg:""})
            }
        }
        else{
            setSignUpError({confirmPsBorder:"1px solid red",confirmPsErrorMsg:"Password should be same with confirm password"})
        } 
    }
    // const register=() => {
    //     console.log(signUpObj)
    //     if(signUpObj.passwordSign==signUpObj.confirmPsSign){
    //         if(firstNameRegex.test(signUpObj.firstNameSign)) {
    //             console.log(true)
    //             setSignUpError("")
    //         }
    //         else {
    //             console.log(false)
    //             setSignUpError({firstBorder:"1px solid red",firstErrorMsg:"Invalid firstname"})
    //         }
    //         if(lastNameRegex.test(signUpObj.lastNameSign)) {
    //             console.log(true)
    //             setSignUpError("")
    //         }
    //         else {
    //             console.log(false)
    //             setSignUpError({lastBorder:"1px solid red",lastErrorMsg:"Invalid lastname"})
    //         }
    //         if(emailSignUpRegex.test(signUpObj.emailSign)) {
    //             console.log(true)
    //             setSignUpError("")
    //         }
    //         else {
    //             console.log(false)
    //             setSignUpError({emailSignUpBorder:"1px solid red",emailSignUpErrorMsg:"Invalid email"})
    //         }
    //         if(psSignUpRegex.test(signUpObj.passwordSign)) {
    //             console.log(true)
    //             setSignUpError("")
    //         }
    //         else {
    //             console.log(false)
    //             setSignUpError({psSignUpBorder:"1px solid red",psSignUpErrorMsg:"Invalid password"})
    //         }

    //         if((firstNameRegex.test(signUpObj.firstNameSign)==true) && (lastNameRegex.test(signUpObj.lastNameSign)==true) && (emailSignUpRegex.test(signUpObj.emailSign)==true) && (psSignUpRegex.test(signUpObj.passwordSign)==true)){
    //             const signUpDb={firstName:signUpObj.firstNameSign,lastName:signUpObj.lastNameSign,email:signUpObj.emailSign,password:signUpObj.passwordSign};
    //             signup(signUpDb).then((resp) => {   //then used for resolve stage of promise, grom the login async send a promise 
    //                 console.log(resp)
    //                 history.push('/')
    //             }).catch((err) => {           //catch used for reject stage
    //                 console.log(err)
    //             })
    //         }     
    //         else {
    //             console.log(false)
    //             setSignUpError({firstBorder:"1px solid red",firstErrorMsg:"Invalid firstname",lastBorder:"1px solid red",lastErrorMsg:"Invalid lastname",emailSignUpBorder:"1px solid red",emailSignUpErrorMsg:"Invalid email",psSignUpBorder:"1px solid red",psSignUpErrorMsg:"Invalid password",confirmPsBorder:"1px solid red",confirmPsErrorMsg:""})
    //         }
    //     }
    //     else{
    //             setSignUpError({confirmPsBorder:"1px solid red",confirmPsErrorMsg:"Password should be same with confirm password"})
    //     }               
    // }
    
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }
    
    return (
        <div className="Register">
            <div className="form">
                <div className="part1">
                    <div>
                        <img src = {logo} alt = "" className = "logo"></img>
                        <h3>Create your Google Account</h3>
                        <br/>
                    </div>
                    <div className = "name">
                        <Input style={{border:signUpError.firstBorder,width:155}} onChange={takeFirstName} placeholder="First name" />
                        <p id="error1">{signUpError.firstErrorMsg}</p>
                        <Input style={{border:signUpError.lastBorder,width:155}} onChange={takeLastName}  placeholder="Last name" />
                        <p id="error1">{signUpError.lastErrorMsg}</p>
                    </div>
                    <div className="user">
                        <Input style={{border:signUpError.emailSignUpBorder,width:325}} onChange={takeEmailSignUp} placeholder="User name" />   
                        <p id="error1">{signUpError.emailSignUpErrorMsg}</p>
                        <p id="text3">You can use letters, numbers, periods</p>                 
                    </div>
                    <div>
                    <Button id="location" style={{color:'#1a73e8'},{fontWeight:'bold'}} type="link">Use my current email address instead</Button> 
                    </div>
                    <br/>
                    <div className = "name">
                        <Input style={{border:signUpError.psSignUpBorder,width:151}} onChange={takeSignUpPassword} placeholder="Password" />
                        <p id="error1">{signUpError.psSignUpErrorMsg}</p>
                        <Input style={{border:signUpError.confirmPsBorder,width:155}} onChange={takeConfirmPassword} placeholder="Confirm" />
                    </div>
                    <p id="error1">{signUpError.confirmPsErrorMsg}</p>
                    <p id="text4">Use 8 or more characters with a mix of letters, numbers and symbols</p>
                    <Checkbox onChange={onChange}>Show Password</Checkbox>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="Button2">
                        <Button style={{color:'#1497c9'},{fontWeight:'bold'}} id="button" type="link" onClick={()=>(history.push('/'))}>Sign in instead</Button>
                        <Button onClick={register} type="primary">Next</Button>
                    </div>
                </div>
                <div className="part2">
                    <img src = {logo1} alt = "logo2" style={{width:206},{height:253}}></img>
                    <p id="text5">One account. All of Google</p>
                    <p id="text5"> working for you.</p>
                </div>
            </div>
        </div>
    )
}

export default Signup
