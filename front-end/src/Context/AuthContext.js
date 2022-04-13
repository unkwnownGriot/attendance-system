import  {useState,createContext} from 'react'
import axios from 'axios';
import io from 'socket.io-client';




export const AuthContext = createContext()

const socket = io('http://localhost:3001')

export const AuthContextProvider = (props) => { 

const [currentUser,setCurrentUser] = useState('')
const [validation,setValidation] = useState('')
const [show,setShow] = useState(false)
const [info,setInfo] = useState(0)


    
    const signIn = (email,pwd)=>{
        if(email.trim().length && pwd.trim().length){
            axios.post('http://localhost:8080/api/users/login',{
            email:email,
            password:pwd
        }).then((res)=>{
            console.log(res.data)
            setValidation(res.data.error)
            socket.emit('receive-data',res.data)
        }).catch(err=>console.log(err))
    }else setValidation('tous les champs doivent être remplies')
}

    const signOut = () =>{ 
        setCurrentUser(null)
        localStorage.removeItem('token')
    }

 

    setTimeout(()=> setValidation(''),2000)

    socket.on('data-receive',(data)=>{
        console.log(data)
        localStorage.setItem('token',JSON.stringify(data))
        setCurrentUser(data.role)
    })
    
    

 


    return(
        <AuthContext.Provider value={{signIn,currentUser,signOut,setCurrentUser,
            validation,setValidation,show,setShow,info,setInfo}}>
            {props.children}
        </AuthContext.Provider>
    )
}