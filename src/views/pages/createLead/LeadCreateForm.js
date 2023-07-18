import React, { useState, useEffect } from 'react';
import { TextareaAutosize } from '@mui/base';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
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
    Select,
    TextField, Button, Container, Stack, MenuItem, Menu
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import OccupationsList from '../../../components/OccupationList';
import EmployerList from '../../../components/EmployerList';
// import ChoiceListApi from '../../../apicalls/ChoiceListApi';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../hooks/useAuthContext';
import CreateEmployerPopup from '../../popups/AddEmployer';
import { useContext } from 'react';
import { ChoiceListContext } from '../../../context/ChoiceListContext';
import AddOccupationPopup from '../../popups/AddOccupation';
import { ValidateNumber } from '../../../helper';


const LeadCreateForm = () => {
    const { t } = useTranslation();
    const [countryCode, setCountryCode] = useState('');
    const location = useLocation();
    const { state } = location;
    // const [choiceList, setChoiceList] = useState(null);
    const [showEmployerForm, setShowEmployerForm] = useState(false);
    const [showOccupationForm, setShowOccupationForm] = useState(false);
    const [createLeadForm, setCreateLeadForm] = useState({
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
        occupation_type: '',
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
        occupation_type,
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
            [name]: name === "whatsapp_number" || name === "alt_number" || name === "monthly_income"
                || name === "total_dependents" || name === "existing_loan"
                || name === "monthly_saving" ?
                // If number value available then it wil put Zero index else ""
                ValidateNumber(value)
                    ?
                    ValidateNumber(value)[0]
                    : ""
                : value
        });
    };
    const onPhoneNumberChange = (e) => {
        setCreateLeadForm({
            ...createLeadForm,
            ['ph_number']: e
        });
    };
    const openCreateEmployerForm = () => {
        setShowEmployerForm(!showEmployerForm);
    }
    const openAddOccupationForm = () => {
        setShowOccupationForm(!showOccupationForm);
    }
    const { data, isLoading } = useContext(ChoiceListContext);
    useEffect(() => {
        if (state) setCreateLeadForm(state);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(countryCode, '--countryCode')
        console.log(createLeadForm, '0-----createLeadForm')
    };
    return (
        <Container fullWidth>
            <form onSubmit={handleSubmit}>
                <SubCard>
                    <h3>Personal Details</h3>
                    <Stack spacing={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="tittle-label">
                                        {t('title')}
                                    </InputLabel>
                                    <Select labelId="saluation-label" id="saluation" name="saluation" value={saluation} onChange={onInputChange}>
                                        {isLoading ? <>Loading...</> : data
                                            ? data.user_salutation.length > 0 ? data.user_salutation.map((item, index) => (
                                                <MenuItem value={item.name} id={item.slug}>
                                                    {item.name}
                                                </MenuItem>
                                            )) : []
                                            : null}
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
                            <Grid item xs={12} sm={2}>
                                <FormControl component="fieldset">
                                    <FormLabel className="label" component="legend">
                                        {t('Gender')}
                                    </FormLabel>
                                    <RadioGroup aria-label="gender" name="gender" value={gender} onChange={onInputChange} required>
                                        {isLoading ? <>Loading...</> : data
                                            ? data.gender.length > 0 ? data.gender.map((item, index) => (
                                                <FormControlLabel
                                                    value={item.slug}
                                                    id={item.slug}
                                                    control={<Radio />}
                                                    label={item.name}
                                                />
                                            )) : []
                                            : null}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3.3} ml={-1} mt={-0.5}>
                                <InputLabel>Date of Birth</InputLabel>
                                <TextField
                                    className="textfield"
                                    type="date"
                                    variant="outlined"
                                    name={"date_of_birth"}
                                    color="secondary"
                                    value={date_of_birth}
                                    onChange={onInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3.3} ml={-1} mt={2}>
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
                                        required>
                                        {isLoading ? <>Loading...</> : data
                                            ? data.martial_status.length > 0 ? data.martial_status.map((item, index) => (
                                                <MenuItem id={item.slug} value={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            )) : []
                                            : null}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3.3} ml={-1} mt={2}>
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
                                        {isLoading ? <>Loading...</> : data
                                            ? data.educational_qualification.length > 0 ? data.educational_qualification.map((item, index) => (
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
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={4}>
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
                                    {isLoading ? <>Loading...</> : data
                                        ? data.user_realtions.length > 0 ? data.user_realtions.map((item, index) => (
                                            <MenuItem value={item.name} id={item.slug}>
                                                {item.name}
                                            </MenuItem>
                                        )) : []
                                        : null}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className="textfield"
                                label={t('Local_Phone_Number')}
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

                {<CreateEmployerPopup show={showEmployerForm} setShow={openCreateEmployerForm} />}
                {<AddOccupationPopup show={showOccupationForm} setShow={openAddOccupationForm} />}
                <SubCard>
                    <h3>{t('BusniessLabel')}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={1} sm={1} mt={4}>
                            <Button
                                disableElevation
                                fullWidth
                                // alignItems="end"
                                size="small"
                                type="button"
                                variant="contained"
                                color="warning"
                                onClick={openCreateEmployerForm}>
                                <label>+</label>
                            </Button>
                        </Grid>
                        <Grid item xs={11} sm={7} mt={2.5}>
                            <EmployerList name="current_employer" current_employer={current_employer} onInputChange={onInputChange} query="1" />
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
                        <Grid item xs={1} sm={1} mt={1}>
                            <Button
                                disableElevation
                                fullWidth
                                // alignItems="end"
                                size="small"
                                type="button"
                                variant="contained"
                                color="warning"
                                onClick={openAddOccupationForm}
                            >
                                <label>+</label>
                            </Button>
                        </Grid>
                        <Grid item xs={11} sm={5}>
                            <OccupationsList occupation_type={occupation_type} onInputChange={onInputChange} />
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
                                    {isLoading ? <>Loading...</> : data
                                        ? data.employee_type.length > 0 ? data.employee_type.map((item, index) => (
                                            <MenuItem value={item.name} id={item.slug}>
                                                {item.name}
                                            </MenuItem>
                                        )) : []
                                        : null}
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
                                    {data
                                        ? data.cities.length > 0 ? data.cities.map((item, index) => (
                                            <MenuItem value={item.name} id={item.slug}>
                                                {item.name}
                                            </MenuItem>
                                        )) : []
                                        : null}

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