import React, { useState, useEffect, useRef } from 'react';
import { TextareaAutosize } from '@mui/base';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
    Menu,
    CardHeader
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
    const { mobile_Number } = useParams();

    console.log(mobile_Number + 'match-------');
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const [countryCode, setCountryCode] = useState('');
    const [leadId, setLeadId] = useState(0);
    const [showEmployerForm, setShowEmployerForm] = useState(false);
    const [showOccupationForm, setShowOccupationForm] = useState(false);
    const [callOccuptionApi, setCallOccuptionApi] = useState(false);
    const errorInputRef = useRef(null);
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
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

        if (createLeadForm.tittle === '') {
            newFormErrors.title = true;
            hasError = true;
        }
        if (createLeadForm.first_name.trim() === '') {
            newFormErrors.first_name = true;
            hasError = true;
        }
        if (createLeadForm.last_name.trim() === '') {
            newFormErrors.last_name = true;
            hasError = true;
        }
        if (createLeadForm.gender === '') {
            newFormErrors.gender = true;
            hasError = true;
        }
        if (createLeadForm.date_of_birth === '') {
            newFormErrors.date_of_birth = true;
            hasError = true;
        }
        if (createLeadForm.marital_status === '') {
            newFormErrors.marital_status = true;
            hasError = true;
        }
        if (createLeadForm.highest_education === '') {
            newFormErrors.highest_education = true;
            hasError = true;
        }

        if (createLeadForm.email.trim() === '') {
            newFormErrors.email = true;
            hasError = true;
        }
        if (createLeadForm.employed_since === '') {
            newFormErrors.employed_since = true;
            hasError = true;
        }
        if (createLeadForm.occupation_type === '') {
            newFormErrors.occupation_type = true;
            hasError = true;
        }
        if (createLeadForm.employee_type === '') {
            newFormErrors.employee_type = true;
            hasError = true;
        }
        if (createLeadForm.monthly_income === '') {
            newFormErrors.monthly_income = true;
            hasError = true;
        }
        if (createLeadForm.total_dependents === '') {
            newFormErrors.total_dependents = true;
            hasError = true;
        }
        if (createLeadForm.existing_loan === '') {
            newFormErrors.existing_loan = true;
            hasError = true;
        }
        if (createLeadForm.monthly_saving === '') {
            newFormErrors.monthly_income = true;
            hasError = true;
        }
        if (createLeadForm.occupation_type === '') {
            newFormErrors.occupation_type = true;
            hasError = true;
        }
        if (createLeadForm.customer_address.trim() === '') {
            newFormErrors.customer_address = true;
            hasError = true;
        }
        if (createLeadForm.city === '') {
            newFormErrors.city = true;
            hasError = true;
        }
        if (createLeadForm.customer_locality.trim() === '') {
            newFormErrors.customer_locality = true;
            hasError = true;
        }
        setFormError(newFormErrors);
        return hasError;
    };

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
        if (!state) {
            navigate('/lead/verify-phonenumber')
            return toast.error('You can not direct authorized this page');
        } else if (mobile_Number === state.ph_number) {
            if (state) setCreateLeadForm(state);
        } else {
            return toast.error('You are not authorized this page');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasError = validateFields();
        if (hasError) {
            if (formError.first_name) {
                if (first_nameInputRef.current) first_nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.last_name) {
                if (last_nameInputRef.current) last_nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.gender) {
                if (genderInputRef.current) genderInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.date_of_birth) {
                if (date_of_birthInputRef.current) date_of_birthInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.marital_status) {
                if (marital_statusInputRef.current) marital_statusInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.highest_education) {
                if (highest_educationInputRef.current)
                    highest_educationInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.email) {
                if (emailInputRef.current) emailInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.employed_since) {
                if (employed_sinceInputRef.current) employed_sinceInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.employee_type) {
                if (employee_typeInputRef.current) employee_typeInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.monthly_income) {
                if (monthly_incomeInputRef.current) monthly_incomeInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.total_dependents) {
                if (total_dependentsInputRef.current)
                    total_dependentsInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.existing_loan) {
                if (existing_loanInputRef.current) existing_loanInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.monthly_saving) {
                if (monthly_savingInputRef.current) monthly_savingInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.city) {
                if (cityInputRef.current) cityInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (formError.customer_locality) {
                if (customer_localityInputRef.current)
                    customer_localityInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // Scroll to the error input field
        } else {
            LeadCreateFormApi(createLeadForm, token)
                .then((res) => {
                    if (res) {
                        console.log(res.data, '--- res Lead create form ---');
                        setLeadId(res.data.id);
                        toast.success(res.message);
                        return navigate('/lead/kyc');
                    }
                })
                .catch((error) => {
                    return toast.error('Something went wrong , Please check your internet connection.');
                });
            // Continue with form submission or handle the valid data
        }
    };
    return (
        <Container fullWidth>
            <form onSubmit={handleSubmit}>
                <SubCard>
                    <CardHeader title={t('personal_details')} />
                    <hr />
                    <Stack spacing={1} ml={1}>
                        <Grid container mt={1} spacing={2}>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="tittle-label">
                                        {t('title')}
                                    </InputLabel>
                                    <Select
                                        label={t('title')}
                                        error={formError.title}
                                        inputRef={titleInputRef}
                                        disabled={state ? (state.tittle ? true : false) : false}
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
                            <Grid item xs={12} sm={3.3}>
                                <TextField
                                    disabled={state ? (state.first_name ? true : false) : false}
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
                            <Grid item xs={12} sm={3.3}>
                                <TextField
                                    disabled={state ? (state.middle_name ? true : false) : false}
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
                            <Grid item xs={12} sm={3.3}>
                                <TextField
                                    error={formError.last_name}
                                    inputRef={last_nameInputRef}
                                    disabled={state ? (state.last_name ? true : false) : false}
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
                            <Grid item xs={12} sm={1.8}>
                                <FormControl component="fieldset">
                                    <FormLabel className="label" component="legend">
                                        {t('gender')}
                                    </FormLabel>
                                    <RadioGroup
                                        error={formError.gender}
                                        inputRef={genderInputRef}
                                        disabled={state ? (state.gender ? true : false) : false}
                                        aria-label="gender"
                                        name="gender"
                                        value={gender}
                                        onChange={onInputChange}
                                        required
                                    >
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
                            <Grid item xs={12} sm={3.3} mt={-0.5}>
                                <InputLabel>{t('date_of_birth')}</InputLabel>
                                <TextField
                                    error={formError.date_of_birth}
                                    inputRef={date_of_birthInputRef}
                                    disabled={state ? (state.date_of_birth ? true : false) : false}
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
                            <Grid item xs={12} sm={3.3} mt={2}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="marital-status-label">
                                        {t('marital_Status')}
                                    </InputLabel>
                                    <Select
                                        label={t('marital_Status')}
                                        error={formError.marital_status}
                                        inputRef={marital_statusInputRef}
                                        disabled={state ? (state.marital_status ? true : false) : false}
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
                            <Grid item xs={12} sm={3.3} mt={2}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="education-label">
                                        {t('highest_Education')}
                                    </InputLabel>
                                    <Select
                                        label={t('highest_Education')}
                                        error={formError.highest_education}
                                        inputRef={highest_educationInputRef}
                                        disabled={state ? (state.highest_education ? true : false) : false}
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
                                error={formError.ph_number}
                                inputRef={ph_numberInputRef}
                                disabled={ph_number ? true : false}
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
                                disabled={state ? (state.email ? true : false) : false}
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
                            <MuiPhoneNumber
                                disabled={state ? (state.whatsapp_number ? true : false) : false}
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
                    <CardHeader title={t('local_contact')} />
                    <hr />
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                disabled={state ? (state.alt_number_name ? true : false) : false}
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
                                    label={t('relation')}
                                    disabled={state ? (state.alt_number_relation ? true : false) : false}
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
                                disabled={state ? (state.alt_number ? true : false) : false}
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
                {<AddOccupationPopup show={showOccupationForm} setShow={openAddOccupationForm} setCallOccuptionApi={setCallOccuptionApi} />}
                <SubCard>
                    <CardHeader
                        title={t('BusniessLabel')}
                        action={
                            <>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Button
                                            disableElevation
                                            size="small"
                                            type="button"
                                            variant="contained"
                                            color="warning"
                                            onClick={openCreateEmployerForm}
                                        >
                                            <label>{t('add_emp')}</label>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            disableElevation
                                            size="small"
                                            type="button"
                                            variant="contained"
                                            color="warning"
                                            onClick={openAddOccupationForm}
                                        >
                                            <label>{t('add_occupation')}</label>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        }
                    />
                    <hr />

                    <Grid container mt={1} spacing={3}>
                        <Grid item xs={12} sm={6} mt={2.5}>
                            <EmployerList
                                disabled={state ? (state.current_employer ? true : false) : false}
                                name="current_employer"
                                createLeadForm={createLeadForm}
                                setCreateLeadForm={setCreateLeadForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel className="label" color="primary">
                                {t('employed_Since')}
                            </InputLabel>
                            <TextField
                                error={formError.employed_since}
                                inputRef={employed_sinceInputRef}
                                disabled={state ? (state.employed_since ? true : false) : false}
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
                            <OccupationsList
                                disabled={state ? (state.occupation_type ? true : false) : false}
                                name="occupation_type"
                                createLeadForm={createLeadForm}
                                setCreateLeadForm={setCreateLeadForm}
                                callOccuptionApi={callOccuptionApi}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                {/* <InputLabel id="employement_select_label">{t('employee_Type')}</InputLabel>
                                <Select labelId="employement_select_label" id="employee" label={t('employee_Type')}></Select> */}
                                <InputLabel className="label" id="employee-label">
                                    {t('employee_Type')} *
                                </InputLabel>
                                <Select
                                    className="label"
                                    label={t('employee_Type')}
                                    error={formError.employee_type}
                                    inputRef={employee_typeInputRef}
                                    disabled={state ? (state.employee_type ? true : false) : false}
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
                                    error={formError.monthly_income}
                                    inputRef={monthly_incomeInputRef}
                                    disabled={state ? (state.monthly_income ? true : false) : false}
                                    type="number"
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
                                    error={formError.total_dependents}
                                    inputRef={total_dependentsInputRef}
                                    disabled={state ? (state.total_dependents ? true : false) : false}
                                    type="number"
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
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
                                    error={formError.existing_loan}
                                    inputRef={existing_loanInputRef}
                                    disabled={state ? (state.existing_loan ? true : false) : false}
                                    type="number"
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
                                    error={formError.monthly_saving}
                                    inputRef={monthly_savingInputRef}
                                    disabled={state ? (state.monthly_saving ? true : false) : false}
                                    type="number"
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
                {/* Address Card  */}
                <SubCard>
                    <CardHeader title={t('address')} />
                    <hr />

                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                                <InputLabel className="label" color="primary">
                                    {t('city')} *
                                </InputLabel>
                                <Select
                                    label={t('city')}
                                    error={formError.city}
                                    inputRef={cityInputRef}
                                    disabled={state ? (state.city ? true : false) : false}
                                    labelId="city-label"
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={onInputChange}
                                >
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
                                error={formError.customer_locality}
                                inputRef={customer_localityInputRef}
                                disabled={state ? (state.customer_locality ? true : false) : false}
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
                                <TextField
                                    error={formError.customer_address}
                                    inputRef={customer_addressInputRef}
                                    disabled={state ? (state.customer_address ? true : false) : false}
                                    required
                                    className="label"
                                    value={customer_address}
                                    name="customer_address"
                                    onChange={onInputChange}
                                    minRows={5}
                                />
                                {/* <TextareaAutosize /> */}
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
                                <label>{t('submit')}</label>
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Box>
            </form>
        </Container>
    );
};

export default LeadCreateForm;
