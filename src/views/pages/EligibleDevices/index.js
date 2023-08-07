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
import { useLocation, useNavigate, useParams } from 'react-router';
import { decryptData } from '../../../helper/encryption/decrypt';

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
    const { state } = useLocation();
    const { mobile_Number } = useParams();
    const navigate = useNavigate();
    const leadid = state.leadid;
    const { t } = useTranslation();
    const [deviceData, setDeviceData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [showProduct, setShowProduct] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterData, setFilterData] = useState('');

    const classes = useStyles();
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }

    useEffect(() => {
        const decrypted_mob = decryptData(mobile_Number);
        if (!state) {
            navigate('/lead/verify-phonenumber');
            return toast.error('Need to verify your Mobile Number ');
        } else if (decrypted_mob !== state.ph_number) {
            return toast.error('You are not authorized this page');
        } else if (leadid) {
            fetchData(leadid);
        } else {
            return toast.error('You can not access this page');
        }
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredData = deviceData.filter((item) => item.device.device_summary.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilterData(filteredData);
    };

    const fetchData = (leadid) => {
        try {
            EligibleDevicesAPI(token, leadid)
                .then((res) => {
                    setAllData(res);
                    setDeviceData(res.results);
                    setFilterData(res.results);
                    setShowProduct(true);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
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
                        <SearchSection handleSearch={handleSearch} searchTerm={searchTerm} />
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
                            <ProductCard
                                encrypted_mobile_Number={mobile_Number}
                                state={state}
                                deviceData={filterData[index]}
                                index={index}
                            />
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
};

export default EligibleDevices;
