import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { Password } from '@mui/icons-material';
import LoginApi from '../apicalls/LoginApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const logout = async () => {
        // removeuser from localstorage
        localStorage.removeItem('user');
        navigate('/login');
        // dispatch logout action
        dispatch({ type: 'LOGOUT' });
        toast.success('Logout Successfull');
    };
    return { logout };
};
