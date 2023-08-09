import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import '../../views/pages/EligibleDevices/index';
import ConfirmDialog from '../../components/ConfirmDialog';

const API_Image_Url = process.env.REACT_APP_IMAGE_URL;

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        transition: 'transform 0.2s ease',
        width: '100%',
        height: 'auto',
        '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }
    },
    cardContent: {
        padding: theme.spacing(2),
        '&:last-child': {
            paddingBottom: theme.spacing(2) // Add some padding at the bottom of the card content
        }
    },
    image: {
        height: '200px',
        width: 'auto'
    },
    productTitle: {
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
        fontSize: '1.2rem' // Reduce the font size for a more compact title
    },
    specifications: {
        listStyle: 'none',
        padding: 0,
        marginLeft: theme.spacing(2)
    },
    specificationItem: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.2rem'
    },
    bullet: {
        marginRight: theme.spacing(1),
        content: '"\\2022"',
        fontSize: '1rem'
    },
    price: {
        marginTop: theme.spacing(2),
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    cardContainer: {
        marginBottom: theme.spacing(2)
    },
    clickableCard: {
        cursor: 'pointer'
    },
    hr: {
        margin: theme.spacing(0.5, 0),
        borderColor: theme.palette.primary.main,
        borderWidth: 3,
        borderRadius: 5
    },
    packageContainer: {
        marginTop: theme.spacing(3)
    },
    customPackageContainer: {
        marginTop: theme.spacing(3)
    },
    packageRadio: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        cursor: 'pointer',
        '& input[type="radio"]': {
            marginRight: theme.spacing(1),
            cursor: 'pointer'
        },
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    selectedPackage: {
        fontWeight: 'bold'
    },
    containerStyle: {
        backgroundColor: '#d0e5f5',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    },

    headingStyle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px'
    },

    labelStyle: {
        fontSize: '18px',
        fontWeight: 'bold'
    },

    valueStyle: {
        fontSize: '18px'
    }
}));

const ProductCard = ({ deviceData, encrypted_mobile_Number, state }) => {
    const classes = useStyles();
    const [isPackage, setIsPackage] = useState(false);
    const [isCustomPackage, setIsCustomPackage] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [confirmOrder, setConfirmOrder] = useState(false);
    var data = deviceData;
    var packages = data.package;
    console.log(data);
    const deviceId = data.device.id;

    const handlePackageChange = (packageId) => {
        setSelectedPackage(packageId);
        setConfirmOrder(true);
    };
    const handleCardClick = () => {
        if (selectedPackage) {
            setIsPackage(false);
        }
        setIsPackage(true);
        if (setIsCustomPackage) {
            setIsCustomPackage(false);
        }
        setIsCustomPackage(true);
    };

    return (
        <>
            {confirmOrder && (
                <ConfirmDialog
                    encrypted_mobile_Number={encrypted_mobile_Number}
                    state={state}
                    selectedPackage={selectedPackage}
                    data={data}
                    confirmOrder={confirmOrder}
                    setConfirmOrder={setConfirmOrder}
                ></ConfirmDialog>
            )}
            <Container>
                <div className={classes.cardWrapper}>
                    <Grid container spacing={2} className={classes.cardContainer}>
                        <Card className={`${classes.card} ${classes.clickableCard}`} onClick={handleCardClick}>
                            <CardHeader title={<Typography variant="h3">{data.device.oem_slug.toUpperCase()}</Typography>} />
                            <hr className={classes.hr} />
                            <CardContent className={classes.cardContent}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} ml={2} sm={4}>
                                        <img
                                            className={classes.image}
                                            src={API_Image_Url + data.device.photo}
                                            alt={data.device.model_name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <Typography variant="h3" className={classes.productTitle}>
                                            {data.device.model_name}
                                        </Typography>
                                        <ul spacing={1} className={classes.specifications}>
                                            <li>{data.device.device_summary}</li>
                                        </ul>
                                        <Typography mt={3} variant="h5">
                                            Cash Price
                                        </Typography>
                                        <Typography variant="h4" className={classes.price}>
                                            {data.currency}
                                            {data.max_retail_price}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                {isPackage && packages.length > 0 && (
                                    <div className={classes.packageContainer}>
                                        {packages.slice(0, data.count).map((pkg) => (
                                            <div
                                                key={pkg.id}
                                                className={`${classes.packageRadio} ${
                                                    selectedPackage === pkg.id ? classes.selectedPackage : ''
                                                }`}
                                                onClick={() => handlePackageChange(pkg.id)}
                                            >
                                                <input
                                                    type="radio"
                                                    value={pkg.id}
                                                    checked={selectedPackage === pkg.id}
                                                    onChange={() => handlePackageChange(pkg.id)}
                                                />
                                                <Grid container className={`${classes.containerStyle}`}>
                                                    <Typography variant="h4" className={`${classes.labelStyle}`}>
                                                        {packages[0].package_type}
                                                    </Typography>
                                                    <Grid item xs={12} sm={12}>
                                                        <Typography variant="h4" className={`${classes.headingStyle}`}>
                                                            {pkg.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={`${classes.labelStyle}`}>Upfront Payment:</Typography>
                                                        <Typography className={`${classes.valueStyle}`}>
                                                            {data.currency} {pkg.upfront_payment}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={`${classes.labelStyle}`}>Credit Price:</Typography>
                                                        <Typography className={`${classes.valueStyle}`}>
                                                            {data.currency} {pkg.credit_price}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={`${classes.labelStyle}`}>Installment Amount:</Typography>
                                                        <Typography className={`${classes.valueStyle}`}>
                                                            {data.currency} {pkg.installment_amount}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={`${classes.labelStyle}`}>Total Tenure:</Typography>
                                                        <Typography className={`${classes.valueStyle}`}>
                                                            {pkg.total_tenure} months
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {isCustomPackage && packages.length > 0 && (
                                    <div className={classes.customPackageContainer}>
                                        {packages.slice(0, data.count).map((pkg) => (
                                            <div
                                                key={pkg.id}
                                                className={`${classes.packageRadio} ${
                                                    selectedPackage === pkg.id ? classes.selectedPackage : ''
                                                }`}
                                                onClick={() => handlePackageChange(pkg.id)}
                                            >
                                                <input
                                                    type="radio"
                                                    value={pkg.id}
                                                    checked={selectedPackage === pkg.id}
                                                    onChange={() => handlePackageChange(pkg.id)}
                                                />
                                                <Grid container className={`${classes.containerStyle}`}>
                                                    <Typography variant="h4" className={`${classes.labelStyle}`}>
                                                        {/* {packages[0].package_type} */} CUSTOM PLAN
                                                    </Typography>
                                                    <Grid item xs={12} sm={12}>
                                                        <Typography variant="h4" className={`${classes.headingStyle}`}>
                                                            {pkg.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={`${classes.labelStyle}`}>Upfront Payment:</Typography>
                                                        <Typography className={`${classes.valueStyle}`}>
                                                            {data.currency} {pkg.upfront_payment}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={`${classes.labelStyle}`}>Credit Price:</Typography>
                                                        <Typography className={`${classes.valueStyle}`}>
                                                            {data.currency} {pkg.credit_price}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={`${classes.labelStyle}`}>Installment Amount:</Typography>
                                                        <Typography className={`${classes.valueStyle}`}>
                                                            {data.currency} {pkg.installment_amount}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={`${classes.labelStyle}`}>Total Tenure:</Typography>
                                                        <Typography className={`${classes.valueStyle}`}>
                                                            {pkg.total_tenure} months
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                </div>
            </Container>
        </>
    );
};

export default ProductCard;
