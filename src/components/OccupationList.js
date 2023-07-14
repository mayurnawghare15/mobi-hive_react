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


const OccupationsList = ({ occupation_sector, onInputChange, query }) => {

    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false)
    const [occupationItems, setOccupationItems] = useState([])

    useEffect(() => {
        // Apicall
        LoadOccupation(query).then(res => {
            setOccupationItems(res.results)
        }).catch(error=>{
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
                    name="occupation_sector"
                    value={occupation_sector}
                    onChange={onInputChange}       
           
                >
                    {occupationItems.map((item) => (
                        <MenuItem value={item.selected_text} id={item.id} >{item.text}</MenuItem>
                    ))}


                    {/* Add more occupation options as needed */}
                </Select>
            </FormControl>

        </>
    )
}

export default OccupationsList