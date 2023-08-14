// ApiContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';
import BussinessSectorApi from '../apicalls/BussinessSector';

export const OccupationListContext = createContext();

export const OccupationListProvider = ({ children }) => {
    const [occupationListData, setOccupationListData] = useState(null);
    const [occupationListDataIsLoading, setOccupationListDataIsLoading] = useState(true);
    const { user } = useAuthContext();
    // Perform the API call
    useEffect(() => {
        let token = null
        if (user) {
            token = user.token
        }
        BussinessSectorApi(token).then((res) => {
            if(res){
                setOccupationListData(res);
                setOccupationListDataIsLoading(false);
            }
        })
            .catch((error) => {
                setOccupationListDataIsLoading(false);
                return toast.error('Something went wrong , Please check your internet connection.');
            });
    }, []);

    return (
        <OccupationListContext.Provider value={{ occupationListData, occupationListDataIsLoading }}>
            {children}
        </OccupationListContext.Provider>
    );
};
