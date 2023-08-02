import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        maxHeight: 200,
        overflowY: 'auto'
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[3],
        minWidth: 300
    },
    title: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2)
    },
    details: {
        marginBottom: theme.spacing(1)
    }
}));

const PackageCard = ({ packageInfo }) => {
    const classes = useStyles();
    const applied_package = packageInfo.applied_package;
    console.log('packageInfo');
    console.log(packageInfo);
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h4" className={classes.tittle} gutterBottom>
                    Selected Package
                </Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Package Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                {/* Add more table headings for additional package details */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{applied_package.package_name}</TableCell>
                                {/* <TableCell align="right">{`$${packageInfo.price.toFixed(2)}`}</TableCell> */}
                                {/* Add more table cells for additional package details */}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default PackageCard;
