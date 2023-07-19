import React, { useState } from 'react';
import { Info as InfoIcon, Label } from '@mui/icons-material';
import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import WebcamCapture from '../../../components/webcamComp/WebcamCapture';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Card, CardContent, IconButton } from '@mui/material';

function KYCDocumentPage() {
    const { t } = useTranslation();
    const [identificationProof, setIdentificationProof] = useState('');
    const [addressProof, setAddProof] = useState('');
    const [proofOfIncome, setProofOfImcome] = useState('');
    const [open, setOpen] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

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
    const handleVerify = () => {
        setIsVerified(true);
    };
    const handleAdd = () => {
        if (isAdded) {
            setOpen(true);
        } else {
            console.log('Default onClick for isAdded false');

            setIsAdded(true);
        }
    };

    return (
        <>
            <WebcamCapture open={open} setOpen={setOpen} />
            {/*For Identification proof */}
            <Grid>
                <MainCard>
                    <Grid container alignItems="center" ml={1} spacing={2}>
                        <Grid item>
                            <Typography variant="h1">Prospect eKYC</Typography>
                        </Grid>
                        <Grid item>
                            <InfoIcon fontSize="small" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">Following documents are required to complete the KYC:</Typography>
                        </Grid>
                    </Grid>
                    <SubCard>
                        <h3>Identification Proof (1)* - Choose any one document</h3>
                        <Grid ml={2} mt={3} container alignItems="center">
                            <Grid item xs={8}>
                                <h4>National ID</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleVerify}
                                    startIcon={isVerified ? <CheckCircleOutlineTwoToneIcon color="success" /> : null}
                                >
                                    Verify
                                </Button>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>
                        </Grid>
                    </SubCard>

                    {/*For Address proof */}

                    <SubCard>
                        <h2>Address Proof (3)* - Choose any one document</h2>
                        <Grid ml={2} mt={3} container alignItems="center">
                            <Grid item xs={8}>
                                <h4>Utility Bill</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleVerify}
                                    startIcon={isVerified ? <CheckCircleOutlineTwoToneIcon color="success" /> : null}
                                >
                                    Verify
                                </Button>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>

                            <Grid item xs={8}>
                                <h4>Affidavit</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleVerify}
                                    startIcon={isVerified ? <CheckCircleOutlineTwoToneIcon color="success" /> : null}
                                >
                                    Verify
                                </Button>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>

                            <Grid item xs={8}>
                                <h4>Bank Statement</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleVerify}
                                    startIcon={isVerified ? <CheckCircleOutlineTwoToneIcon color="success" /> : null}
                                >
                                    Verify
                                </Button>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>
                        </Grid>
                    </SubCard>

                    {/*For Proof of income*/}

                    <SubCard>
                        <h2>Proof of Income (3) * - Choose any one document</h2>
                        <Grid ml={2} mt={3} container alignItems="center">
                            <Grid item xs={8}>
                                <h4>Salary Slip</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleVerify}
                                    startIcon={isVerified ? <CheckCircleOutlineTwoToneIcon color="success" /> : null}
                                >
                                    Verify
                                </Button>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>

                            <Grid item xs={8}>
                                <h4>Employer Certificate</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleVerify}
                                    startIcon={isVerified ? <CheckCircleOutlineTwoToneIcon color="success" /> : null}
                                >
                                    Verify
                                </Button>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>

                            <Grid item xs={8}>
                                <h4>Bank Statement</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleVerify}
                                    startIcon={isVerified ? <CheckCircleOutlineTwoToneIcon color="success" /> : null}
                                >
                                    Verify
                                </Button>
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </MainCard>
            </Grid>
        </>
    );
}

export default KYCDocumentPage;
