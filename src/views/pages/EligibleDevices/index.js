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
import { debounce_custome } from '../../../helper';

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
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [isCustomPkg, setIsCustomPkg] = useState(false);

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
            fetchData();
        } else {
            return toast.error('You can not access this page');
        }
    }, []);

    const fetchData = (search_param = '') => {
        try {
            EligibleDevicesAPI(token, leadid, search_param)
                .then((res) => {
                    if (!search_param) setAllData(res.results);
                    setFilterData(res.results);
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

    console.log('filterData');
    console.log(filterData);
    const checkCustomPkg = () => {
        console.log(filterData.package);
    };
    const handleSearch = (value) => {
        const newSearchTerm = value;
        setSearchTerm(newSearchTerm);
        fetchData(newSearchTerm);
    };

    const debouncedHandleSearch = debounce_custome(handleSearch, 500); // Adjust the delay as needed

    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        debouncedHandleSearch(newSearchTerm);
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
                        <SearchSection handleSearch={handleInputChange} searchTerm={searchTerm} />
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
                    <>
                        {' '}
                        {filterData && filterData.length > 0
                            ? filterData.map((item, index) => (
                                  <Grid key={index + '_prductcard'} item xs={12} sm={12}>
                                      <ProductCard encrypted_mobile_Number={mobile_Number} state={state} deviceData={item} index={index} />
                                  </Grid>
                              ))
                            : 'No devices available for now'}
                    </>
                )}
            </Grid>
        </>
    );
};

export default EligibleDevices;
