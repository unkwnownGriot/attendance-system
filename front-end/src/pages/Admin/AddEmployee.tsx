import axios from 'axios';
import React,{useContext, useRef} from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';

const AddEmployee = () => {

 const inputs = useRef<HTMLInputElement | any>([])
const {validation,setValidation} = useContext(AuthContext)

const addInputs = (el:any)=>{
    if(el && !inputs.current.includes(el)){
        inputs.current.push(el)
    }
}


const handleForm = (e:any)=>{
    e.preventDefault()
   var values = inputs.current.map((el:any)=>el.value)
if(values[0].trim().length && values[1].trim().length && values[2].trim().length && values[2].trim().length){
        axios.post('http://localhost:8080/api/users/register',{
            name:values[0],
            firstname:values[1],
            email:values[2],
            password:values[3],
            role:values[4]
        }).then((res)=>{
            console.log(res.data)
            setValidation(res.data.message)
        })
}else setValidation('tous les champs doivent être remplies')
}



    return (
        <div style={{"backgroundColor":"#f2f2f2","minHeight":"100vh"}}>
               <Link  to ='/private-admin/users'>
                       <Button variant='link' className='ms-2 mt-2'>see all Users </Button>
                </Link>
            <form id='add_employee'>
                <div className="inputsForm">
                    <label htmlFor="name">Entrez le nom de l'employé</label>
                    <input type="text" id='name'ref={addInputs} />
                </div>
                <div className="inputsForm">
                    <label htmlFor="firstname">Entrez le prénom de l'employé</label>
                    <input type="text" id='firstname'ref={addInputs}  />
                </div>
                <div className="inputsForm">
                    <label htmlFor="email">Entrez une adresse mail</label>
                    <input type="text" id='email'ref={addInputs} />
                </div>
                <div className="inputsForm">
                    <label htmlFor="password">Entrez le mot de passe</label>
                    <input type="password" id='password'ref={addInputs}  />
                </div>
                <div className="inputsForm">
                     <label htmlFor="email">Entrez le rôle </label>
                     <select id="" ref={addInputs} >
                         <option value="admin">Administrateur</option>
                         <option value="user">Simple employé</option>
                         <option value="comptable">Comptable</option>
                     </select>
                </div>
             <Button style={{"marginTop":"20px"}} onClick={handleForm}>Enregistrer </Button>
             <p style={{"marginTop":"15px","color":"green"}}>{validation}</p>
            </form>
        </div>
    );
};

export default AddEmployee;