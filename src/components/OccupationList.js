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
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';


const OccupationsList = ({ occupation_type, onInputChange }) => {

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const [occupationItems, setOccupationItems] = useState([])
    const { user } = useAuthContext();
    let token = null
    if (user) {
        token = user.token
    }
    useEffect(() => {
        // Apicall
        let query = 1;
        setIsLoading(true)
        LoadOccupation(query, token).then(res => {
            if (res) {
                console.log(res, '-----res')
                setOccupationItems(res.results)
                setIsLoading(false)
            }
            else {
                setIsLoading(false)
                setOccupationItems([])
            }
        }).catch(error => {
            return toast.error('Something went wrong , Please check your internet connection.')
        })
    }, [])

    return (
        <>
            <FormControl fullWidth>
                <InputLabel className="label" id="occupation-label">
                    {t('Occupations')}
                </InputLabel>
                <Select
                    labelId="occupation-label"
                    name="occupation_type"
                    id="occupation_type"
                    value={occupation_type}
                    onChange={onInputChange}

                >
                    {isLoading ? <>Loading...</> : occupationItems.length > 0 ? occupationItems.map((item) => (
                        <MenuItem value={item.selected_text} id={item.id} >{item.text}</MenuItem>
                    )) : []}


                    {/* Add more occupation options as needed */}
                </Select>
            </FormControl>

        </>
    )
}

export default OccupationsList