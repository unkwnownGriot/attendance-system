import React, { useState,useContext,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../Context/AuthContext';
import {Button} from 'react-bootstrap'
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [email,setEmail]= useState('')
    const [password,setPassword] = useState('')
    const {signIn,currentUser,validation} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!currentUser){
            navigate('/')
        }
         if(currentUser === "admin"){
              navigate('/private-admin/admin')
        }
         if(currentUser === "user"){
              navigate('/private/employee')
        }
    
        if(currentUser === "comptable"){
         navigate('/private-comptable/comptable')
        }
    
    },[currentUser])


    
    function onPasswordChange(e:any){
        setPassword(e.target.value)
    }
    function onMailChange(e:any){
        setEmail(e.target.value)
    }

   

    function onFormSubmit(){
            signIn(email,password)
    }

    return (
        <div className='login'>
            <form id='login'>
                <h1>Se connecter</h1>
                <div className='inputs'>
                    <label htmlFor="mail">Entrez votre adresse mail</label>
                    <input type='text' id="mail" placeholder='Email'
                    value={email}
                    onChange={onMailChange}/>
                </div>
                <div className='inputs'>
                    <label htmlFor="password">Entrez votre mot de passe</label>
                    <input type="password" id='password'placeholder='Password' 
                    value={password}
                    onChange={onPasswordChange} />
                </div>
                <div>
                    <Button onClick={onFormSubmit} >Se connecter</Button>
                </div>
                <p>{validation}</p>
            </form>
        </div>
    );
};

export default Login;