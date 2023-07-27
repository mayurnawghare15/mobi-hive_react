import { toast } from 'react-toastify';
import axios from 'axios';
const API_Base_Url = process.env.REACT_APP_BASE_URL;

const LoginApi = async (body) => {
    try {
        const headers = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const response = await axios
            .post(API_Base_Url + 'v2/token/auth/', body, headers)
            .then((response) => {
                toast.success('Login Successfull');
                return response;
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    if (error.response.data.message !== undefined) {
                        const obj = error.response.data.message;
                        for (const key of Object.keys(obj)) {
                            return toast.error(key + ' : ' + obj[key][0]);
                        }
                    }
                } else if (error.response.status === 401) {
                    // toast.error('You are not authorized to view this page');
                    localStorage.setItem('user', '');
                    const timer = setTimeout(() => {
                        window.location.href = '/login';
                    }, 500);
                    return () => clearTimeout(timer);
                } else if (error.response.status === 404) {
                    return toast.error('Url not found');
                } else if (error.response.status >= 500) {
                    return toast.error('Something went wrong , Please contact to Admin.');
                }
            });
        return response.data;
    } catch (error) {
        return toast.error('Something went wrong , Please check your internet connection.');
    }
};

export default LoginApi;
