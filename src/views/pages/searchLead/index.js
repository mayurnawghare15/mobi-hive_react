import { Grid, Typography } from '@mui/material'; // Import the Skeleton component
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import SearchSection from '../../../layout/MainLayout/Header/SearchSection';
import { useTranslation } from 'react-i18next';
import GetRecentLeadsAPI from '../../../apicalls/GetRecentLeadsAPI';
import LeadCard from './LeadCard';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import { debounce_custome } from '../../../helper';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        backgroundColor: '#f7f7f7',
        borderRadius: 8,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    },
    heading: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: theme.spacing(2)
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(2)
    }
}));

export default function SearchLead() {
    const { t } = useTranslation();
    const classes = useStyles();
    const [recentData, setRecentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const { user } = useAuthContext();
    const token = user ? user.token : null;

    useEffect(() => {
        fetchData(searchTerm);
    }, []);

    const fetchData = (searchTerm='') => {
        try {
            setLoading(true);
            GetRecentLeadsAPI(token, searchTerm)
                .then((res) => {
                    const results = res.data.result
                    setRecentData(results);
                })
                .catch((error) => {
                    toast.error('Something went wrong, please check your internet connection.');
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            toast.error('Something went wrong, please check your internet connection.');
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        const newSearchTerm = value;
        setSearchTerm(newSearchTerm);
        fetchData(newSearchTerm)
    };

    const debouncedHandleSearch = debounce_custome(handleSearch, 500); // Adjust the delay as needed

    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        debouncedHandleSearch(newSearchTerm);
    };


    return (
        <div className={classes.container}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={2}>
                    <Typography variant="h2" className={classes.heading}>
                        {t('recent_Leads')}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={10}>
                    <div className={classes.searchContainer}>
                        <SearchSection handleSearch={handleInputChange} />
                    </div>
                </Grid>
                {loading ? (
                    <Grid item xs={12} height={'100vh'}>
                        <LoadingSkeleton />
                    </Grid>
                ) : (recentData && recentData.length > 0 && recentData.map((lead) => (
                            <Grid item xs={12} md={6} key={lead.id}>
                                <LeadCard user={lead} />
                            </Grid>
                        ))
                )}
            </Grid>
        </div>
    );
}
