import { toast } from 'react-toastify';
import axios from 'axios';

const API_Base_Url = process.env.REACT_APP_BASE_URL;

const PlaceOrderAPI = async (token, prospectId, deviceId, pkgId) => {
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

        const response = await axios.get(API_Base_Url + `/v1/place-order/${prospectId}/${deviceId}/${pkgId}`, headers);

        if (response.status === 201) {
            // Success: Order placed successfully
            // toast.success('Order Placed Successfully');
            console.log(response);
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                toast.error("Oops! Sorry this Order can't be placed..");
            } else if (error.response.status === 401) {
                // Handle unauthorized access error
            } else if (error.response.status === 404) {
                toast.error('URL not found');
            } else if (error.response.status >= 500) {
                toast.error('Something went wrong. Please contact the administrator.');
            }
        } else if (error.request) {
            // The request was made but no response was received
            toast.error('No response received from the server. Please check your internet connection.');
        } else {
            // Something else happened while setting up the request
            toast.error('An unexpected error occurred. Please try again later.');
        }
        return null;
    }
};

export default PlaceOrderAPI;
