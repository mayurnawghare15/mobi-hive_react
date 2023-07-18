// ApiContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import ChoiceListApi from '../apicalls/ChoiceListApi';
import { toast } from 'react-toastify';

export const ChoiceListContext = createContext();

export const ChoiceListProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthContext();
    // Perform the API call
    useEffect(() => {
        const query = 'IN';
        let token = null
        if (user) {
            token = user.token
        }
        ChoiceListApi(query, token).then((res) => {
            console.log(res,'Choice List')
            setData(res);
            setIsLoading(false);
        })
            .catch((error) => {
                setIsLoading(false);
                return toast.error('Something went wrong , Please check your internet connection.');
            });
    }, []);

    return (
        <ChoiceListContext.Provider value={{ data, isLoading }}>
            {children}
        </ChoiceListContext.Provider>
    );
};
