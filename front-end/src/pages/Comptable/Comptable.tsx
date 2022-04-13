import React,{useState,useEffect, useContext} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowModal from '../../Components/ShowModal';
import { useNavigate } from 'react-router';
import {Table,Button} from 'react-bootstrap';
import { AuthContext } from '../../Context/AuthContext';
import Header from '../../Components/Header'


const socket = io('http://localhost:3001')

const Comptable = () => {
const [user,setUser] = useState([])
const [playOnce,setPlayOnce] = useState(true)
const [reload,setReload] = useState(false)
const  {currentUser,setShow,info,setInfo,show} = useContext(AuthContext)
const navigate = useNavigate()


useEffect(()=>{
    if(playOnce || reload){
        axios.get('http://localhost:8080/api/users/').
        then((res)=> {
            console.log(res.data)
            setUser(res.data)
        })
    }
    setPlayOnce(false)
},[playOnce,reload])

useEffect(()=>{
    if(currentUser=== null){
        navigate('/')
    }
     if(currentUser === 'admin'){
          navigate('/private/admin')
    }
  
    if(currentUser === 'employee'){
     navigate('/private/employee')
    }
  
  },[currentUser])


  function sayHello(user_id:number){
    axios.get(`http://localhost:8080/api/users/${user_id}`).
    then((res)=>{
          res.data.hour? setInfo(res.data.hour):setInfo(0)
          setShow(true)
    })
 }


 socket.on('reload',()=>{
     setReload((v)=> !v)
 })


    return (
        <div className='admin'>
            <Header/>
            <ShowModal show={show} onClose={()=>setShow(false)} 
            title="my modal">
                   <span>cet employé à fait {info} heures ce mois</span> 
            </ ShowModal>
            <Table 
            striped bordered hover 
            className='table-admin'>
                <thead>
                    <tr>
                    <th>name</th>
                    <th>First name</th>
                    <th>Date début</th>
                    <th>Date fin</th>
                    <th>heures de travail cumulées ce mois</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((el:any,index)=>
                            <tr key={index}>
                                <td>{el.name}</td>
                                <td>{el.firstname}</td>
                                <td>{el.date_debut}</td>
                                <td>{el.date_fin}</td>
                                <td><Button  onClick={()=>sayHello(el.id)}>Show</Button></td>
                            </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default Comptable;