import React, { useState } from 'react';
import { Info as InfoIcon } from '@mui/icons-material';
import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import {
    Box,
    Typography,
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
} from '@material-ui/core';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AlertDialog from '../../popups/UploadDoc';

function KYCDocumentPage() {
    const { t } = useTranslation();
    const [identificationProof, setIdentificationProof] = useState('');
    const [addressProof, setAddProof] = useState('');
    const [proofOfIncome, setProofOfImcome] = useState('');
    const [open, setOpen] = useState(false);

    const handleChangeIdentiProof = (event) => {
        setIdentificationProof(event.target.value);
        setOpen(true);
    };
    const handleChangeAddProof = (event) => {
        setAddProof(event.target.value);
    };
    const handleChangeProofOfIncome = (event) => {
        setProofOfImcome(event.target.value);
    };

    const handleFileUpload = (event) => {
        // Handle file upload logic here
    };
    const handleSubmit = (event) => {
        alert('Submitted');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            {/* <WebcamCapture /> */}
            {/*For Identification proof */}
            {open && <AlertDialog open={open} />}
            <Grid>
                <MainCard>
                    <Grid container alignItems="center" ml={1} spacing={2}>
                        <Grid item>
                            <Typography variant="h4">Prospect eKYC</Typography>
                        </Grid>
                        <Grid item>
                            <InfoIcon fontSize="small" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">Following documents are required to complete the KYC:</Typography>
                        </Grid>
                    </Grid>
                    <SubCard>
                        <h2>Identification Proof (1)* - Choose any one document</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select any one of Above</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={identificationProof}
                                        label="Select any one of Above"
                                        onChange={handleChangeIdentiProof}
                                    >
                                        <MenuItem value={'NationalId'}>National Id</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Add more document upload fields here if needed */}
                        </Grid>
                    </SubCard>

                    {/*For Address proof */}

                    <SubCard>
                        <h2>Address Proof (3)* - Choose any one document</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select any one of Above</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={addressProof}
                                        label="Select any one of Above"
                                        onChange={handleChangeAddProof}
                                    >
                                        <MenuItem value={'UtilityBill'}>Utility Bill </MenuItem>
                                        <MenuItem value={'Affidavit'}>Affidavit</MenuItem>
                                        <MenuItem value={'BankStatement'}>Bank Statement</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Add more document upload fields here if needed */}
                        </Grid>
                    </SubCard>

                    {/*For Proof of income*/}

                    <SubCard>
                        <h2>Proof of Income (3) * - Choose any one document</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select any one of Above</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={proofOfIncome}
                                        label="Select any one of Above"
                                        onChange={handleChangeProofOfIncome}
                                    >
                                        <MenuItem value={'SalarySlip'}>Salary Slip </MenuItem>
                                        <MenuItem value={'EmployerCertificate'}>Employer Certificate</MenuItem>
                                        <MenuItem value={'BankStatement'}>Bank Statement</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Add more document upload fields here if needed */}
                        </Grid>
                    </SubCard>
                </MainCard>
            </Grid>
        </>
    );
}

export default KYCDocumentPage;
