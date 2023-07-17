import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { Password } from '@material-ui/icons';
import LoginApi from '../apicalls/LoginApi';

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const logout = async (username, password) => {
        
        // removeuser from localstorage
        localStorage.removeItem("user");
        // dispatch logout action
        dispatch({type:'LOGOUT'})
    }
    return { logout, isLoading, error }
}