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
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { handleDelete } from '../../../helper/deleteOrder';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import PlaceOrderAPI from '../../../apicalls/PlaceOrderAPI';

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
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

const OrderSummaryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const leadid = localStorage.getItem('lead_id');

    const { t } = useTranslation();
    const classes = useStyles();
    // const [customPkgType, setcustomPkgType] = useState(state.isCustomPackage);

    const [saleData, setSaleData] = useState(state.data);
    const deviceId = saleData.device.id;
    const { user } = useAuthContext();
    const token = user ? user.token : null;
    const pkgId = saleData.package[0].id;

    useEffect(() => {}, []);
    // const fetchData = (leadid, deviceId) => {
    //     try {
    //         GetLeadSaleOrderAPI(token, leadid)
    //             .then((res) => {
    //                 const filterData = res.data.filter((item) => item.device.id === deviceId);

    //                 if (filterData.length > 0) {
    //                     setSaleData(filterData[0]);
    //                 } else {
    //                     toast.error("Can't place the same order");
    //                 }
    //             })
    //             .catch((error) => {});
    //     } catch (error) {
    //         toast.error('Something went wrong, please check your internet connection.');
    //     }
    // };
    const handleAccept = () => {
        try {
            PlaceOrderAPI(token, leadid, deviceId, pkgId)
                .then((res) => {
                    toast.success('Order placed successfully');
                    return navigate(`/payment/`, { state: saleData });
                })
                .catch((err) => {
                    toast.error(err);
                });
        } catch (error) {
            console.log(error);
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
                                {/* {saleData ? <LeadIDCard leadInfo={saleData.prospect_id} /> : <LoadingSkeleton />} */}
                            </Grid>
                            {!state.isCustomPackage ? (
                                <>
                                    <Grid item xs={12} sm={12} className={classes.card}>
                                        <FixedPackageCard packageInfo={state.selectedPackage} data={state.data} />
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item xs={12} sm={12} className={classes.card}>
                                        <CustomPackageCard packageInfo={saleData} />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                        <div className={classes.navigationButtons}>
                            <AnimateButton>
                                <Button
                                    onClick={handleAccept}
                                    startIcon={<LocalShippingIcon />}
                                    disableElevation
                                    size="small"
                                    variant="contained"
                                    color="success"
                                >
                                    {t('place_order')}
                                </Button>
                            </AnimateButton>
                            {/* <AnimateButton>
                                <Button
                                    onclick={handleDeletebtn}
                                    disableElevation
                                    size="small"
                                    variant="contained"
                                    color="warning"
                                    style={{ marginLeft: '8px' }}
                                >
                                    {t('change_installment_date')}
                                </Button>
                            </AnimateButton> */}
                        </div>
                    </SubCard>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderSummaryPage;
