import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Card, Container, Typography, Grid } from '@mui/material';
import LeadIDCard from './LeadIDCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import GetLeadSaleOrderAPI from '../../../apicalls/GetLeadSaleOrderAPI';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router';
import PhotoOfDevice from './PhotoOfDevice';
import PaymentTermsCard from './PaymentTermsCard';
import DeviceInfo from './DeviceInfo';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import FixedPackageCard from './FixedPackageCard';
import CustomPackageCard from './CustomPackageCard';

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
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(0)
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
    const leadid = state.leadid;
    const deviceId = state.deviceId;
    const { t } = useTranslation();
    const classes = useStyles();
    const [fixPkgType, setfixPkgType] = useState(state.isfixPackage);
    const [customPkgType, setcustomPkgType] = useState(state.isCustomPackage);

    const [saleData, setSaleData] = useState(null);
    const { user } = useAuthContext();
    const token = user ? user.token : null;

    useEffect(() => {
        console.log('state');
        console.log(state);
        if (leadid) {
            fetchData(leadid, deviceId);
        } else {
            toast.error('You can not access this page');
        }
    }, [deviceId, leadid]);
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
                                {saleData && fixPkgType && <FixedPackageCard packageInfo={saleData} />}
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.card}>
                                {saleData && customPkgType && <CustomPackageCard packageInfo={saleData} />}
                            </Grid>
                        </Grid>
                    </SubCard>
                    {saleData && !customPkgType ? <PaymentTermsCard saleData={saleData} /> : ''}
                </Grid>
            </Grid>
        </>
    );
};

export default OrderSummaryPage;
