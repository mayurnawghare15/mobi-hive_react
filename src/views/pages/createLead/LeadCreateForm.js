import React, { useState, useEffect, useRef } from 'react';
import { TextareaAutosize } from '@mui/base';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
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
    TextField,
    Button,
    Container,
    Stack,
    MenuItem,
    Menu
} from '@mui/material';
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
import { ValidateEmail, ValidateNumber } from '../../../helper';
import LeadCreateFormApi from '../../../apicalls/LeadCreateFormApi';
import { AltRoute } from '@mui/icons-material';

const LeadCreateForm = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    // const [choiceList, setChoiceList] = useState(null);
    const [countryCode, setCountryCode] = useState('');
    const [leadId, setLeadId] = useState(0);
    // const [isLoading, setIsLoading] = useState(false);
    const [showEmployerForm, setShowEmployerForm] = useState(false);
    const [showOccupationForm, setShowOccupationForm] = useState(false);
    const errorInputRef = useRef(null);
    const { user } = useAuthContext();
    let token = null
    if (user) {
        token = user.token
    }
    const [createLeadForm, setCreateLeadForm] = useState({
        title: '',
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
        customer_address: '',
        city: '',
        customer_locality: '',
        existing_loan: ''
    });
    const {
        title,
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
        customer_address,
        city,
        customer_locality,
        existing_loan
    } = createLeadForm;

    const [formError, setFormError] = useState({
        title: false,
        first_name: false,
        middle_name: false,
        last_name: false,
        gender: false,
        date_of_birth: false,
        marital_status: false,
        highest_education: false,
        ph_number: false,
        email: false,
        whatsapp_number: false,
        alt_number_name: false,
        alt_number_relation: false,
        alt_number: false,
        current_employer: false,
        employed_since: false,
        occupation_type: false,
        employee_type: false,
        monthly_income: false,
        total_dependents: false,
        monthly_saving: false,
        customer_address: false,
        city: false,
        customer_locality: false,
        existing_loan: false
    });

    const titleInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const first_nameInputRef = useRef(null);
    const last_nameInputRef = useRef(null);
    const genderInputRef = useRef(null);
    const date_of_birthInputRef = useRef(null);
    const marital_statusInputRef = useRef(null);
    const highest_educationInputRef = useRef(null);
    const ph_numberInputRef = useRef(null);
    const current_employerInputRef = useRef(null);
    const employed_sinceInputRef = useRef(null);
    const employee_typeInputRef = useRef(null);
    const monthly_incomeInputRef = useRef(null);
    const monthly_savingInputRef = useRef(null);
    const total_dependentsInputRef = useRef(null);
    const existing_loanInputRef = useRef(null);
    const customer_addressInputRef = useRef(null);
    const cityInputRef = useRef(null);
    const customer_localityInputRef = useRef(null);

    const validateFields = () => {
        let hasError = false;
        const newFormErrors = {
            title: false,
            first_name: false,
            middle_name: false,
            last_name: false,
            gender: false,
            date_of_birth: false,
            marital_status: false,
            highest_education: false,
            ph_number: false,
            email: false,
            whatsapp_number: false,
            alt_number_name: false,
            alt_number_relation: false,
            alt_number: false,
            current_employer: false,
            employed_since: false,
            occupation_type: false,
            employee_type: false,
            monthly_income: false,
            total_dependents: false,
            monthly_saving: false,
            customer_address: false,
            city: false,
            customer_locality: false,
            existing_loan: false
        };

        if (createLeadForm.first_name.trim() === '') {
            newFormErrors.first_name = true;
            hasError = true;
        }

        if (createLeadForm.email.trim() === '') {
            newFormErrors.email = true;
            hasError = true;
        }
        setFormError(newFormErrors);
        return hasError;
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setCreateLeadForm({
            ...createLeadForm,
            [name]: value
        });
    };
    const onPhoneNumberChange = (e) => {
        setCreateLeadForm({
            ...createLeadForm,
            ['ph_number']: e
        });
    };
    const onWhatsappNumberChange = (e) => {
        setCreateLeadForm({
            ...createLeadForm,
            ['whatsapp_number']: e
        });
    };
    const onLocalNumberChange = (e) => {
        setCreateLeadForm({
            ...createLeadForm,
            ['alt_number']: e
        });
    };
    const openCreateEmployerForm = () => {
        setShowEmployerForm(!showEmployerForm);
    };
    const openAddOccupationForm = () => {
        setShowOccupationForm(!showOccupationForm);
    };
    const { data, isLoading } = useContext(ChoiceListContext);
    useEffect(() => {
        if (state) setCreateLeadForm(state);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasError = validateFields();
        if (hasError) {
            if (formError.first_name) {
                if (first_nameInputRef.current)
                    first_nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            else if (formError.email) {
                if (emailInputRef.current)
                    emailInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // Scroll to the error input field
        } else {
            LeadCreateFormApi(createLeadForm, token).then(res => {
                if (res) {
                    console.log(res.data, '--- res Lead create form ---')
                    setLeadId(res.data.id)
                    toast.success(res.message)
                    return navigate("/lead/kyc")
                }
                else {

                    // setIsLoading(false)
                    // setCreateLeadForm([])
                }
            }).catch(error => {
                return toast.error('Something went wrong , Please check your internet connection.')
            })
            // Continue with form submission or handle the valid data
        }
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
                                    <Select
                                        // error={formError.title}
                                        // inputRef={titleInputRef}
                                        labelId="saluation-label"
                                        id="title"
                                        name="title"
                                        value={title}
                                        onChange={onInputChange}
                                    >
                                        {isLoading ? (
                                            <>Loading...</>
                                        ) : data ? (
                                            data.user_salutation.length > 0 ? (
                                                data.user_salutation.map((item, index) => (
                                                    <MenuItem value={item.name} id={item.slug}>
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
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    inputRef={first_nameInputRef}
                                    error={formError.first_name}
                                    className="textfield"
                                    type="text"
                                    variant="outlined"
                                    label={t('first_Name')}
                                    value={first_name}
                                    name="first_name"
                                    onChange={onInputChange}
                                    fullWidth
                                // required
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
                                        {isLoading ? (
                                            <>Loading...</>
                                        ) : data ? (
                                            data.gender.length > 0 ? (
                                                data.gender.map((item, index) => (
                                                    <FormControlLabel
                                                        value={item.slug}
                                                        id={item.slug}
                                                        control={<Radio />}
                                                        label={item.name}
                                                    />
                                                ))
                                            ) : (
                                                []
                                            )
                                        ) : null}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3.3} ml={-1} mt={-0.5}>
                                <InputLabel>Date of Birth *</InputLabel>
                                <TextField
                                    className="textfield"
                                    type="date"
                                    variant="outlined"
                                    name={'date_of_birth'}
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
                                        {t('Marital Status *')}
                                    </InputLabel>
                                    <Select
                                        labelId="marital-status-label"
                                        id="marital-status"
                                        value={marital_status}
                                        name="marital_status"
                                        onChange={onInputChange}
                                        required
                                    >
                                        {isLoading ? (
                                            <>Loading...</>
                                        ) : data ? (
                                            data.martial_status.length > 0 ? (
                                                data.martial_status.map((item, index) => (
                                                    <MenuItem id={item.slug} value={item.slug}>
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
                            <Grid item xs={12} sm={3.3} ml={-1} mt={2}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="education-label">
                                        {t('Highest Education *')}
                                    </InputLabel>
                                    <Select
                                        labelId="education-label"
                                        id="education"
                                        name="highest_education"
                                        value={highest_education}
                                        onChange={onInputChange}
                                    >
                                        {isLoading ? (
                                            <>Loading...</>
                                        ) : data ? (
                                            data.educational_qualification.length > 0 ? (
                                                data.educational_qualification.map((item, index) => (
                                                    <MenuItem value={item.slug} id={item.slug}>
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
                                inputRef={emailInputRef}
                                error={formError.email}
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
                            {/* <TextField
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
                            /> */}
                            <MuiPhoneNumber
                                className="label"
                                defaultCountry={'in'}
                                label={t('whatsapp')}
                                name="whatsapp_number"
                                value={whatsapp_number}
                                onChange={onWhatsappNumberChange}
                                fullWidth
                                required
                                variant="outlined"
                                countryCodeEditable
                                onCountryChange={(countryData) => setCountryCode(countryData.dialCode)}
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
                                    {isLoading ? (
                                        <>Loading...</>
                                    ) : data ? (
                                        data.user_realtions.length > 0 ? (
                                            data.user_realtions.map((item, index) => (
                                                <MenuItem value={item.slug} id={item.slug}>
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
                        <Grid item xs={12} sm={4}>
                            <MuiPhoneNumber
                                className="label"
                                defaultCountry={'in'}
                                label={t('local_number')}
                                name="alt_number"
                                value={alt_number}
                                onChange={onLocalNumberChange}
                                fullWidth
                                required
                                variant="outlined"
                                countryCodeEditable
                                onCountryChange={(countryData) => setCountryCode(countryData.dialCode)}
                            />
                        </Grid>
                    </Grid>
                </SubCard>
                {/* Business / Employment Information-------------------------- */}

                {<CreateEmployerPopup show={showEmployerForm} setShow={openCreateEmployerForm} />}
                {<AddOccupationPopup show={showOccupationForm} setShow={openAddOccupationForm} />}
                <SubCard>
                    <h3>{t('Busniess / Employment Information')}</h3>
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
                                onClick={openCreateEmployerForm}
                            >
                                <label>+</label>
                            </Button>
                        </Grid>
                        <Grid item xs={11} sm={7} mt={2.5}>
                            <EmployerList
                                name="current_employer"
                                createLeadForm={createLeadForm}
                                setCreateLeadForm={setCreateLeadForm}
                            // onInputChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel className="label" color="primary">
                                {t('employed_Since')} *
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
                            <OccupationsList name="occupation_type" createLeadForm={createLeadForm} setCreateLeadForm={setCreateLeadForm} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel className="label" id="employee-label">
                                    {t('employee_Type')} *
                                </InputLabel>
                                <Select
                                    labelId="employee-label"
                                    id="employee"
                                    value={employee_type}
                                    name="employee_type"
                                    onChange={onInputChange}
                                >
                                    {isLoading ? (
                                        <>Loading...</>
                                    ) : data ? (
                                        data.employee_type.length > 0 ? (
                                            data.employee_type.map((item, index) => (
                                                <MenuItem value={item.slug} id={item.slug}>
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
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="monthly-income">
                                    {t('income_Monthly')} *
                                </InputLabel>
                                <OutlinedInput
                                    type='number'
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
                                    {t('total_Dependents')} *
                                </InputLabel>
                                <OutlinedInput
                                    type='number'
                                    id="total-dependents"
                                    label={t('amount')}
                                    value={total_dependents}
                                    name="total_dependents"
                                    onChange={onInputChange}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="existing-loan">
                                    {t('existing_Loan')} *
                                </InputLabel>
                                <OutlinedInput
                                    type='number'
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
                                    {t('monthly_Saving')} *
                                </InputLabel>
                                <OutlinedInput
                                    type='number'
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
                    <h3>{t('Address')}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                                <InputLabel className="label" color="primary">
                                    {t('city')} *
                                </InputLabel>
                                <Select labelId="city-label" id="city" name="city" value={city} onChange={onInputChange}>
                                    {data
                                        ? data.cities.length > 0
                                            ? data.cities.map((item, index) => (
                                                <MenuItem value={item.id} id={item.slug}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                            : []
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
                                value={customer_locality}
                                name="customer_locality"
                                onChange={onInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <InputLabel className="label" color="primary">
                                {t('current_Address')} *
                            </InputLabel>
                            <FormControl mt={1} fullWidth>
                                <TextareaAutosize
                                    required
                                    value={customer_address}
                                    name="customer_address"
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
