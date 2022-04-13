import React,{useState,useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowModal from '../../Components/ShowModal';
import { Link } from 'react-router-dom';
import {Table,Button} from 'react-bootstrap';
import Header from '../../Components/Header'


const socket = io('http://localhost:3001')

const SeeUsers = () => {
const [user,setUser] = useState([])
const [playOnce,setPlayOnce] = useState(true)
const [reload,setReload] = useState(false)



useEffect(()=>{
    if(playOnce || reload){
        axios.get('http://localhost:8080/api/users/admin').
        then((res)=> {
            setUser(res.data)
        })
    }
    setPlayOnce(false)
},[playOnce,reload])


 function sayHello(user_id:number){
  axios.delete(`http://localhost:8080/api/users/${user_id}`).
  then(res=>alert(res.data.message))

 }

 socket.on('reload',()=>{
     setReload((v)=> !v)
 })


    return (
        <div className='admin'>
            <Header/>
            <div style={{"marginTop":"20px"}}>
             <Link  to ='/private-admin/admin'>
                 <Button variant=''>retour</Button>
            </Link>
                
             </div>
             <div>
               <Button id="btn">
                    <Link  to ='/private-admin/add-employee'>add employee</Link>
               </Button>
            </div>
                   
                
            
            <Table 
            striped bordered hover 
            className='table-admin'>
                <thead>
                    <tr>
                    <th>name</th>
                    <th>First name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>supprimer utilisateur</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((el:any,index)=>
                            <tr key={index}>
                                <td>{el.name}</td>
                                <td>{el.firstname}</td>
                                <td>{el.email}</td>
                                <td>{el.role}</td>
                                <td style={{"cursor":"pointer"}}> 
                                <Button variant='danger' onClick={()=>sayHello(el.id)}>supprimer</Button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default SeeUsers;