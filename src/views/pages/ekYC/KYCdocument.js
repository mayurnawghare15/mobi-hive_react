import React, { useState } from 'react';
import { Info as InfoIcon } from '@mui/icons-material';
import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WebcamCapture from '../../../components/webcamComp/WebcamCapture';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from '@mui/material';
import ViewKYCDetails from '../../../components/ViewKYCDetails';
import { useEffect } from 'react';
import LeadCreateFormApi from '../../../apicalls/LeadCreateFormApi';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { toast } from 'react-toastify';
import GetLeadDetailsApi from '../../../apicalls/GetLeadDetailsApi';

function KYCDocumentPage() {
    const { t } = useTranslation();
    const [identificationProof, setIdentificationProof] = useState('');
    const [addressProof, setAddProof] = useState('');
    const [proofOfIncome, setProofOfImcome] = useState('');
    const [open, setOpen] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [documentType, setDocumentType] = useState(false);
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }

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
    const handleAdd = (type) => {
        setDocumentType(type)
        setOpen(true);
        if (isAdded) {
        } else {
            console.log('Default onClick for isAdded false');

            // setIsAdded(true);
        }
    };

    useEffect(() => {
        const lead_id = 472
        GetLeadDetailsApi(lead_id, token)
            .then((res) => {
                if (res) {
                    console.log(res.data.ekyc_document, '---Lead Data  ---');
                } else {
                    // setIsLoading(false)
                    // setCreateLeadForm([])
                }
            })
            .catch((error) => {
                return toast.error('Something went wrong , Please check your internet connection.');
            });
    }, [])


    // LeadCreateFormApi

    return (
        <>
            <WebcamCapture />
            {/*For Identification proof */}
            <Grid>
                <MainCard>
                    <Grid container alignItems="center" ml={1} spacing={2}>
                        <Grid item>
                            <Typography variant="h1">{t('prospect_eKYC')}</Typography>
                        </Grid>
                        <Grid item>
                            <InfoIcon fontSize="small" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">{t('following_documents_are_required_to_complete_the_KYC:')}</Typography>
                        </Grid>
                    </Grid>
                    <SubCard>
                        <h3>{t('identification_Proof_(1)*-Choose_any_one_document')}</h3>
                        <Grid ml={2} mt={3} container alignItems="center">
                            <Grid item xs={8}>
                                <h4>{t('national_ID')}</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    startIcon={
                                        <CheckCircleOutlineTwoToneIcon
                                            style={{ fontSize: 35 }}
                                            htmlColor={isVerified ? 'green' : 'inherit'}
                                        />
                                    }
                                    title={isVerified ? 'Verified' : 'Verify'}
                                />
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={() => handleAdd("national_id")}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ fontSize: 35, color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ fontSize: 35, color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                    {/*For Address proof */}

                    <SubCard>
                        <h2>{t('address_Proof(3)*-Choose_any_one_document')}</h2>
                        <Grid ml={2} mt={3} container alignItems="center">
                            <Grid item xs={8}>
                                <h4>{t('utility_Bill')}</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    startIcon={
                                        <CheckCircleOutlineTwoToneIcon
                                            style={{ fontSize: 35 }}
                                            htmlColor={isVerified ? 'green' : 'inherit'}
                                        />
                                    }
                                    title={isVerified ? 'Verified' : 'Verify'}
                                />
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ fontSize: 35, color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ fontSize: 35, color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>

                            <Grid item xs={8}>
                                <h4>{t('affidavit')}</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    startIcon={
                                        <CheckCircleOutlineTwoToneIcon
                                            style={{ fontSize: 35 }}
                                            htmlColor={isVerified ? 'green' : 'inherit'}
                                        />
                                    }
                                    title={isVerified ? 'Verified' : 'Verify'}
                                />
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ fontSize: 35, color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ fontSize: 35, color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>

                            <Grid item xs={8}>
                                <h4>{t('bank_Statement')}</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    startIcon={
                                        <CheckCircleOutlineTwoToneIcon
                                            style={{ fontSize: 35 }}
                                            htmlColor={isVerified ? 'green' : 'inherit'}
                                        />
                                    }
                                    title={isVerified ? 'Verified' : 'Verify'}
                                />
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ fontSize: 35, color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ fontSize: 35, color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>
                        </Grid>
                    </SubCard>

                    {/*For Proof of income*/}

                    <SubCard>
                        <h2>{t('proof_of_income(3)*-Choose_any_one_document')}</h2>
                        <Grid ml={2} mt={3} container alignItems="center">
                            <Grid item xs={8}>
                                <h4>{t('salary_Slip')}</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    startIcon={
                                        <CheckCircleOutlineTwoToneIcon
                                            style={{ fontSize: 35 }}
                                            htmlColor={isVerified ? 'green' : 'inherit'}
                                        />
                                    }
                                    title={isVerified ? 'Verified' : 'Verify'}
                                />
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ fontSize: 35, color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ fontSize: 35, color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>

                            <Grid item xs={8}>
                                <h4>{t('employer_Certificate')}</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    startIcon={
                                        <CheckCircleOutlineTwoToneIcon
                                            style={{ fontSize: 35 }}
                                            htmlColor={isVerified ? 'green' : 'inherit'}
                                        />
                                    }
                                    title={isVerified ? 'Verified' : 'Verify'}
                                />
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ fontSize: 35, color: 'pink' }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ fontSize: 35, color: 'violet' }} />
                                        )
                                    }
                                ></Button>
                            </Grid>

                            <Grid item xs={8}>
                                <h4>{t('bank_Statement')}</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="large"
                                    color="primary"
                                    startIcon={
                                        <CheckCircleOutlineTwoToneIcon
                                            style={{ fontSize: 35 }}
                                            htmlColor={isVerified ? 'green' : 'inherit'}
                                        />
                                    }
                                    title={isVerified ? 'Verified' : 'Verify'}
                                />
                                <Button
                                    size="large"
                                    color="primary"
                                    onClick={handleAdd}
                                    startIcon={
                                        isAdded ? (
                                            <VisibilityTwoToneIcon style={{ color: 'pink', fontSize: 35 }} />
                                        ) : (
                                            <AddCircleOutlineOutlinedIcon style={{ color: 'violet', fontSize: 35 }} />
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
