// ApiContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';
import BussinessSectorApi from '../apicalls/BussinessSector';

export const EmployerListContext = createContext();

export const EmployerListProvider = ({ children }) => {
    const [employerListData, setEmployerListData] = useState(null);
    const [employerListDataIsLoading, setemployerListDataIsLoading] = useState(true);
    const { user } = useAuthContext();
    // Perform the API call
    useEffect(() => {
        let token = null
        if (user) {
            token = user.token
        }
        BussinessSectorApi(token).then((res) => {
            if(res){
                setEmployerListData(res);
                setemployerListDataIsLoading(false);
            }
        })
            .catch((error) => {
                setemployerListDataIsLoading(false);
                return toast.error('Something went wrong , Please check your internet connection.');
            });
    }, []);

    return (
        <EmployerListContext.Provider value={{ employerListData, employerListDataIsLoading }}>
            {children}
        </EmployerListContext.Provider>
    );
};
