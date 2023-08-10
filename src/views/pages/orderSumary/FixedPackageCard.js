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
    }
}));

const FixedPackageCard = ({ packageInfo }) => {
    const classes = useStyles();
    const applied_package = packageInfo;
    console.log(packageInfo);
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
                                            <TableCell className={classes.tableCell}>Upfront Amount -</TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {packageInfo.currency.cr_prefix} {packageInfo.upfront_payment}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Installments -</TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {packageInfo.currency.cr_prefix} {packageInfo.installment_amount}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Total Tenure -</TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {packageInfo.total_tenure}
                                            </TableCell>
                                        </TableRow>
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
