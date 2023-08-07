import { toast } from 'react-toastify';
import axios from 'axios';
const API_Base_Url = process.env.REACT_APP_BASE_URL;

const EligibleDevicesAPI = async (token, prospectId,search_param) => {
    try {
        const headers = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Token ' + token
            }
        };
        console.log(token + ' Token');
        if (!token) {
            toast.error('You are not authorized to view this page');
            localStorage.removeItem('user');
            const timer = setTimeout(() => {
                window.location.href = '/login';
            }, 500);
            return () => clearTimeout(timer);
        }
        const response = await axios
            .get(API_Base_Url + `/v2/devices/?prospect_id=${prospectId}&search=${search_param}`, headers)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    return toast.error('Something went wrong , Please contact to Admin.');
                } else if (error.response.status === 401) {
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
    console.log(token, prospectId);
};

export default EligibleDevicesAPI;
