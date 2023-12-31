import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadEmployer from '../apicalls/LoadEmployer';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const EmployerList = ({ name, createLeadForm, setCreateLeadForm }) => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [employerItems, setEmployerItems] = useState([{ business_name: 'select', id: 0 }]);

    const storageData = localStorage.getItem('business_search');
    const storedData = storageData && storageData.length > 0 ? JSON.parse(storageData) : [];

    const { user } = useAuthContext();
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    let token = null;
    let timer;
    if (user) {
        token = user.token;
    }

    useEffect(() => {
        if (storageData && storedData.length > 0) {
            setEmployerItems(storedData);
        } else {
            loadEmployeeFun();
        }
    }, []);

    useEffect(() => {
        if (value) {
            setCreateLeadForm({
                ...createLeadForm,
                [name]: value.id
            });
        }
    }, [value]);

    const loadEmployeeFun = () => {
        setIsLoading(true)
        LoadEmployer(inputValue, token)
            .then((res) => {
                if (res) {
                    let searchdata = []
                    if (storedData)
                        searchdata = [...storedData];
                    const resposedata = res.results;
                    for (let item of resposedata) {
                        const isDuplicate = searchdata.some((dataItem) => dataItem.id === item.id);
                        if (!isDuplicate) {
                            let temp = {
                                business_name: item.business_name,
                                id: item.id
                            };
                            searchdata.push(temp);
                        }
                    }
                    const business_search = JSON.stringify(searchdata);
                    localStorage.setItem('business_search', business_search);
                    const localData = JSON.parse(localStorage.getItem('business_search'));
                    setEmployerItems(localData);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setEmployerItems([]);
                }
            })
            .catch((error) => {
                return toast.error('Something went wrong , Please check your internet connection.');
            });
    };

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        clearTimeout(timer); // Clear the previous timer
        timer = setTimeout(() => {
            const lowerCaseQuery = inputValue.toLowerCase();
            const searchedData = storedData.filter((item) => item.business_name.toLowerCase().includes(lowerCaseQuery));
            if (searchedData.length === 0) {
                setEmployerItems(searchedData);
                setIsLoading(true);
                loadEmployeeFun();
            }
        }, 500); // Set a 500ms delay before making the API call
    };
    return (
        <>
            <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                id="controllable-states-demo"
                options={employerItems}
                getOptionLabel={(option) => option.business_name || ''}
                sx={{ width: 400 }}
                loading={isLoading}
                renderInput={(params) => <TextField {...params} label={t('current_Employer')} />}
            />
        </>
    );
};

export default EmployerList;
