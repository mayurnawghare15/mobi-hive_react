import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { Password } from '@material-ui/icons';
import LoginApi from '../apicalls/LoginApi';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)
        const body = {
            username: username,
            password: password
        }
        LoginApi(body)
            .then((res) => {
                const userdata = res.data
                localStorage.setItem('user', JSON.stringify(userdata))
                dispatch({ type: "LOGIN", payload: userdata })
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                setError('Something went wrong , Please check your internet connection.');
            });
    }
    return { login, isLoading, error }
}