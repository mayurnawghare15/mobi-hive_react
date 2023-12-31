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
    Slider,
    Grid,
    Button,
    Radio,
    OutlinedInput,
    Input
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import { useTranslation } from 'react-i18next';
import { handleDelete } from '../../../helper/deleteOrder';
import { useAuthContext } from '../../../hooks/useAuthContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        padding: theme.spacing(2)
    },
    container: {
        width: 'auto'
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[3]
    },
    title: {
        textAlign: 'center',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
        color: theme.palette.text.primary
    },
    heading: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'black'
    },
    sliderContainer: {
        margin: '0 auto',
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    slider: {
        width: '80%',
        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
        '& .MuiSlider-track': {
            border: `1px solid ${theme.palette.primary.main}`
        },
        '& .MuiSlider-thumb': {
            width: 24,
            height: 24,
            backgroundColor: theme.palette.secondary.main,
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none'
            }
        }
    },

    sliderRow: {
        width: '100%',
        display: 'flex',
        gap: theme.spacing(2),
        alignItems: 'center',
        marginTop: theme.spacing(2)
    },
    button: {
        minWidth: '25px',
        padding: '6px',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    slider: {
        width: '100%',
        color: theme.palette.secondary.main
    },
    inputFields: {
        gap: theme.spacing(2),
        alignItems: 'center',
        marginTop: theme.spacing(2)
    }
}));

const CustomPackageCard = ({ packageInfo }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const applied_package = packageInfo.custom_package;
    const [sliderValue, setSliderValue] = useState(50);
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }

    // console.log(packageInfo);
    console.log(applied_package);
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };
    const handleIncrement = () => {
        setSliderValue((prevValue) => prevValue + 1);
    };

    const handleDecrement = () => {
        setSliderValue((prevValue) => prevValue - 1);
    };
    const handleDeletebtn = () => {
        handleDelete(token, packageInfo.order_id, packageInfo.id);
    };
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title} gutterBottom>
                    {/* Package Name - {applied_package.package_name} */}
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" className={classes.heading}>
                                            {packageInfo.currency} {parseFloat(packageInfo.max_retail_price) + sliderValue}
                                            <Typography mt={2} variant="body1">
                                                Upfront Amount
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            {packageInfo.currency_prefix} {packageInfo.prorated_advance}
                                            <Typography mt={2} variant="body1">
                                                Prorated Installment
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            {packageInfo.currency_prefix} {packageInfo.installment_amount}
                                            <Typography mt={2} variant="body1">
                                                Monthly / weekly
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className={classes.sliderContainer}>
                            <Typography className={classes.heading}>Upfront Payment *</Typography>
                            <Typography variant="body1">Drag the slider to adjust upfront payment</Typography>
                            <div className={classes.sliderRow}>
                                <Button className={classes.button} onClick={handleDecrement}>
                                    -
                                </Button>
                                <Slider
                                    aria-label="time-indicator"
                                    size="small"
                                    value={sliderValue}
                                    min={0}
                                    step={1}
                                    onChange={handleSliderChange}
                                    className={classes.slider}
                                />
                                <Button className={classes.button} onClick={handleIncrement}>
                                    +
                                </Button>
                            </div>
                        </div>
                        <Grid xs={12} container className={classes.inputFields}>
                            <Grid xs={12} mt={2} sm={3}>
                                <Typography className={classes.heading}>{t('duration')}*</Typography>
                                <Radio></Radio>
                            </Grid>
                            <Grid xs={12} mt={2} ml={6} sm={6}>
                                <Typography className={classes.heading}>{t('repayment')}*</Typography>
                                <Radio></Radio>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.inputFields}>
                            <Grid xs={12} mt={2} sm={6}>
                                <Typography className={classes.heading}>Order Date*</Typography>
                                <OutlinedInput size="small" type="date" />
                            </Grid>
                            <Grid xs={12} mb={2} mt={2} sm={6}>
                                <Typography className={classes.heading}>Installment Start Date*</Typography>
                                <OutlinedInput size="small" type="date" />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CustomPackageCard;
