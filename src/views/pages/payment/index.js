import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Container, Typography, Grid } from '@mui/material';
import LeadIDCard from './LeadIDCard';
import PackageCard from './PackageCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@mui/styles';
import GetLeadSaleOrderAPI from '../../../apicalls/GetLeadSaleOrderAPI';
import { toast } from 'react-toastify';
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
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'column'
    },
    card: {
        marginBottom: theme.spacing(2)
    },
    tableContainer: {
        maxHeight: 200,
        overflowY: 'auto'
    },
    boldText: {
        fontWeight: 'bold'
    }
}));
const OrderSummaryPage = () => {
    const location = useLocation();
    const { state } = location;
    const deviceId = state;
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();

    // Sale Data is an object, need to manage the latest and do not authorize to go back
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
    }, [deviceId]);

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

    if (saleData) {
        console.log('saleData');
        console.log(saleData);
    }

    return (
        <>
            <Grid item xs={12} md={6}>
                <Typography variant="h2" className={classes.heading}>
                    {t('order_summary')}
                </Typography>
            </Grid>
            <Container maxWidth="md" sx={{ ...classes.container, marginLeft: 'auto', marginRight: theme.spacing(5) }}>
                {saleData && (
                    <SubCard>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <LeadIDCard leadInfo={saleData.prospect_id} />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <PackageCard packageInfo={saleData} />
                            </Grid>
                        </Grid>
                    </SubCard>
                )}
            </Container>
        </>
    );
};

export default OrderSummaryPage;
