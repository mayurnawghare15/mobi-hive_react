import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import SearchSection from '../../../layout/MainLayout/Header/SearchSection';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import LeadCard from './LeadCard';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center'
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
const handleSearch = (event) => {
    const searchTerm = event.target.value;
    // setSearchTerm(searchTerm);

    // const filteredData = deviceData.filter((item) => item.device.device_summary.toLowerCase().includes(searchTerm.toLowerCase()));
    // console.log(filteredData, '----filteredData');
    // setFilterData(filteredData);
};

export default function SearchLead() {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={2}>
                    <Typography variant="h2" className={classes.heading}>
                        {t('recent_Leads')}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={10}>
                    <div className={classes.searchContainer}>
                        <SearchSection handleSearch={handleSearch} />
                    </div>
                </Grid>
                <LeadCard />
            </Grid>
        </>
    );
}
