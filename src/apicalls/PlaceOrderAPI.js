import { toast } from 'react-toastify';
import axios from 'axios';

const API_Base_Url = process.env.REACT_APP_BASE_URL;

const PlaceOrderAPI = async (token, leadid, deviceId, pkgId) => {
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

        const response = await axios.get(API_Base_Url + `/v1/place-order/${leadid}/${deviceId}/${pkgId}`, headers)
            .then((response) => {
                if (response.status === 201) {
                    toast.success(response.message);
                    return response;
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    return toast.error("Oops! Sorry this Order can't be placed..");
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
                else return toast.error('Something went wrong , Please contact to Admin.');

            });
        return response;

    } catch (error) {
        console.log(error);
    }

};

export default PlaceOrderAPI;
