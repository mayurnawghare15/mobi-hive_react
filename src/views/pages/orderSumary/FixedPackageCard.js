import React, { useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatDate } from '../../../helper/formatDate';

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
        maxHeight: 500,
        backgroundColor: '#e3f2fd'
    },
    card: {
        backgroundColor: '#483285',
        width: '100%',
        borderRadius: theme.spacing(2),
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
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
    tableHeading: {
        textAlign: 'center',
        backgroundColor: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#251354'
    },
    tableCell: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black'
    },

    lastTableCell: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    typography: {
        textAlign: 'end',
        marginTop: theme.spacing(1),
        fontSize: 14,
        color: 'black'
    }
}));

const FixedPackageCard = ({ packageInfo }) => {
    const classes = useStyles();
    const applied_package = packageInfo;
    var nowDate = new Date();
    var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 2) + '-' + nowDate.getDate();
    const [installmentAmount, setInstallmentAmount] = useState(Math.floor(applied_package.installment_amount));

    //Function for Add Months 
    function addMonthsToDate(date, monthsToAdd) {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + monthsToAdd);
        return formatDate(newDate.getFullYear() + '-' + (newDate.getMonth()) + '-' + newDate.getDate())
    }
    console.log(packageInfo);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography style={{ textAlign: "center", marginBottom: "15px" }} variant="h3" gutterBottom>
                    Package Name - {applied_package.total_tenure} Months {applied_package.package_type}
                </Typography>
                <div style={{ width: '100%' }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table stickyHeader>
                                    <TableBody>
                                        <TableRow className={classes.tableHeading}>
                                            <TableCell className={classes.tableHeading}>Upfront Amount</TableCell>
                                            <TableCell className={classes.tableHeading}>Installments</TableCell>
                                            <TableCell className={classes.tableHeading}>Total Tenure</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {packageInfo.currency.cr_prefix} {Math.floor(packageInfo.upfront_payment)}
                                            </TableCell>

                                            <TableCell align="center" className={classes.tableCell}>
                                                {packageInfo.currency.cr_prefix} {Math.floor(packageInfo.installment_amount)}
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {packageInfo.total_tenure}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                <Typography className={classes.typography}>
                                                    <b style={{ color: '#A39BA8' }}> * Installment Starts from {addMonthsToDate(date, 1)}</b>
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </div>
                {/* Installment due Tables */}

                <div style={{ marginTop: '20px', width: '100%' }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <TableContainer className={classes.tableContainer}>
                                <Table stickyHeader>
                                    <TableHead className={classes.tablehead}>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Sr.No</TableCell>
                                            <TableCell className={classes.tableHeading}>Due Date</TableCell>
                                            <TableCell className={classes.tableHeading}>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow>
                                            <TableCell className={classes.tableCell}>1</TableCell>
                                            <TableCell className={classes.tableCell}>{addMonthsToDate(date, 1)}</TableCell>
                                            <TableCell className={classes.tableCell}> {packageInfo.currency.cr_prefix} {installmentAmount}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className={classes.tableCell}>2</TableCell>
                                            <TableCell className={classes.tableCell}>{addMonthsToDate(date, 2)}</TableCell>
                                            <TableCell className={classes.tableCell}> {packageInfo.currency.cr_prefix} {installmentAmount}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>3</TableCell>
                                            <TableCell className={classes.tableCell}>{addMonthsToDate(date, 3)}</TableCell>
                                            <TableCell className={classes.tableCell}> {packageInfo.currency.cr_prefix} {installmentAmount}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default FixedPackageCard;
