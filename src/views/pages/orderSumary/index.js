import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Card, Container, Typography, Grid } from '@mui/material';
import LeadIDCard from './LeadIDCard';
import PackageCard from './PackageCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import GetLeadSaleOrderAPI from '../../../apicalls/GetLeadSaleOrderAPI';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import PhotoOfDevice from './PhotoOfDevice';
import PaymentTermsCard from './PaymentTermsCard';
import DeviceInfo from './DeviceInfo';
import LoadingSkeleton from '../../../components/LoadingSkeleton';

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
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    photoContainer: {
        height: '100%',
        width: '100%',
        marginBottom: theme.spacing(2)
    }
}));

const OrderSummaryPage = () => {
    const location = useLocation();
    const { state } = location;
    const deviceId = state.deviceId;
    const { t } = useTranslation();
    const classes = useStyles();

    const [saleData, setSaleData] = useState(null);
    const { user } = useAuthContext();
    const token = user ? user.token : null;

    useEffect(() => {
        const leadid = localStorage.getItem('lead_id');
        console.log(state);
        if (leadid) {
            fetchData(leadid, deviceId);
        } else {
            toast.error('You can not access this page');
        }
    }, [deviceId]);
    const fetchData = (leadid, deviceId) => {
        try {
            GetLeadSaleOrderAPI(token, leadid)
                .then((res) => {
                    const filterData = res.data.filter((item) => item.device.id === deviceId);

                    if (filterData.length > 0) {
                        setSaleData(filterData[0]);
                    } else {
                        toast.error("Can't place the same order");
                    }
                })
                .catch((error) => {});
        } catch (error) {
            toast.error('Something went wrong, please check your internet connection.');
        }
    };

    return (
        <>
            <Grid item xs={12} md={12}>
                <Typography variant="h2" className={classes.heading}>
                    {t('Order Summary')}
                </Typography>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} mt={2}>
                    <Card className={classes.photoContainer}>
                        {saleData ? (
                            <>
                                <PhotoOfDevice deviceData={saleData} />
                                <DeviceInfo deviceData={saleData} />
                            </>
                        ) : (
                            <LoadingSkeleton />
                        )}
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} className={classes.card}>
                                {saleData ? <LeadIDCard leadInfo={saleData.prospect_id} /> : <LoadingSkeleton />}
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.card}>
                                {saleData ? <PackageCard packageInfo={saleData} /> : <LoadingSkeleton />}
                            </Grid>
                        </Grid>
                    </SubCard>
                    {saleData ? <PaymentTermsCard saleData={saleData} /> : <LoadingSkeleton />}
                </Grid>
            </Grid>
        </>
    );
};

export default OrderSummaryPage;
