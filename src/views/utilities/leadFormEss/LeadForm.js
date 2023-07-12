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

const RegisterForm = () => {
    const [selectTittleValue, setselectTittleValue] = useState('');
    const [anchorEl, setAnchorEl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [sex, setSex] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [edu, setEducation] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [whatsappNo, setWhatsappNo] = useState('');
    const [countryCode, setCountryCode] = useState('IN');
    const [alterName, setalterName] = useState('');
    const [relation, setRelationStatus] = useState('');
    const [localPhoneNo, setLocalPhoneNo] = useState('');
    const [cureentEmployer, setCureentEmployer] = useState('');
    const [employeeSince, setemployeeSince] = useState('');
    const [occupation, setOccupation] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [incomeMonthly, setIncomeMonthly] = useState('');
    const [dependents, setDependents] = useState('');
    const [existingLoan, setExistingLoan] = useState('');
    const [saving, setSaving] = useState('');
    const [city, setCity] = useState('');
    const [locality, setLocality] = useState('');
    const [currentAdd, setCurrentAdd] = useState('');

    const [dateOfBirth, setDateOfBirth] = useState('');
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const handleTittleClick = (event) => {
        setAnchorEl(event.target.value);
        setOpen(true);
    };

    const handleSexValue = (event) => {
        setSex(event.target.value);
    };
    const handleMaritalStatus = (event) => {
        setMaritalStatus(event.target.value);
    };
    const handleEducation = (event) => {
        setEducation(event.target.value);
    };
    const handleMobileNumberChange = (phoneNumber) => {
        setMobileNumber(phoneNumber);
    };
    const handleRelationStatus = (event) => {
        setRelationStatus(event.target.value);
    };
    const handleOccupationChange = (event) => {
        setOccupation(event.target.value);
    };
    const handleEmployeeTypeChange = (event) => {
        setEmployeeType(event.target.value);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleCureentEmployer = (event) => {
        setCureentEmployer(event.target.value);
    };

    const handleSubmit = () => {
        console.log(anchorEl);
        console.log(firstName);
        console.log(middleName);
        console.log(lastName);
        console.log(sex);
        console.log(dateOfBirth);
        console.log(maritalStatus);
        console.log(mobileNumber);
        console.log(email);
        // console.log(countryCode);
        console.log(alterName);
        console.log(relation);
        console.log(employeeSince);
        console.log(occupation);
        console.log(employeeType);
        console.log(incomeMonthly);
        console.log(dependents);
        console.log(existingLoan);
        console.log(saving);
        console.log(city);
        console.log(locality);
        console.log(currentAdd);
    };
    return (
        <Container maxWidth="md">
            <form>
                <MainCard className="maincard" title={t('Register_Form')}>
                    <Grid container justifyContent="end" alignItems="end" marginTop={-10}>
                        <UploadProfilePhoto />
                    </Grid>
                </MainCard>

                <SubCard>
                    <h3>Personal Details</h3>
                    <Stack spacing={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel className="label" id="tittle-label">
                                        Title
                                    </InputLabel>
                                    <Select labelId="tittle-label" id="tittle" value={anchorEl} onChange={handleTittleClick}>
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
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
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
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
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
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                                    <RadioGroup aria-label="gender" name="gender" value={sex} onChange={handleSexValue}>
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
                                    color="secondary"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
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
                                        value={maritalStatus}
                                        onChange={handleMaritalStatus}
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
                                    <Select labelId="education-label" id="education" value={edu} onChange={handleEducation}>
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
                                value={mobileNumber}
                                onChange={handleMobileNumberChange}
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
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="error" />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={whatsappNo}
                                onChange={(e) => setWhatsappNo(e.target.value)}
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
                                value={alterName}
                                onChange={(e) => setalterName(e.target.value)}
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
                                    value={relation}
                                    onChange={handleRelationStatus}
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
                                value={localPhoneNo}
                                onChange={(e) => setLocalPhoneNo(e.target.value)}
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
                                    value={cureentEmployer}
                                    onChange={handleCureentEmployer}
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
                                value={employeeSince}
                                onChange={(e) => setemployeeSince(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel className="label" id="occupation-label">
                                    Occupation
                                </InputLabel>
                                <Select labelId="occupation-label" id="occupation" value={occupation} onChange={handleOccupationChange}>
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
                                <Select labelId="occupation-label" id="occupation" value={employeeType} onChange={handleEmployeeTypeChange}>
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
                                        value={incomeMonthly}
                                        onChange={(e) => setIncomeMonthly(e.target.value)}
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
                                        value={dependents}
                                        onChange={(e) => setDependents(e.target.value)}
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
                                        value={existingLoan}
                                        onChange={(e) => setExistingLoan(e.target.value)}
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
                                        value={saving}
                                        onChange={(e) => setSaving(e.target.value)}
                                    />
                                </Grid>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
                <SubCard>
                    <h3>Business / Employment Information</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                                <InputLabel className="label" color="primary">
                                    <b>City*</b>
                                </InputLabel>
                                <Select labelId="occupation-label" id="occupation" value={city} onChange={handleCityChange}>
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
                                onChange={(e) => setLocality(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <InputLabel className="label" color="primary">
                                <b>Current Address*</b>
                            </InputLabel>
                            <FormControl mt={1} fullWidth>
                                <TextareaAutosize required value={currentAdd} onChange={(e) => setCurrentAdd(e.target.value)} minRows={5} />
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

export default RegisterForm;
