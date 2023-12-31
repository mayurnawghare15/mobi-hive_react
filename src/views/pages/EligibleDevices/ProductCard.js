import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './index';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { formatDate } from '../../../helper/formatDate';

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
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '20px'
    },
    customPackageContainer: {
        // height: '300px',
        // width: '300px',
        marginTop: theme.spacing(3)
    },
    packageRadio: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',

        cursor: 'pointer'
    },
    btn: {
        marginTop: theme.spacing(1),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        justifyContent: 'center',
        borderRadius: '10px',
        cursor: 'pointer'
    },
    selectedPackage: {
        fontWeight: 'bold'
    },
    containerStyle: {
        // maxWidth: '600px',
        Width: '600px',
        backgroundColor: '#d0e5f5',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 2px  rgba(0, 0, 0, 0.1)',
        marginBottom: '10px'
    },

    headingStyle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px'
    },

    labelStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#1cc88a',
        border: 'none',
        padding: '10px 10px',
        borderRadius: '10px',
        margin: '10px 10px'
    },

    valueStyle: {
        fontSize: '18px'
    }
}));

const ProductCard = ({ deviceData, encrypted_mobile_Number, state }) => {
    const classes = useStyles();
    const [isfixPackage, setFixPackage] = useState(false);
    const [isCustomPackage, setIsCustomPackage] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const data = deviceData;
    const packages = data.package;
    const customPkg = data.custom_package ? data.custom_package : null;

    const handleFixPackageChange = (_pkg) => {
        setSelectedPackageId(_pkg);
        setConfirmOrder(true);
    };
    const handleCustomClick = () => {
        setIsCustomPackage(true);
        setConfirmOrder(true);
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
                // isfixPackage={isfixPackage}
                // setFixPackage={setFixPackage}
                ></ConfirmDialog>
            )}

            <Container>
                <div className={classes.cardWrapper}>
                    <Grid container spacing={2} className={classes.cardContainer}>
                        <Card className={`${classes.card} ${classes.clickableCard}`}>
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
                                <div className={classes.packageContainer}>
                                    {packages.map((pkg) => (
                                        <div>
                                            <div
                                                key={pkg.id}
                                                className={`${classes.packageRadio} ${selectedPackageId === pkg.id ? classes.selectedPackage : ''
                                                    }`}
                                                onClick={() => handleFixPackageChange(pkg)}
                                            >
                                                <Grid container className={classes.containerStyle} alignItems="center">
                                                    <Grid container alignItems="center">
                                                        <Grid item xs={12} sm={4} md={3} className={classes.offerText}>
                                                            <Typography className={classes.labelStyle}>OFFER</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={4} style={{ marginLeft: '1rem' }}>
                                                            <Typography variant="h4">
                                                                Deposit {data.currency}
                                                                {pkg.upfront_payment}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            mt={2.5}
                                                            xs={12}
                                                            sm={12}
                                                            md={4}
                                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                                                        >
                                                            <Typography
                                                                style={{
                                                                    fontSize: '14px',
                                                                    color: 'black',
                                                                    textAlign: 'end'
                                                                }}
                                                            >
                                                                Valid till{' '}
                                                                <b style={{ marginLeft: '5px' }}>{formatDate(data.valid_till_date)}</b>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <Button
                                                onClick={handleCustomClick}
                                                className={classes.btn}
                                                color="secondary"
                                                variant="contained"
                                            >
                                                Customize
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                </div>
            </Container>
        </>
    );
};

export default ProductCard;
