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
    const [countryCode, setCountryCode] = useState("")
    const [createLeadForm, setCreateLeadForm] = useState({
        photo: "",
        saluation: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        marital_status: "",
        highest_education: "",
        ph_number: "",
        email: "",
        whatsapp_number: "",
        alt_number_name: "",
        alt_number_relation: "",
        alt_number: "",
        current_employer: "",
        employed_since: "",
        occupation_sector: "",
        employee_type: "",
        monthly_income: "",
        total_dependents: "",
        monthly_saving: "",
        current_address: '',
        city: "",
        locality: "",
        existing_loan:""
    })
    const { photo, saluation, first_name, last_name, gender, middle_name, date_of_birth, marital_status,
        highest_education, ph_number, email, whatsapp_number, alt_number_name, alt_number,
        alt_number_relation, current_employer, employed_since, occupation_sector, employee_type, monthly_income,
        total_dependents, monthly_saving, current_address, city, locality,existing_loan } = createLeadForm;
    const onInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCreateLeadForm({
            ...createLeadForm,
            [name]: value
        })
    }

    const handleSubmit = () => {

    }
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
                                        Title
                                    </InputLabel>
                                    <Select labelId="tittle-label" id="tittle" value={saluation} onChange={onInputChange}>
                                        <MenuItem value={'Mr'}>Mr</MenuItem>
                                        <MenuItem value={'Mrs'}>Mrs</MenuItem>
                                        <MenuItem value={'Miss'}>Miss</MenuItem>
                                        <MenuItem value={'Master'}>Master</MenuItem>
                                        <MenuItem value={'Dr'}>Dr</MenuItem>
                                        <MenuItem value={'Er'}>Er</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    className="textfield"
                                    type="text"
                                    variant="outlined"
                                    label="First Name"
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
                                    label="Middle Name"
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
                                    label="Last Name"
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
                                        Gender
                                    </FormLabel>
                                    <RadioGroup aria-label="gender" name="gender" value={gender} onChange={onInputChange}>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} ml={-2}>
                                <InputLabel>Date of Birth</InputLabel>
                                <TextField
                                    className="textfield"
                                    type="date"
                                    variant="outlined"
                                    name="date_of_birth"
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
                                        Marital Status
                                    </InputLabel>
                                    <Select
                                        labelId="marital-status-label"
                                        id="marital-status"
                                        value={marital_status}
                                        name="marital_status"
                                        onChange={onInputChange}
                                    >
                                        <MenuItem value="Single / Never Married">Single / Never Married</MenuItem>
                                        <MenuItem value="Married">Married</MenuItem>
                                        <MenuItem value="Divorced">Divorced</MenuItem>
                                        <MenuItem value="Seprated">Seprated</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} mt={2.5}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="education-label">
                                        Highest Education
                                    </InputLabel>
                                    <Select labelId="education-label" id="education" name="highest_education" value={highest_education} onChange={onInputChange}>
                                        <MenuItem value="Primary">Primary</MenuItem>
                                        <MenuItem value="Secondary">Secondary</MenuItem>
                                        <MenuItem value="Bachelors / Graduate">Bachelors / Graduate</MenuItem>
                                        <MenuItem value="Post-Graduate / Masters">Post-Graduate / Masters</MenuItem>
                                        <MenuItem value="PhD / Doctorate">PhD / Doctorate</MenuItem>
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
                                label="Mobile Number"
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
                                label="E-Mail"
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
                                label="Whatsapp"
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
                                label="Name"
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
                                    Relation
                                </InputLabel>
                                <Select
                                    labelId="relation-status-label"
                                    variant="outlined"
                                    id="relation-status"
                                    value={alt_number_relation}
                                    name="alt_number_relation"
                                    onChange={onInputChange}
                                >
                                    <MenuItem value="Father">Father</MenuItem>
                                    <MenuItem value="Mother">Mother</MenuItem>
                                    <MenuItem value="Son">Son</MenuItem>
                                    <MenuItem value="Wife">Wife</MenuItem>
                                    <MenuItem value="Husband">Husband</MenuItem>
                                    <MenuItem value="Brother">Brother</MenuItem>
                                    <MenuItem value="Friend">Friend</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className="textfield"
                                label="Local Phone Number"
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
                    <h3>Business / Employment Information</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8} mt={2.5}>
                            <FormControl fullWidth>
                                <InputLabel className="label" id="relation-status-label">
                                    Current Employer
                                </InputLabel>
                                <Select
                                    labelId="relation-status-label"
                                    id="relation-status"
                                    value={current_employer}
                                    name="current_employer"
                                    onChange={onInputChange}
                                >
                                    <MenuItem value="Father">Father</MenuItem>
                                    <MenuItem value="Mother">Mother</MenuItem>
                                    <MenuItem value="Son">Son</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel className="label" color="primary">
                                <b>Employed Since</b>
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
                                    Occupation
                                </InputLabel>
                                <Select labelId="occupation-label" name="occupation" value={occupation_sector} onChange={onInputChange}>
                                    <MenuItem value="Engineer">Engineer</MenuItem>
                                    <MenuItem value="Doctor">Doctor</MenuItem>
                                    <MenuItem value="Teacher">Teacher</MenuItem>
                                    <MenuItem value="Lawyer">Lawyer</MenuItem>
                                    {/* Add more occupation options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel className="label" id="Employee-label">
                                    Employee Type
                                </InputLabel>
                                <Select labelId="occupation-label" id="occupation" value={employee_type} onChange={onInputChange}>
                                    <MenuItem value="Full Time">Full Time</MenuItem>
                                    <MenuItem value="Doctor">Part Time</MenuItem>
                                    <MenuItem value="Part Time">Freelancer</MenuItem>
                                    <MenuItem value="Self Employed">Self Employed</MenuItem>
                                    {/* Add more occupation options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="outlined-adornment-amount">
                                    Income Monthly*
                                </InputLabel>
                                <Grid mt={1}>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                        value={monthly_income}
                                        name="monthly_income"
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="outlined-adornment-amount">
                                    Total Dependent(s)*
                                </InputLabel>
                                <Grid mt={1}>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                                        label="Amount"
                                        value={total_dependents}
                                        name="total_dependents"
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="outlined-adornment-amount">
                                    Existing Loan*
                                </InputLabel>
                                <Grid mt={1}>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                        value={existing_loan}
                                        name="existing_loan"
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel className="label" htmlFor="outlined-adornment-amount">
                                    Monthly saving*
                                </InputLabel>
                                <Grid mt={1}>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                        value={monthly_saving}
                                        name="monthly_saving"
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
                <SubCard>
                    <h3>Current Address</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                                <InputLabel className="label" color="primary">
                                    <b>City*</b>
                                </InputLabel>
                                <Select labelId="occupation-label" id="occupation" name="city" value={city} onChange={onInputChange}>
                                    <MenuItem value="Engineer">Engineer</MenuItem>
                                    <MenuItem value="Doctor">Doctor</MenuItem>
                                    <MenuItem value="Teacher">Teacher</MenuItem>
                                    <MenuItem value="Lawyer">Lawyer</MenuItem>
                                    {/* Add more occupation options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className="textfield"
                                label="Customer Locality*"
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
                                <b>Current Address*</b>
                            </InputLabel>
                            <FormControl mt={1} fullWidth>
                                <TextareaAutosize required value={current_address} name="cuurent_address" onChange={onInputChange} minRows={5} />
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
