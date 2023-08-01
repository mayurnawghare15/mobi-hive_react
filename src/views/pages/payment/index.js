import React, { useEffect } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Container, Typography, Paper, Grid } from '@mui/material';
import LeadIDCard from './LeadIDCard';
import PhotoOfDevice from './PhotoOfDevice';
import PackageCard from './PackageCard';
import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import GetLeadSaleOrderAPI from '../../../apicalls/GetLeadSaleOrderAPI';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useLocation } from 'react-router';

// Create custom styles
const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: theme.spacing(4)
    },
    container: {
        width: '50%',
        height: '30vh',
        marginTop: theme.spacing(1),
        marginLeft: 'auto',
        marginRight: theme.spacing(1),
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'column'
    }
}));

const OrderSummaryPage = () => {
    const location = useLocation();
    const { state } = location;
    const deviceId = state;
    const { t } = useTranslation();
    const classes = useStyles();
    //Sale Data is an array need to manage the latest and do not authorize to go back
    const [saleData, getSaleData] = useState('');

    const order = {
        // ... other order details ...
        leadInfo: {
            name: saleData[0].prospect_id.first_name + ' ' + saleData[0].prospect_id.last_name,

            email: saleData[0].prospect_id.email,
            phone: saleData[0].prospect_id.full_phones,
            address: '123, Main Street, City',
            saleorder: saleData[0].order_sr_id
        },
        // ... other order details ...
        photoUrl: 'https://example.com/device-photo.jpg',
        packageInfo: {
            name: 'Premium Package',
            price: 99.99
            // Add more package details as needed
        }
    };
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }

    useEffect(() => {
        console.log(deviceId);
        const leadid = localStorage.getItem('lead_id');
        if (leadid) {
            fetchData(leadid);
        } else {
            return toast.error('You can not access this page');
        }
    }, []);

    const fetchData = (leadid) => {
        try {
            GetLeadSaleOrderAPI(token, leadid)
                .then((res) => {
                    // toast.success('Select Device');

                    const filterData = res.results.filter((item) => item.device.id === deviceId);
                    if (filterData.length > 1) {
                        getSaleData(filterData);
                    } else {
                        toast.error("Can't place same order");
                    }
                })
                .catch((error) => {});
        } catch (error) {
            toast.error(error);
        }
    };

    console.log(saleData);

    return (
        <>
            <Grid item xs={12} md={6}>
                <Typography variant="h2" className={classes.heading}>
                    {t('order_summary')}
                </Typography>
            </Grid>
            <Container maxWidth="md" className={classes.container}>
                <SubCard>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <LeadIDCard leadInfo={order.leadInfo} />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <LeadIDCard leadInfo={order.leadInfo} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <PackageCard packageInfo={order.packageInfo} />
                    </Grid>
                    {/* <Grid item xs={12}>
                            <PhotoOfDevice photoUrl={order.photoUrl} />
                        </Grid> */}
                    {/* ... other order summary details ... */}
                </SubCard>
            </Container>
        </>
    );
};

export default OrderSummaryPage;
