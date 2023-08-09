import { toast } from 'react-toastify';
import axios from 'axios';
const API_Base_Url = process.env.REACT_APP_BASE_URL;

const DeleteOrderAPI = async (token, orderId, leadId) => {
    try {
        const headers = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Token ' + token
            }
        };
        let url = `/v2/lead/${leadId}/order/${orderId}/delete/`;
        const response = await axios
            .post(API_Base_Url + url, headers)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    if (error.response.data.message !== undefined) {
                        return toast.error(error.response.data.message);
                    }
                } else if (error.response.status === 401) {
                    toast.error('You are not authorized to view this page');
                    localStorage.removeItem('user');
                    const timer = setTimeout(() => {
                        // window.location.href = '/login';
                    }, 500);
                    return () => clearTimeout(timer);
                } else if (error.response.status === 404) {
                    return toast.error('Url not found');
                } else if (error.response.status >= 500) {
                    if (error.response.data.message !== undefined) {
                        return toast.error(error.response.data.message);
                    }
                }
            });
        return response.data;
    } catch (error) {
        return toast.error('Something went wrong , Please check your internet connection.');
    }
};

export default DeleteOrderAPI;
