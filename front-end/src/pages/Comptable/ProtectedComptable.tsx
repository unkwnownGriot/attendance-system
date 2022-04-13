import React from 'react';
import {Outlet,useLocation,Navigate} from 'react-router-dom';

const ProtectedComptable = () => {

    let location = useLocation()
    let user = JSON.parse(localStorage.getItem('token')!)

    console.log(user)

    if(!user && user.role !=='comptable'){
        return <Navigate to='/' state={{ from: location }} replace/>
    }


    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default ProtectedComptable;