import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
    tableCell: {
        fontSize: 16,
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

const FixedPackageCard = ({ packageInfo, data }) => {
    const classes = useStyles();
    const applied_package = packageInfo;
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title} gutterBottom>
                    Package Name - {applied_package.total_tenure} Months {applied_package.package_type}
                </Typography>
                <div style={{ width: '100%' }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table stickyHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Upfront Amount</TableCell>
                                            <TableCell className={classes.tableCell}>Installments</TableCell>
                                            <TableCell className={classes.tableCell}>Total Tenure</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {packageInfo.currency.cr_prefix} {packageInfo.upfront_payment}
                                            </TableCell>

                                            <TableCell align="center" className={classes.tableCell}>
                                                {packageInfo.currency.cr_prefix} {packageInfo.installment_amount}
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {packageInfo.total_tenure}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                <Typography className={classes.typography}>
                                                    * Installment Starts from Sep 10, 2023
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
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table stickyHeader>
                                    <TableHead className={classes.tablehead}>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Sr.No</TableCell>
                                            <TableCell className={classes.tableCell}>Due</TableCell>
                                            <TableCell className={classes.tableCell}>Total Tenure</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {data.installments.map((installment, index) => (
                                            <TableRow key={index}>
                                                <TableCell className={classes.tableCell}>{index + 1}</TableCell>
                                                <TableCell className={classes.tableCell}>
                                                    {packageInfo.currency.cr_prefix} {installment.dueAmount}
                                                </TableCell>
                                                <TableCell className={classes.lastTableCell}>{installment.totalAmount}</TableCell>
                                            </TableRow>
                                        ))} */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FixedPackageCard;
