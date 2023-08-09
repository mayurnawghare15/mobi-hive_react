import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Slider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    container: {
        width: '100%'
    },
    tableContainer: {
        maxHeight: 200,
        overflowY: 'auto',
        marginBottom: theme.spacing(2)
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[3],
        width: '100%'
    },
    title: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
        color: 'black'
    },
    details: {
        marginBottom: theme.spacing(1)
    },
    tableCell: {
        color: 'black'
    },
    tableheading: {
        alignContent: 'center',
        fontSize: '18px',
        color: 'black'
    },
    sliderContainer: {
        width: 300,
        margin: '0 auto',
        padding: theme.spacing(2)
    }
}));

const CustomPackageCard = ({ packageInfo }) => {
    const classes = useStyles();
    const applied_package = packageInfo.applied_package;
    console.log('packageInfo ');
    console.log(packageInfo);

    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title} gutterBottom>
                    Package Name - {applied_package.package_name}
                </Typography>
                <div style={{ width: '100%' }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table stickyHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" className={classes.tableheading}>
                                                {' '}
                                                {packageInfo.currency_prefix} {packageInfo.upfront_amount}
                                                <Typography mt={2} variant="body1">
                                                    Upfront Amount
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableheading}>
                                                {' '}
                                                {packageInfo.currency_prefix} {packageInfo.prorated_advance}
                                                <Typography mt={2} variant="body1">
                                                    Prorated Installment
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableheading}>
                                                {' '}
                                                {packageInfo.currency_prefix} {packageInfo.installment_amount}
                                                <Typography mt={2} variant="body1">
                                                    Monthly / weekly
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className={classes.sliderContainer}>
                                    <Typography gutterBottom>Slider Value: {sliderValue} </Typography>
                                    <Slider
                                        value={sliderValue}
                                        onChange={handleSliderChange}
                                        aria-labelledby="slider-label"
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={100}
                                    />
                                </div>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CustomPackageCard;
