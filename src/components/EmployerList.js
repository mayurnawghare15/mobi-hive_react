import { useEffect, useState } from 'react'
import LoadOccupation from '../apicalls/LoadOccupation'
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select
} from '@material-ui/core';
import { TextField, Button, Container, Stack, MenuItem, Menu } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoadEmployer from '../apicalls/LoadEmployer';
import { toast } from 'react-toastify';


const EmployerList = ({ occupation_sector, onInputChange, query }) => {

    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false)
    const [employerItems, setEmployerItems] = useState([])

    useEffect(() => {
        LoadEmployer(query).then(res => {
            if (res)
                setEmployerItems(res.results)
            else
                setEmployerItems([])
        }).catch(error => {
            return toast.error('Something went wrong , Please check your internet connection.')
        })
    }, [])
    return (
        <>
            <FormControl fullWidth>
                <InputLabel className="label" id="occupation-label">
                    {t('Employer')}
                </InputLabel>
                <Select
                    labelId="occupation-label"
                    name="occupation_sector"
                    value={occupation_sector}
                    onChange={onInputChange}>
                    {employerItems.length > 0 ? employerItems.map((item) => (
                        <MenuItem value={item.employer_sector} id={item.id} >{item.business_name}</MenuItem>
                    )) : []}
                </Select>
            </FormControl>

        </>
    )
}

export default EmployerList;