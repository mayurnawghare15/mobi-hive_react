import { toast } from 'react-toastify';
import axios from 'axios';

const API_Base_Url = process.env.REACT_APP_BASE_URL;

const GetLeadSaleOrder = async (token, leadid) => {
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

        const response = await axios.get(API_Base_Url + `/v2/get_lead_sale_order/${leadid}`, headers);

        if (response.status) {
            // Success: Order placed successfully

            return response.data;
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                toast.error('Internal Server error');
            } else if (error.response.status === 401) {
                // Handle unauthorized access error
                toast.error("You're not Unauthorized");
            } else if (error.response.status === 404) {
                toast.error('URL not found');
            } else if (error.response.status >= 500) {
                toast.error('Something went wrong. Please contact the administrator.');
            }
        } else if (error.request) {
            toast.error('No response received from the server. Please check your internet connection.');
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
        return null;
    }
};

export default GetLeadSaleOrder;
