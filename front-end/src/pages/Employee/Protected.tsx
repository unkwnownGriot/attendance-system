import React from 'react';
import { Outlet,useLocation,Navigate } from 'react-router';
const Protected = () => {

let location = useLocation()
let user = JSON.parse(localStorage.getItem('token')!)
console.log(user)
if(!user){
    return <Navigate to='/' state={{ from: location }} replace/>
}

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default Protected;