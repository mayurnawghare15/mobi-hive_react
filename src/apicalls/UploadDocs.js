import { toast } from 'react-toastify';
import axios from 'axios';
const API_Base_Url = process.env.REACT_APP_BASE_URL;

const UploadDocs = async (formdata, token, leadId) => {
    try {
        formdata.forEach((value,key) => {
            console.log(key+" "+value)
          });
        const headers = {
            headers: {
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

        const response = await axios
            .post(`http://sandbox.credithive.co.uk:8088/webservices/v1/lead/${leadId}/upload_ekyc_document`, formdata, headers)
            // .post(API_Base_Url + `/v2/lead/${leadId}/upload_ekyc_document/`, formdata, headers)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error, '--------error');
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

export default UploadDocs;
