import React from 'react';
import { useAuth } from '../../context/authContext';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedAdmin() {
    const { user, isAutenAdmin } = useAuth();

    console.log("Estado de isAutenAdmin")
    console.log(isAutenAdmin)

    if (!isAutenAdmin) {
        console.log("No estas autenticado!")
        return <Navigate to='/login' replace />;
    }

    return (
        <Outlet />
    );
}


export function ProtectedClient() {
    const { user, isAutenClient } = useAuth();

    console.log("Estado de isAutenAdmin")
    console.log(isAutenClient)

    if (!isAutenClient) {
        console.log("No estas autenticado!")
        return <Navigate to='/login' replace />;
    }

    return (
        <Outlet />
    );
}


export function ProtectedInv() {
    const { user, isAutenInv } = useAuth();

    console.log("Estado de isAutenAdmin")
    console.log(isAutenInv)

    if (!isAutenInv) {
        console.log("No estas autenticado!")
        return <Navigate to='/login' replace />;
    }

    return (
        <Outlet />
    );
}


