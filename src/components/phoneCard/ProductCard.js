import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import '../../views/pages/EligibleDevices/index';
import ConfirmDialog from '../../components/ConfirmDialog';
import { formatDate } from '../../helper/formatDate';

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
        height: '100%',
        marginTop: theme.spacing(3)
    },
    customPackageContainer: {
        // height: '300px',
        // width: '300px',
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
        width: '600px',
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
    },

    offerText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#1cc88a',
        border: 'none',
        padding: '10px 10px',
        borderRadius: '10px',
        margin: '10px 10px'
    }
}));

const ProductCard = ({ deviceData, encrypted_mobile_Number, state }) => {
    const classes = useStyles();
    const [isfixPackage, setFixPackage] = useState(false);
    const [isCustomPackage, setIsCustomPackage] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [showFixed, setShowFixed] = useState(false);
    const [showCustom, setShowCustom] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    var data = deviceData;
    var packages = data.package;
    let customPkg = data.custom_package ? data.custom_package : null;
    console.log('data');
    console.log(data);
    const deviceId = data.device.id;

    const handlePackageChange = (packageId) => {
        setSelectedPackageId(packageId);
        setFixPackage(true);
        setConfirmOrder(true);
    };
    const handlecustomPkg = (packageId) => {
        setSelectedPackageId(packageId);
        setIsCustomPackage(true);
        setConfirmOrder(true);
    };
    const handleCardClick = () => {
        if (packages.length > 0) {
            setShowFixed(true);
        }

        if (customPkg.length > 0) {
            setShowCustom(true);
        }
    };

    return (
        <>
            {confirmOrder && (
                <ConfirmDialog
                    encrypted_mobile_Number={encrypted_mobile_Number}
                    state={state}
                    selectedPackage={selectedPackageId}
                    data={data}
                    confirmOrder={confirmOrder}
                    setConfirmOrder={setConfirmOrder}
                    isCustomPackage={isCustomPackage}
                    setIsCustomPackage={setIsCustomPackage}
                    isfixPackage={isfixPackage}
                    setFixPackage={setFixPackage}
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
                                {showFixed && packages.length > 0 && (
                                    <div className={classes.packageContainer}>
                                        {packages.map((pkg) => (
                                            <div
                                                key={pkg.id}
                                                className={`${classes.packageRadio} ${
                                                    selectedPackageId === pkg.id ? classes.selectedPackage : ''
                                                }`}
                                                onClick={() => handlePackageChange(pkg.id)}
                                            >
                                                <Grid container className={classes.containerStyle} alignItems="center">
                                                    <Grid container alignItems="center">
                                                        <Grid item xs={12} sm={1.6} className={classes.offerText}>
                                                            OFFER
                                                        </Grid>
                                                        <Grid item xs={12} sm={5} style={{ marginLeft: '1rem' }}>
                                                            <Typography className={classes.labelStyle}>
                                                                Deposite {data.currency}
                                                                {pkg.upfront_payment}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            sm={4}
                                                            style={{ marginLeft: '1rem', display: 'flex', alignItems: 'end' }}
                                                        >
                                                            <Typography style={{ fontSize: '14px', color: 'black', textAlign: 'end' }}>
                                                                Valid till{' '}
                                                                <b style={{ marginLeft: '5px' }}>{formatDate(data.valid_till_date)}</b>
                                                            </Typography>
                                                        </Grid>
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
