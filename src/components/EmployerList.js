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
import { useAuthContext } from '../hooks/useAuthContext';


const EmployerList = ({ current_employer, onInputChange, query }) => {

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const [employerItems, setEmployerItems] = useState([])
    const { user } = useAuthContext();
    let token = null
        if (user) {
            token = user.token
        }

    useEffect(() => {
        setIsLoading(true)
        LoadEmployer(query,token).then(res => {
            if (res) {
                setEmployerItems(res.results)
                setIsLoading(false)
            }
            else {
                setIsLoading(false)
                setEmployerItems([])
            }
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
                    name="current_employer"
                    id="current_employer"
                    value={current_employer}
                    onChange={onInputChange}>
                    {isLoading ? <>Loading...</> : employerItems.length > 0 ? employerItems.map((item) => (
                        <MenuItem value={item.employer_sector} id={item.id} >{item.business_name}</MenuItem>
                    )) : []}
                </Select>
            </FormControl>

        </>
    )
}

export default EmployerList;