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
import { decryptData } from '../../../helper/encryption/decrypt';
import GetLeadDocsApi from '../../../apicalls/GetLeadDocs';
import { createData } from '../../../utils/indexDB';

function KYCDocumentPage() {
    const { t } = useTranslation();
    const { mobile_Number } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [open, setOpen] = useState(false);
    const lead_id = state.leadid;
    let [documentVerifiedCount, setDocumentVerifiedCount] = useState(0);
    const [documentTypeData, setDocumentTypeData] = useState(false);
    const [docType, setDocType] = useState(false);
    const [docsItemData, setDocsItemData] = useState('');
    const [salarySlip, setSalarySlip] = useState({
        issued_date: '',
        issued_by: '',
        kyc_front: '',
        kyc_back: '',
        kyc_serial_number: '',
        kyc_valid_till: ''
    });
    const [nationalId, setNationalId] = useState({
        issued_date: '',
        issued_by: '',
        kyc_front: '',
        kyc_back: '',
        kyc_serial_number: '',
        kyc_valid_till: ''
    });
    const [aadharCard, setAadharCard] = useState({
        issued_date: '',
        issued_by: '',
        kyc_front: '',
        kyc_back: '',
        kyc_serial_number: '',
        kyc_valid_till: ''
    });
    const [panCard, setPanCard] = useState({
        issued_date: '',
        issued_by: '',
        kyc_front: '',
        kyc_back: '',
        kyc_serial_number: '',
        kyc_valid_till: ''
    });
    const [passport, setPassport] = useState({
        issued_date: '',
        issued_by: '',
        kyc_front: '',
        kyc_back: '',
        kyc_serial_number: '',
        kyc_valid_till: ''
    });
    const [nullHandel, setNullHandel] = useState({
        issued_date: '',
        issued_by: '',
        kyc_front: '',
        kyc_back: '',
        kyc_serial_number: '',
        kyc_valid_till: ''
    });
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }
    const handleAddButton = (_itemData, type) => {
        setOpen(true);
        setDocsItemData(_itemData);
    };
    useEffect(() => {
        const decrypted_mob = decryptData(mobile_Number);

        if (!state) {
            navigate('/lead/verify-phonenumber');
            return toast.error('You can not direct authorized this page');
        } else if (decrypted_mob === state.ph_number) {
            get_lead_detail_api(lead_id);
        } else {
            return toast.error('You are not authorized this page');
        }
        if (!lead_id) {
            return toast.error('You can not authorized this page');
        }
    }, [open]);

    async function handleCreateInIndexDb(newData) {
        await createData(newData);
      }
    const get_lead_detail_api = (lead_id) => {
        GetLeadDetailsApi(lead_id, token).then((res) => {
            if (res) {
                handleCreateInIndexDb(res.data)
                const data = res.data.ekyc_document;
                setDocumentTypeData(data);

                for (let document in data) {
                    const doclist = data[document].document_list;

                    for (let docItem in doclist) {
                        if (doclist[docItem].document_slug === 'aadhar_card' || doclist[docItem].document_slug === 'passport') {
                            if (doclist[docItem].kyc_front) {
                                console.log('aadhar_card');
                                setDocumentVerifiedCount(1 + documentVerifiedCount);
                            }
                        }
                        if (doclist[docItem].document_slug === 'national_id') {
                            if (doclist[docItem].kyc_front) {
                                console.log('national_id');
                                setDocumentVerifiedCount(2 + documentVerifiedCount);
                            }
                        }
                        if (doclist[docItem].document_slug === 'salary_slip') {
                            if (doclist[docItem].kyc_front) {
                                setDocumentVerifiedCount(3 + documentVerifiedCount);
                            }
                        }
                    }
                }
            }
        });
    };
    const gotoEligibleDevice = () => {
        return navigate(`/eligibledevices/${encodeURIComponent(mobile_Number)}`, {
            state: { ph_number: state.ph_number, leadid: lead_id }
        });
    };
    // LeadCreateFormApi
    return (
        <>
            <ViewKYCDetails
                docsItemData={docsItemData}
                lead_id={lead_id}
                open={open}
                setOpen={setOpen}
                setDataFunc={
                    docType === 'aadhar_card'
                        ? setAadharCard
                        : docType === 'pan_card'
                            ? setPanCard
                            : docType === 'passport'
                                ? setNationalId
                                : docType === 'national_id'
                                    ? setPassport
                                    : docType === 'salary_slip'
                                        ? setSalarySlip
                                        : setNullHandel // Use null or any other default value if needed
                }
                dataDocuments={
                    docType === 'aadhar_card'
                        ? aadharCard
                        : docType === 'pan_card'
                            ? panCard
                            : docType === 'passport'
                                ? nationalId
                                : docType === 'national_id'
                                    ? passport
                                    : docType === 'salary_slip'
                                        ? salarySlip
                                        : nullHandel // Use null or any other default value if needed
                }
            />
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
                    {documentTypeData && documentTypeData.length > 0
                        ? documentTypeData.map((item) => (
                            <>
                                <SubCard>
                                    <>
                                        <h3>
                                            {item.label} {t('require_1_doc')}
                                        </h3>
                                    </>
                                    {item.document_list &&
                                        item.document_list.length > 0 &&
                                        item.document_list.map((itemData) => (
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
                                                                htmlColor={itemData.kyc_front ? 'green' : 'inherit'}
                                                            />
                                                        }
                                                        title={itemData.kyc_front ? 'Verified' : 'Verify'}
                                                    />
                                                    <Button
                                                        size="large"
                                                        color="primary"
                                                        onClick={() => handleAddButton(itemData, itemData.document_slug)}
                                                        startIcon={
                                                            itemData.kyc_front ? (
                                                                <VisibilityTwoToneIcon style={{ fontSize: 35, color: 'pink' }} />
                                                            ) : (
                                                                <AddCircleOutlineOutlinedIcon style={{ fontSize: 35, color: 'violet' }} />
                                                            )
                                                        }
                                                    ></Button>
                                                </Grid>
                                            </Grid>
                                        ))}
                                </SubCard>
                            </>
                        ))
                        : ''}
                    {documentVerifiedCount + '  documentVerifiedCount'}
                    {documentVerifiedCount >= 2 ? (
                        <>
                            <Button onClick={gotoEligibleDevice} size="small" type="button" variant="contained" color="warning">
                                <label>{t('go_to_devices')}</label>
                            </Button>
                        </>
                    ) : (
                        ''
                    )}
                </MainCard>
            </Grid>
        </>
    );
}

export default KYCDocumentPage;
