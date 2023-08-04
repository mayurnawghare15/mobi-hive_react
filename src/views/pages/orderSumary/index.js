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

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: theme.spacing(2)
    },
    container: {
        marginRight: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        width: '50%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'flex-start', // Align cards to the left
        width: '100%'
    },
    card: {
        width: '40%', // Adjust the width to make the cards smaller
        marginBottom: theme.spacing(2)
    },
    photoContainer: {
        width: '100%', // Adjust the width to make the photo smaller
        marginBottom: theme.spacing(2),
        height: '100%' // Set the height to 100% of its parent container
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
        console.log(deviceId);
        console.log(leadid);
        if (leadid) {
            fetchData(leadid, deviceId);
        } else {
            return toast.error('You can not access this page');
        }
    }, []);

    const fetchData = (leadid, deviceId) => {
        try {
            GetLeadSaleOrderAPI(token, leadid)
                .then((res) => {
                    const filterData = res.results.filter((item) => item.device.id === deviceId);

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

    const handleConfirmOrder = () => {
        // Implement the logic to handle the order confirmation and redirection to the payment page.
        // For example, you can use the useHistory hook to navigate to the payment page.
        // Replace '/payment' with the actual path of the payment page in your application.
        // history.push('/payment');
    };

    // if (saleData) {
    //     console.log('saleData');
    //     console.log(saleData);
    // }

    return (
        <>
            <Grid item xs={12} md={12}>
                <Typography variant="h2" className={classes.heading}>
                    {t('Order Summary')}
                </Typography>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} mt={3}>
                    <Card className={classes.photoContainer}>{saleData && <PhotoOfDevice deviceData={saleData} />}</Card>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.cardContainer}>
                    <SubCard>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} className={classes.card}>
                                {saleData && <LeadIDCard leadInfo={saleData.prospect_id} />}
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.card}>
                                {saleData && <PackageCard packageInfo={saleData} />}
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderSummaryPage;
