import { toast } from 'react-toastify';
import axios from 'axios';
const API_Base_Url = process.env.REACT_APP_BASE_URL;

const GetLeadDocsApi = async (leadId, token ) => {
    try {
        const headers = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Token ' + token
            }
        };
        if (!token) {
            toast.error('You are not authorized to view this page');
            localStorage.removeItem('user');
            const timer = setTimeout(() => {
                window.location.href = '/login';
            }, 500);
            return () => clearTimeout(timer);
        }
        
        const response = await axios.get(API_Base_Url + `/v2/lead/${leadId}/upload_ekyc_document/`, headers)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    return toast.error('Something went wrong , Please contact to Admin.');
                } else if (error.response.status === 401) {
                    toast.error('You are not authorized to view this page');
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

export default GetLeadDocsApi;
