import React, { useState } from 'react';
import { TextField, Button, Container, Stack, MenuItem, Menu } from '@mui/material';

import { TextareaAutosize } from '@mui/base';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../leadFormEss/style.css';

import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
import MuiPhoneNumber from 'material-ui-phone-number';
import UploadProfilePhoto from './uploadProfilePhoto';
import AnimateButton from '../../../ui-component/extended/AnimateButton';

const LeadCreateForm = () => {
    const { t } = useTranslation();
    const [countryCode, setCountryCode] = useState('');
    const [createLeadForm, setCreateLeadForm] = useState({
        photo: '',
        saluation: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        gender: '',
        date_of_birth: '',
        marital_status: '',
        highest_education: '',
        ph_number: '',
        email: '',
        whatsapp_number: '',
        alt_number_name: '',
        alt_number_relation: '',
        alt_number: '',
        current_employer: '',
        employed_since: '',
        occupation_sector: '',
        employee_type: '',
        monthly_income: '',
        total_dependents: '',
        monthly_saving: '',
        current_address: '',
        city: '',
        locality: '',
        existing_loan: ''
    });
    const {
        photo,
        saluation,
        first_name,
        last_name,
        gender,
        middle_name,
        date_of_birth,
        marital_status,
        highest_education,
        ph_number,
        email,
        whatsapp_number,
        alt_number_name,
        alt_number,
        alt_number_relation,
        current_employer,
        employed_since,
        occupation_sector,
        employee_type,
        monthly_income,
        total_dependents,
        monthly_saving,
        current_address,
        city,
        locality,
        existing_loan
    } = createLeadForm;
    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCreateLeadForm({
            ...createLeadForm,
            [name]: value
        });
    };

    const handleSubmit = () => {};
    return (
        <Container maxWidth="md">
            <form>
                {/* <MainCard className="maincard" title={t('Register_Form')}>
                    <Grid container justifyContent="end" alignItems="end" marginTop={-10}>
                        <UploadProfilePhoto photo={photo} />
                    </Grid>
                </MainCard> */}

                <SubCard>
                    <h3>Personal Details</h3>
                    <Stack spacing={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="tittle-label">
                                        {t('title')}
                                    </InputLabel>
                                    <Select labelId="tittle-label" id="tittle" value={saluation} onChange={onInputChange}>
                                        <MenuItem value={'Mr'}>{t('Mr')}</MenuItem>
                                        <MenuItem value={'Mrs'}>{t('Mrs')}</MenuItem>
                                        <MenuItem value={'Miss'}>{t('Miss')}</MenuItem>
                                        <MenuItem value={'Master'}>{t('Master')}</MenuItem>
                                        <MenuItem value={'Dr'}>{t('Dr')}</MenuItem>
                                        <MenuItem value={'Er'}>{t('Er')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    className="textfield"
                                    type="text"
                                    variant="outlined"
                                    label={t('first_Name')}
                                    value={first_name}
                                    name="first_name"
                                    onChange={onInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    className="textfield"
                                    type="text"
                                    variant="outlined"
                                    color="secondary"
                                    label={t('middle_Name')}
                                    value={middle_name}
                                    name="middle_name"
                                    onChange={onInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    className="textfield"
                                    type="text"
                                    variant="outlined"
                                    color="secondary"
                                    label={t('last_name')}
                                    value={last_name}
                                    name="last_name"
                                    onChange={onInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3}>
                                <FormControl component="fieldset">
                                    <FormLabel className="label" component="legend">
                                        {t('gender')}
                                    </FormLabel>
                                    <RadioGroup aria-label="gender" name="gender" value={gender} onChange={onInputChange}>
                                        <FormControlLabel value="female" control={<Radio />} label={t('female')} />
                                        <FormControlLabel value="male" control={<Radio />} label={t('male')} />
                                        <FormControlLabel value="other" control={<Radio />} label={t('other')} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} ml={-2}>
                                <InputLabel>Date of Birth</InputLabel>
                                <TextField
                                    className="textfield"
                                    type="date"
                                    variant="outlined"
                                    name={t('date_of_birth')}
                                    color="secondary"
                                    value={date_of_birth}
                                    onChange={onInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} mt={2.5}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="marital-status-label">
                                        {t('marital_Status')}
                                    </InputLabel>
                                    <Select
                                        labelId="marital-status-label"
                                        id="marital-status"
                                        value={marital_status}
                                        name="marital_status"
                                        onChange={onInputChange}
                                    >
                                        <MenuItem value="Single / Never Married">{t('single_/_Never_Married')}</MenuItem>
                                        <MenuItem value="Married">{t('married')}</MenuItem>
                                        <MenuItem value="Divorced">{t('divorced')}</MenuItem>
                                        <MenuItem value="Seprated">{t('seprated')}</MenuItem>
                                        <MenuItem value="Others">{t('others')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} mt={2.5}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="education-label">
                                        {t('highest_Education')}
                                    </InputLabel>
                                    <Select
                                        labelId="education-label"
                                        id="education"
                                        name="highest_education"
                                        value={highest_education}
                                        onChange={onInputChange}
                                    >
                                        <MenuItem value="Primary">{t('primary')}</MenuItem>
                                        <MenuItem value="Secondary">{t('secondary')}</MenuItem>
                                        <MenuItem value="Bachelors / Graduate">{t('bachelor_Graduate')}</MenuItem>
                                        <MenuItem value="Post-Graduate / Masters">{t('post_Graduate')}</MenuItem>
                                        <MenuItem value="PhD / Doctorate">{t('phd')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={4}>
                            <MuiPhoneNumber
                                className="label"
                                defaultCountry={'in'}
                                label={t('mobile_Number')}
                                name="ph_number"
                                value={ph_number}
                                onChange={onInputChange}
                                fullWidth
                                required
                                variant="outlined"
                                countryCodeEditable
                                onCountryChange={(countryData) => setCountryCode(countryData.dialCode)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className="textfield"
                                label={t('email')}
                                type="email"
                                name="email"
                                value={email}
                                onChange={onInputChange}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="error" />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className="textfield"
                                label={t('whatsapp')}
                                type="whatsapp"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <WhatsAppIcon color="success" />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                                value={whatsapp_number}
                                name="whatsapp_number"
                                onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
                </SubCard>
                {/* Local Card-------------------- */}
                <SubCard>
                    <h3>Local / Alternate Contact</h3>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className="textfield"
                                label={t('name')}
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={alt_number_name}
                                name="alt_number_name"
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel className="label" id="relation-status-label">
                                    {t('relation')}
                                </InputLabel>
                                <Select
                                    labelId="relation-status-label"
                                    variant="outlined"
                                    id="relation-status"
                                    value={alt_number_relation}
                                    name="alt_number_relation"
                                    onChange={onInputChange}
                                >
                                    <MenuItem value="Father">{t('father')}</MenuItem>
                                    <MenuItem value="Mother">{t('mother')}</MenuItem>
                                    <MenuItem value="Son">{t('son')}</MenuItem>
                                    <MenuItem value="Wife">{t('wife')}</MenuItem>
                                    <MenuItem value="Husband">{t('husband')}</MenuItem>
                                    <MenuItem value="Brother">{t('brother')}</MenuItem>
                                    <MenuItem value="Friend">{t('friend')}</MenuItem>
                                    <MenuItem value="Others">{t('others')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className="textfield"
                                label={t('local_phone_number')}
                                type="phone"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocalPhoneIcon color="primary" />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                                name="alt_number"
                                value={alt_number}
                                onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
                </SubCard>
                {/* Business / Employment Information-------------------------- */}
                <SubCard>
                    <h3>{t('BusniessLabel')}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8} mt={2.5}>
                            <FormControl fullWidth>
                                <InputLabel className="label" id="relation-status-label">
                                    {t('current_Employer')}
                                </InputLabel>
                                <Select
                                    labelId="relation-status-label"
                                    id="relation-status"
                                    value={current_employer}
                                    name="current_employer"
                                    onChange={onInputChange}
                                >
                                    <MenuItem value="Father">{t('father')}</MenuItem>
                                    <MenuItem value="Mother">{t('mother')}</MenuItem>
                                    <MenuItem value="Son">{t('son')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel className="label" color="primary">
                                <b>{t('employed_Since')}</b>
                            </InputLabel>
                            <TextField
                                className="textfield"
                                type="date"
                                variant="outlined"
                                value={employed_since}
                                name="employed_since"
                                onChange={onInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel className="label" id="occupation-label">
                                    {t('occupation')}
                                </InputLabel>
                                <Select
                                    labelId="occupation-label"
                                    name="occupation_sector"
                                    value={occupation_sector}
                                    onChange={onInputChange}
                                >
                                    <MenuItem value="Engineer">{t('engineer')}</MenuItem>
                                    <MenuItem value="Doctor">{t('doctor')}</MenuItem>
                                    <MenuItem value="Teacher">{t('teacher')}</MenuItem>
                                    <MenuItem value="Lawyer">{t('lawyer')}</MenuItem>
                                    {/* Add more occupation options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel className="label" id="employee-label">
                                    {t('employee_Type')}
                                </InputLabel>
                                <Select
                                    labelId="employee-label"
                                    id="employee"
                                    value={employee_type}
                                    name="employee_type"
                                    onChange={onInputChange}
                                >
                                    <MenuItem value="Full Time">{t('full_Time')}</MenuItem>
                                    <MenuItem value="Part Time">{t('part_Time')}</MenuItem>
                                    <MenuItem value="Freelancer">{t('freelancer')}</MenuItem>
                                    <MenuItem value="Self Employed">{t('self_Employed')}</MenuItem>
                                    {/* Add more employee type options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="monthly-income">
                                    {t('income_Monthly')}
                                </InputLabel>
                                <OutlinedInput
                                    id="monthly-income"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label={t('amount')}
                                    value={monthly_income}
                                    name="monthly_income"
                                    onChange={onInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="total-dependents">
                                    {t('total_Dependents')}
                                </InputLabel>
                                <OutlinedInput
                                    id="total-dependents"
                                    label={t('amount')}
                                    value={total_dependents}
                                    name="total_dependents"
                                    onChange={onInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="existing-loan">
                                    {t('existing_Loan')}
                                </InputLabel>
                                <OutlinedInput
                                    id="existing-loan"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label={t('amount')}
                                    value={existing_loan}
                                    name="existing_loan"
                                    onChange={onInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="monthly-saving">
                                    {t('monthly_Saving')}
                                </InputLabel>
                                <OutlinedInput
                                    id="monthly-saving"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label={t('amount')}
                                    value={monthly_saving}
                                    name="monthly_saving"
                                    onChange={onInputChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
                <SubCard>
                    <h3>{t('current_Address')}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                                <InputLabel className="label" color="primary">
                                    <b>{t('city')}*</b>
                                </InputLabel>
                                <Select labelId="city-label" id="city" name="city" value={city} onChange={onInputChange}>
                                    <MenuItem value="City 1">{t('city1')}</MenuItem>
                                    <MenuItem value="City 2">{t('city2')}</MenuItem>
                                    <MenuItem value="City 3">{t('city3')}</MenuItem>
                                    {/* Add more city options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className="textfield"
                                label={t('customer_Locality')}
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={locality}
                                name="locality"
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <InputLabel className="label" color="primary">
                                <b>{t('current_Address')}*</b>
                            </InputLabel>
                            <FormControl mt={1} fullWidth>
                                <TextareaAutosize
                                    required
                                    value={current_address}
                                    name="current_address"
                                    onChange={onInputChange}
                                    minRows={5}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>

                <Box
                    sx={{
                        mt: 3
                    }}
                >
                    <Grid sm={6}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                fullWidth
                                alignItems="end"
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                onClick={handleSubmit}
                            >
                                <label>{t('Submit')}</label>
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Box>
            </form>
        </Container>
    );
};

export default LeadCreateForm;
