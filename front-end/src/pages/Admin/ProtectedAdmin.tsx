import React from 'react';
import { useLocation,Outlet,Navigate } from 'react-router';
const ProtectedAdmin = () => {
        let location = useLocation()
        let user = JSON.parse(localStorage.getItem('token')!)
        console.log(user)
    
        if(user===null || user.role !=='admin'){
            return <Navigate to='/' state={{ from: location }} replace/>
        }


    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default ProtectedAdmin;