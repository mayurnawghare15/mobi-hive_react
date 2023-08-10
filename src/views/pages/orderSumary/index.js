import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Card, Container, Typography, Grid, Button, IconButton, CardContent } from '@mui/material';
import LeadIDCard from './LeadIDCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import GetLeadSaleOrderAPI from '../../../apicalls/GetLeadSaleOrderAPI';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import PhotoOfDevice from './PhotoOfDevice';
import DeviceInfo from './DeviceInfo';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import FixedPackageCard from './FixedPackageCard';
import CustomPackageCard from './CustomPackageCard';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { handleDelete } from '../../../helper/deleteOrder';

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
    },
    buttonsContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignContent: 'flex-end'
    },
    acceptButton: {
        marginRight: theme.spacing(1)
    },
    deletebtn: {
        display: 'flex',
        alignContent: 'flex-end'
    }
}));

const OrderSummaryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    // const leadid = state.leadid;
    // const deviceId = state.deviceId;
    const { t } = useTranslation();
    const classes = useStyles();
    // const [customPkgType, setcustomPkgType] = useState(state.isCustomPackage);

    const [saleData, setSaleData] = useState(state.data);
    const { user } = useAuthContext();
    const token = user ? user.token : null;

    useEffect(() => {
        // if (leadid) {
        //     fetchData(leadid, deviceId);
        // } else {
        //     toast.error('You can not access this page');
        // }
    }, []);
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
    const handleAccept = () => {
        return navigate(`/payment/`, { state: saleData });
    };

    const handleDeletebtn = () => {
        // handleDelete(token, orderId, leadId);
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
                                {/* {saleData ? <LeadIDCard leadInfo={saleData.prospect_id} /> : <LoadingSkeleton />} */}
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.card}>
                                {state.selectedPackage.package_type == 'FIXED' && <FixedPackageCard packageInfo={state.selectedPackage} />}
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.card}>
                                {state.selectedPackage.package_type == 'CUSTOM' && <CustomPackageCard packageInfo={saleData} />}
                            </Grid>
                        </Grid>
                        <Grid container className={classes.buttonsContainer}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<LocalShippingIcon />}
                                    onClick={handleAccept}
                                    className={classes.acceptButton}
                                >
                                    Place Order
                                </Button>
                            </Grid>
                            <Grid item>
                                <IconButton color="error" className={classes.deletebtn} onClick={handleDeletebtn}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderSummaryPage;
