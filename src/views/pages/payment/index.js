import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Card, Container, Typography, Grid, Collapse, CardHeader, IconButton } from '@mui/material';
import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import PhotoOfDevice from '../orderSumary/PhotoOfDevice';
import DeviceInfo from '../orderSumary/DeviceInfo';
import LeadIDCard from '../orderSumary/LeadIDCard';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import PaymentReceipt from './PaymentReceipt';
import PackageCard from '../orderSumary/FixedPackageCard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GetLeadDetailsApi from '../../../apicalls/GetLeadDetailsApi';
import GetLeadSaleOrder from '../../../apicalls/GetLeadSaleOrderAPI';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    card: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        marginBottom: theme.spacing(2),
        height: '100%'
    },
    photoContainer: {
        border: '3px solid #483285',
        // height: '100%',
        maxHeight: '100vh',
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    CollapseCard: {
        border: '3px solid #483285',
        height: 'auto',
    },
    hr: {
        margin: theme.spacing(0.5, 0),
        marginTop: theme.spacing(3),
        borderColor: theme.palette.primary.main,
        borderWidth: 3,
        borderRadius: 5
    },
}));

const Payment = () => {
    const location = useLocation();
    const { state } = location;
    const { t } = useTranslation();
    const classes = useStyles();
    const { user } = useAuthContext();
    const token = user ? user.token : null;
    const leadid = state.leadid;
    const packageInfo = state.packageInfo;
    const saleData = state.saleData;
    const [prospectData, setProspectData] = useState({});
    const [saleOrderData, setSaleOrderData] = useState({});
    console.log(leadid);
    console.log(prospectData);
    console.log(saleOrderData[0]);




    useEffect(() => {
        fetchLeadData(leadid, token);
    }, []);

    async function fetchLeadData(leadid, token) {
        try {
            const res = await GetLeadDetailsApi(token, leadid);
            setProspectData(res);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
        try {
            const res = await GetLeadSaleOrder(token, leadid);
            setSaleOrderData(res);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    const [leadCardExpanded, setLeadCardExpanded] = useState(false);
    const [packageCardExpanded, setPackageCardExpanded] = useState(false);


    return (
        <>
            <Grid item xs={12} md={12}>
                <Typography variant="h2" className={classes.heading}>
                    {t('Payment')}
                </Typography>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} mt={2}>
                    <Card className={classes.photoContainer}>
                        {saleOrderData[0] ? (
                            <>
                                <PhotoOfDevice deviceData={saleOrderData[0]} />
                                <hr className={classes.hr} />
                                <DeviceInfo deviceData={saleData} />
                            </>
                        ) : (
                            <LoadingSkeleton />
                        )}
                    </Card>

                </Grid>

                <Grid item xs={12} sm={6}>
                    <SubCard className={classes.CollapseCard}>
                        <CardHeader
                            onClick={() => setLeadCardExpanded(!leadCardExpanded)}
                            style={{ cursor: 'pointer' }}
                            title="Lead ID Card"
                            action={
                                <IconButton
                                    onClick={() => setLeadCardExpanded(!leadCardExpanded)}
                                    aria-label="expand"
                                    size="small"
                                >
                                    {leadCardExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            }
                        />
                        <Collapse in={leadCardExpanded} unmountOnExit>
                            {prospectData ? <LeadIDCard leadInfo={prospectData} /> : <LoadingSkeleton />}
                        </Collapse>
                        <hr className={classes.hr} />
                        <CardHeader
                            onClick={() => setPackageCardExpanded(!packageCardExpanded)}
                            style={{ marginTop: "15px", cursor: 'pointer' }}
                            title="Package information"
                            action={
                                <IconButton
                                    onClick={() => setPackageCardExpanded(!packageCardExpanded)}
                                    aria-label="expand"
                                    size="small"
                                >
                                    {packageCardExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            }
                        />
                        <Collapse in={packageCardExpanded} unmountOnExit>
                            {packageInfo ? <PackageCard packageInfo={packageInfo} /> : <LoadingSkeleton />}
                        </Collapse>
                    </SubCard>
                    <PaymentReceipt saleOrderData={saleOrderData} />
                </Grid>
            </Grid>
        </>
    );
};

export default Payment;
