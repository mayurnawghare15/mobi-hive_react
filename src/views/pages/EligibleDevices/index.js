import React, { useEffect, useState } from 'react';
import ProductCard from '../../../components/phoneCard/ProductCard';
import SearchSection from '../../../layout/MainLayout/Header/SearchSection';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import EligibleDevicesAPI from '../../../apicalls/EligibleDevicesAPI';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../hooks/useAuthContext';
import LoadingSkeleton from '../../../components/LoadingSkeleton';

const useStyles = makeStyles((theme) => ({
    heading: {
        marginBottom: theme.spacing(2),
        fontWeight: 'bold'
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between' // Align items to the two ends (left and right)
    }
}));

const EligibleDevices = () => {
    const { t } = useTranslation();
    const [deviceData, setDeviceData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [showProduct, setShowProduct] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        try {
            EligibleDevicesAPI(token, 451)
                .then((res) => {
                    // toast.success('Select Device');
                    setAllData(res);
                    setDeviceData(res.results);
                    setShowProduct(true);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    return toast.error(error);
                });
        } catch (error) {
            setIsLoading(false);
            toast.error(error);
        }
    };

    return (
        <>
            <Grid container alignItems="center" ml={1} mt={1} spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h1" className={classes.heading}>
                        {t('choose_any_device')}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className={classes.searchContainer}>
                        <SearchSection />
                    </div>
                </Grid>
            </Grid>
            <Grid container mt={2} spacing={2}>
                {isLoading ? (
                    <>
                        <Grid item xs={12} sm={12}>
                            <LoadingSkeleton />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <LoadingSkeleton />
                        </Grid>
                    </>
                ) : (
                    showProduct &&
                    Array.from({ length: allData.count }).map((_, index) => (
                        <Grid key={index} item xs={12} sm={12}>
                            <ProductCard deviceData={deviceData[index]} />
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
};

export default EligibleDevices;
