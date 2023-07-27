import React, { useEffect, useState } from 'react';
import LoadOccupation from '../apicalls/LoadOccupation';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';

const OccupationsList = ({ name, createLeadForm, setCreateLeadForm, callOccuptionApi }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const [singleSelections, setSingleSelections] = useState([]);
    const storageData = localStorage.getItem('occupation_search');
    const [storedData, setStoredData] = useState(storageData && storageData.length > 0 ? JSON.parse(storageData) : null);
    const [value, setValue] = useState('');
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [occupationItems, setOccupationItems] = useState([]);
    let timer;
    let token = null;
    if (user) {
        token = user.token;
    }
    useEffect(() => {
        if (value) {
            setCreateLeadForm({
                ...createLeadForm,
                [name]: value.id
            });
        }
    }, [value]);

    useEffect(() => {
        if (storageData && storedData.length > 0) {
            setOccupationItems(storedData);
        } else {
            loadOccupationFunc();
        }
    }, []);
    useEffect(() => {
        loadOccupationFunc();
    }, [callOccuptionApi]);

    const loadOccupationFunc = () => {
        LoadOccupation(inputValue, token)
            .then((res) => {
                if (res) {
                    let searchdata = [...storedData];
                    const resposedata = res.results;
                    for (let item of resposedata) {
                        const isDuplicate = searchdata.some((dataItem) => dataItem.id === item.id);
                        if (!isDuplicate) {
                            let temp = {
                                text: item.text,
                                id: item.id
                            };
                            searchdata.push(temp);
                        }
                    }
                    const occupation_search = JSON.stringify(searchdata);
                    localStorage.setItem('occupation_search', occupation_search);
                    const localData = JSON.parse(localStorage.getItem('occupation_search'));
                    setOccupationItems(localData);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setOccupationItems([]);
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
            const searchedData = storedData.filter((item) => item.text.toLowerCase().includes(lowerCaseQuery));
            if (searchedData.length === 0) {
                setOccupationItems(searchedData);
            } else {
                setIsLoading(true);
                loadOccupationFunc();
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
                options={occupationItems}
                getOptionLabel={(option) => option.text || ''}
                sx={{ width: 400 }}
                loading={isLoading}
                renderInput={(params) => <TextField {...params} label={t('occupations')} />}
            />
        </>
    );
};

export default OccupationsList;
