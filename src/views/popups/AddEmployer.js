import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogActions, Container,
    FormControl,
    Grid,
    InputLabel,
    Stack,
    Button,
    DialogContent,
    TextField,
    Select,
    MenuItem,
    TextareaAutosize
} from '@mui/material';
import SubCard from '../../ui-component/cards/SubCard';

import { useTranslation } from 'react-i18next';
import { ChoiceListContext } from '../../context/ChoiceListContext';
import { useContext } from 'react';
import { BussinessSectorContext } from '../../context/BussinessSectorContext';
import { ValidateNumber } from '../../helper';

const CreateEmployerPopup = ({ show, setShow }) => {
    const { t } = useTranslation();
    const { data, isLoading } = useContext(ChoiceListContext);
    const { bussinessSectordata, bussinessSectordataIsLoading } = useContext(BussinessSectorContext);

    
    const [formEmployer, setFormEmployer] = useState({
        business_name: "",
        employee_sector: "",
        email: "",
        phone_number: "",
        whatsapp_number: "",
        city: "",
        address: ""
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const { business_name, employee_sector, email, phone_number, whatsapp_number, city, address } = formEmployer;

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormEmployer({
            ...formEmployer,
            [name]:
                name === 'whatsapp_number' ||
                    name === 'phone_number'
                    ? // If number value available then it wil put Zero index else ""
                    ValidateNumber(value)
                        ? ValidateNumber(value)[0]
                        : ''
                    : value
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <Dialog open={show}>
                <DialogTitle sx={{ fontSize: '1.2rem' }}>Add Employer </DialogTitle>
                <DialogContent>
                    <Container fullWidth>
                        <form>
                            <SubCard>

                                <Stack spacing={1}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                className="textfield"
                                                type="text"
                                                variant="outlined"
                                                label={t('Business Name')}
                                                value={business_name}
                                                name="business_name"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel className="label" id="tittle-label">
                                                    {t('EmployerSector')}
                                                </InputLabel>
                                                <Select labelId="tittle-label" id="employee_sector" name="employee_sector" value={employee_sector}>
                                                    {bussinessSectordataIsLoading ? <>Loading...</> : bussinessSectordata
                                                        ? bussinessSectordata.results.length > 0 ? bussinessSectordata.results.map((item, index) => (
                                                            <MenuItem value={item.text} id={item.id}>
                                                                {item.text}
                                                            </MenuItem>
                                                        )) : []
                                                        : null}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                className="textfield"
                                                type="text"
                                                variant="outlined"
                                                label={t('email')}
                                                value={email}
                                                name="email"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                className="textfield"
                                                type="text"
                                                variant="outlined"
                                                color="secondary"
                                                label={t('phone_number')}
                                                value={phone_number}
                                                name="phone_number"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                className="textfield"
                                                type="text"
                                                variant="outlined"
                                                color="secondary"
                                                label={t('whatsapp_number')}
                                                value={whatsapp_number}
                                                name="whatsapp_number"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel className="label" color="primary">
                                                <b>{t('Address')}*</b>
                                            </InputLabel>
                                            <FormControl mt={1} fullWidth>
                                                <TextareaAutosize
                                                    required
                                                    value={address}
                                                    name="address"
                                                    onChange={onInputChange}
                                                    minRows={5}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel className="label" id="tittle-label">
                                                    {t('City')}
                                                </InputLabel>
                                                <Select labelId="city-label" id="city" name="city" value={city}>
                                                    {isLoading ? <>Loading...</> : data
                                                        ? data.cities.length > 0 ? data.cities.map((item, index) => (
                                                            <MenuItem value={item.name} id={item.slug}>
                                                                {item.name}
                                                            </MenuItem>
                                                        )) : []
                                                        : null}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </SubCard>
                        </form>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setShow}
                        color="warning"
                        alignItems="end"
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        {t('Close')}
                    </Button>
                    <Button onClick={onSubmit}
                        color="primary"
                        alignItems="end"
                        size="large"
                        type="submit"
                        variant="contained">
                        {t('Save')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateEmployerPopup;
