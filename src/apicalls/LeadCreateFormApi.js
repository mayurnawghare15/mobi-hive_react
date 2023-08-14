import { toast } from 'react-toastify';
import axios from 'axios';
const API_Base_Url = process.env.REACT_APP_BASE_URL;

const LeadCreateFormApi = async (body, token, create_copy_new_lead) => {
    try {
        const headers = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Token ' + token
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

        const url = "/v2/prospect_lead/"
        if (create_copy_new_lead) {
            url = "/v2/new-prospect-lead/"
        }

        const response = await axios
            .post(API_Base_Url + url, body, headers)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 400) {
                    return toast.error(error);
                } else if (error.response.status === 401) {
                    toast.error('You are not authorized to view this page');
                    localStorage.setItem('user', '');
                    const timer = setTimeout(() => {
                        window.location.href = '/login';
                    }, 500);
                    return () => clearTimeout(timer);
                } else if (error.response.status === 404) {
                    return toast.error('Url not found');
                }
                // } else if (error.response.status >= 500) {
                //     return toast.error('Something went wrong , Please contact to Admin.');
                // }
            });
        return response.data;
    } catch (error) {
        console.log(error);
        return toast.error(error);
    }
};

export default LeadCreateFormApi;
