import React, {useContext,useEffect} from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import io from 'socket.io-client';
import { AuthContext } from '../../Context/AuthContext';
import Header from '../../Components/Header';


const socket = io('http://localhost:3001')

const Employee = () => {

  const token = JSON.parse(localStorage.getItem('token')||'{}')
  console.log(token)
const {currentUser,signOut} = useContext(AuthContext)
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




  function onWorkStart(){
    socket.emit('job-start',token.userId)
    signOut()
  }

  function onJobStop(){
    socket.emit('job-stop',token.userId)
    signOut()
  }


    return (
        <div className='user' style={{"backgroundColor":" #ecf0f1","minHeight":"100vh"}}>
            <Header />
            <div className='work-office'>
              <div className="btn">
                 {token.onWork === 0 && <Button variant='success'
                  onClick={onWorkStart}>start work</Button> }<br /> <br />
              </div>

              <div className="btn">
               {token.onWork !== 0 && <Button variant='danger'
                onClick={onJobStop}>Stop work</Button>}<br /> <br />
              </div>
            </div>
      </div>
    );
};

export default Employee;