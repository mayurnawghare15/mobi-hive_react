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
import { useLocation, useNavigate, useParams } from 'react-router';

function KYCDocumentPage() {
    const { t } = useTranslation();
    const { mobile_Number } = useParams();
    const navigate = useNavigate();
    const
    const [open, setOpen] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [documentTypeData, setDocumentTypeData] = useState(false);
    const [docType, setDocType] = useState(false);
    const [showFrontDoc, setShowFrontDoc] = useState(false);
    const [showbackDoc, setShowbackDoc] = useState(false);
    const [showValidTill, setShowValidTill] = useState(false);
    const [showSerialNumber, setShowSerialNumber] = useState(false);
    const [salarySlip, setSalarySlip] = useState({ issued_date: "", issued_by: "", kyc_front: "", kyc_back: "", kyc_serial_number: "", kyc_valid_till: "" })
    const [nationalId, setNationalId] = useState({ issued_date: "", issued_by: "", kyc_front: "", kyc_back: "", kyc_serial_number: "", kyc_valid_till: "" })
    const [drivingLicence, setDrivingLicence] = useState({ issued_date: "", issued_by: "", kyc_front: "", kyc_back: "", kyc_serial_number: "", kyc_valid_till: "" })
    const [panCard, setPanCard] = useState({ issued_date: "", issued_by: "", kyc_front: "", kyc_back: "", kyc_serial_number: "", kyc_valid_till: "" })
    const [passport, setPassport] = useState({ issued_date: "", issued_by: "", kyc_front: "", kyc_back: "", kyc_serial_number: "", kyc_valid_till: "" })
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }

    const handleVerify = () => {
        setIsVerified(true);
    };
    const handleAddButton = (type, front, back, validtill, serialNo) => {
        setShowFrontDoc(front)
        setShowbackDoc(back)
        setDocType(type)
        setShowSerialNumber(validtill)
        setShowValidTill(serialNo)
        setOpen(true);
        if (isAdded) {
        } else {
            console.log('Default onClick for isAdded false');

            // setIsAdded(true);
        }
    };

    useEffect(() => {
        if (!state) {
            navigate('/lead/verify-phonenumber')
            return toast.error('You can not direct authorized this page');
        } else if (mobile_Number === state.ph_number) {
            // if (state) setCreateLeadForm(state);
        } else {
            return toast.error('You are not authorized this page');
        }

        const lead_id = 472
        GetLeadDetailsApi(lead_id, token)
            .then((res) => {
                if (res) {
                    console.log(res.data.ekyc_document, '---Lead Data  ---');
                    setDocumentTypeData(res.data.ekyc_document)
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
            <ViewKYCDetails open={open} setOpen={setOpen}
                showFrontSide={showFrontDoc} showBackSide={showbackDoc}
                slug={docType}
                dataDocuments={docType === "aadhar_card" ?
                    drivingLicence : docType === "pan_card" ?
                        panCard : docType === "passport" ?
                            nationalId : docType === "national_id" ?
                                passport : docType === "salary_slip" ? salarySlip : ""}

                updateDataDocumentsFunc={docType === "aadhar_card" ?
                    setDrivingLicence : docType === "pan_card" ?
                        setPanCard : docType === "passport" ?
                            setNationalId : docType === "national_id" ?
                                setPassport : docType === "salary_slip" ? setSalarySlip : ""}

                showValidTill={showValidTill}
                showSerialNumber={showSerialNumber} />
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
                    {documentTypeData && documentTypeData.length > 0 ? documentTypeData.map(item => (
                        <>
                            <SubCard>
                                <>
                                    <h3>{item.label} {item.count} </h3>
                                </>
                                {item.document_list && item.document_list.length > 0 &&
                                    item.document_list.map(itemData => (
                                        <Grid ml={2} mt={3} container alignItems="center">
                                            <Grid item xs={8}>
                                                <h4>{itemData.document_type} </h4>
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
                                                    onClick={() => handleAddButton(itemData.document_slug, itemData.req_front, itemData.req_back, itemData.req_serial_number, itemData.req_valid_till)}
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
                                    ))


                                }
                            </SubCard>
                        </>
                    ))
                        : ""
                    }


                </MainCard>
            </Grid>
        </>
    );
}

export default KYCDocumentPage;
