// ApiContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';
import BussinessSectorApi from '../apicalls/BussinessSector';

export const RegisterLeadMobileContext = createContext();

export const RegisterLeadMobileProvider = ({ children }) => {
    const [bussinessSectordata, setBussinessSectordata] = useState(null);
    const [bussinessSectordataIsLoading, setIsLoading] = useState(true);
    const { user } = useAuthContext();
    // Perform the API call
    useEffect(() => {
        let token = null
        if (user) {
            token = user.token
        }
        BussinessSectorApi(token).then((res) => {
            if (res) {
                setBussinessSectordata(res);
                setIsLoading(false);
            }
        })
            .catch((error) => {
                setIsLoading(false);
                return toast.error('Something went wrong , Please check your internet connection.');
            });
    }, []);

    return (
        <RegisterLeadMobileContext.Provider value={{ bussinessSectordata, bussinessSectordataIsLoading }}>
            {children}
        </RegisterLeadMobileContext.Provider>
    );
};
