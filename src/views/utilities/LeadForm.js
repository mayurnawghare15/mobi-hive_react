import React, { useState } from 'react';
import { TextField, Button, Container, Stack, MenuItem, Menu } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import MainCard from '../../ui-component/cards/MainCard';
import SubCard from '../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, Radio, RadioGroup, Select } from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';

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
    const [countryCode, setCountryCode] = useState('IN');
    const [alterName, setalterName] = useState('');
    const [relation, setRelationStatus] = useState('');

    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const handleTittleClick = (event) => {
        setAnchorEl(event.target.value);
        setOpen(true);
    };

    const handleTittleClose = (value) => {
        setAnchorEl(null);
        setOpen(false);
        setselectTittleValue(value);
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
    const handleEmailChange = (phoneNumber) => {
        setMobileNumber(phoneNumber);
    };
    const handleRelationStatus = (phoneNumber) => {
        setMobileNumber(phoneNumber);
    };

    console.log(selectTittleValue);
    console.log(firstName);
    console.log(middleName);
    console.log(lastName);
    console.log(sex);
    console.log(dateOfBirth);
    console.log(maritalStatus);
    console.log(edu);

    const handleSubmit = () => {};
    return (
        <Container maxWidth="md">
            <form onSubmit={handleSubmit} action={<Link to="/" />}>
                <MainCard title={t('Register_Form')} />
                <SubCard>
                    <h3>Personal Details</h3>
                    <Stack spacing={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="tittle-label">Title</InputLabel>
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
                                    type="text"
                                    variant="outlined"
                                    color="secondary"
                                    label="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
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
                                    <FormLabel component="legend">Gender</FormLabel>
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
                                    <InputLabel id="marital-status-label">Marital Status</InputLabel>
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
                                    <InputLabel id="education-label">Highest Education</InputLabel>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                <InputLabel id="relation-status-label">Marital Status</InputLabel>
                                <Select
                                    labelId="relation-status-label"
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
                                label="Phone Number Local"
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </SubCard>
                {/* Business / Employment Information-------------------------- */}
                <SubCard>
                    <h3>Business / Employment Information</h3>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={8}>
                            <TextField
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
                                <InputLabel id="relation-status-label">Marital Status</InputLabel>
                                <Select
                                    labelId="relation-status-label"
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
                    </Grid>
                </SubCard>
            </form>
        </Container>
    );
};

export default RegisterForm;
