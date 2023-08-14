import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Container,
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
import { ValidateEmail, ValidateNumber } from '../../helper';
import AddEmployerAPI from '../../apicalls/AddEmployerAPI';
import { useAuthContext } from '../../hooks/useAuthContext';
import { toast } from 'react-toastify';
import MuiPhoneNumber from 'material-ui-phone-number';

const CreateEmployerPopup = ({ show, setShow }) => {
    const { user } = useAuthContext();
    const { t } = useTranslation();
    const { data, isLoading } = useContext(ChoiceListContext);
    const { bussinessSectordata, bussinessSectordataIsLoading } = useContext(BussinessSectorContext);

    const [formEmployer, setFormEmployer] = useState({
        business_name: '',
        employer_sector: '',
        email: '',
        ph_number: '',
        whatsapp_number: '',
        city: '',
        address: ''
    });

    const { business_name, employer_sector, email, ph_number, whatsapp_number, city, address } = formEmployer;
    let token = null;
    if (user) {
        token = user.token;
    }

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormEmployer({
            ...formEmployer,
            [name]: value
        });
    };
    const onPhoneNumberChange = (e) => {
        setFormEmployer({
            ...formEmployer,
            ['ph_number']: e
        });
    };
    const onPhoneWhatsappChange = (e) => {
        setFormEmployer({
            ...formEmployer,
            ['whatsapp_number']: e
        });
    };

    const onSubmit = (e) => {
        // e.preventDefault();
        console.log(formEmployer);

        console.log(token);

        AddEmployerAPI(formEmployer, token)
            .then((res) => {
                if (res) {
                    console.log(res);
                    toast.success('Employer Added Successfully');
                    setShow();
                    setFormEmployer({
                        business_name: '',
                        employer_sector: '',
                        email: '',
                        ph_number: '',
                        whatsapp_number: '',
                        city: '',
                        address: ''
                    });
                } else {
                }
            })
            .catch((error) => {
                return toast.error('Something went wrong , Please check your internet connection.');
            });
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    const handleClose = () => {
        setShow();
        setFormEmployer({
            business_name: '',
            employer_sector: '',
            email: '',
            ph_number: '',
            whatsapp_number: '',
            city: '',
            address: ''
        });
    };

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
                                                onChange={onInputChange}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel className="label" id="tittle-label">
                                                    {t('EmployerSector')}
                                                </InputLabel>
                                                <Select
                                                    label={t('EmployerSector')}
                                                    labelId="tittle-label"
                                                    id="employee_sector"
                                                    name="employer_sector"
                                                    onChange={onInputChange}
                                                    value={employer_sector}
                                                >
                                                    {bussinessSectordataIsLoading ? (
                                                        <>Loading...</>
                                                    ) : bussinessSectordata ? (
                                                        bussinessSectordata.results.length > 0 ? (
                                                            bussinessSectordata.results.map((item, index) => (
                                                                <MenuItem value={item.id} id={item.id}>
                                                                    {item.text}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            []
                                                        )
                                                    ) : null}
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
                                                onChange={onInputChange}
                                                name="email"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MuiPhoneNumber
                                                className="label"
                                                defaultCountry={'in'}
                                                label={t('mobile_Number')}
                                                name="ph_number"
                                                value={ph_number}
                                                onChange={onPhoneNumberChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                countryCodeEditable
                                                // onCountryChange={(countryData) => setCountryCode(countryData.dialCode)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MuiPhoneNumber
                                                className="label"
                                                defaultCountry={'in'}
                                                label={t('whatsapp')}
                                                name="whatsapp_number"
                                                value={whatsapp_number}
                                                onChange={onPhoneWhatsappChange}
                                                fullWidth
                                                variant="outlined"
                                                countryCodeEditable
                                                // onCountryChange={(countryData) => setCountryCode(countryData.dialCode)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel className="label" id="tittle-label">
                                                    {t('City')}
                                                </InputLabel>
                                                <Select
                                                    onChange={onInputChange}
                                                    labelId="city-label"
                                                    label={t('City')}
                                                    id="city"
                                                    name="city"
                                                    value={city}
                                                >
                                                    {isLoading ? (
                                                        <>Loading...</>
                                                    ) : data ? (
                                                        data.cities.length > 0 ? (
                                                            data.cities.map((item, index) => (
                                                                <MenuItem value={item.id} id={item.slug}>
                                                                    {item.name}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            []
                                                        )
                                                    ) : null}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
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
                                                    style={{
                                                        padding: '10px',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                        fontSize: '14px'
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </SubCard>
                        </form>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="warning" alignItems="end" size="large" type="submit" variant="contained">
                        {t('Close')}
                    </Button>
                    <Button onClick={onSubmit} color="primary" alignItems="end" size="large" type="submit" variant="contained">
                        {t('Save')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateEmployerPopup;
