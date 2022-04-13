import React,{useState,useEffect, useContext} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import  {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowModal from '../../Components/ShowModal';
import {Table,Button} from 'react-bootstrap';
import Header from '../../Components/Header'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';

const socket = io('http://localhost:3001')

const Admin = () => {
const [user,setUser] = useState([])
const [playOnce,setPlayOnce] = useState(true)
const [reload,setReload] = useState(false)
const {show,setShow,info,setInfo} = useContext(AuthContext)
const navigate = useNavigate()

let currentUser = JSON.parse(localStorage.getItem('token')!)

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


useEffect(()=>{
    if(playOnce || reload){
        axios.get('http://localhost:8080/api/users/').
        then((res)=> {
            setUser(res.data)
        })
    }
    setPlayOnce(false)
},[playOnce,reload])





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
             <div style={{"marginTop":"20px"}}>
                
                   <Link  to ='/private-admin/users'>
                       <Button variant='primary' className='ms-2'>see all Users </Button>
                    </Link>
               
             </div>
             <div>
               <Link to='/private-admin/add-employee'>
                   <Button id="btn">Add employee</Button>
                </Link>
            </div>
            <Table style={{"marginTop":"70px"}}
            striped bordered hover 
            className='table-admin'>
                <thead>
                    <tr>
                    <th>name</th>
                    <th>First name</th>
                    <th>Date début</th>
                    <th>Date fin</th>
                    <th>Total heure du mois</th>
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
                                <td><Button onClick={()=>sayHello(el.id)}>Show</Button></td>
                            </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default Admin;