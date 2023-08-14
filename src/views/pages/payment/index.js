import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Card, Container, Typography, Grid, Collapse, CardHeader, IconButton } from '@mui/material';
import SubCard from '../../../ui-component/cards/SubCard';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import PhotoOfDevice from '../orderSumary/PhotoOfDevice';
import DeviceInfo from '../orderSumary/DeviceInfo';
import LeadIDCard from '../orderSumary/LeadIDCard';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import PaymentReceipt from './PaymentReceipt';
import PackageCard from '../orderSumary/FixedPackageCard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    card: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        marginBottom: theme.spacing(2),
        height: '100%'
    },
    photoContainer: {
        height: '100%',
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    CollapseCard: {
        height: 'auto'
    }
}));

const Payment = () => {
    const location = useLocation();
    const { state } = location;
    const { t } = useTranslation();
    const classes = useStyles();
    const saleData = state;

    useEffect(() => {}, []);
    const [leadCardExpanded, setLeadCardExpanded] = useState(false);
    const [packageCardExpanded, setPackageCardExpanded] = useState(false);

    return (
        <>
            <Grid item xs={12} md={12}>
                <Typography variant="h2" className={classes.heading}>
                    {t('Payment')}
                </Typography>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} mt={2}>
                    <Card className={classes.photoContainer}>
                        {saleData ? (
                            <>
                                <PhotoOfDevice deviceData={saleData} />
                                <DeviceInfo deviceData={saleData} />
                            </>
                        ) : (
                            <LoadingSkeleton />
                        )}
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard className={classes.CollapseCard}>
                        <CardHeader
                            title="Lead ID Card"
                            action={
                                <IconButton
                                    onClick={() => setLeadCardExpanded((prevExpanded) => !prevExpanded)}
                                    aria-label="expand"
                                    size="small"
                                >
                                    {leadCardExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            }
                        />
                        <Collapse in={leadCardExpanded} unmountOnExit>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} className={classes.card}>
                                    {/* {saleData ? <LeadIDCard leadInfo={saleData.prospect_id} /> : <LoadingSkeleton />} */}
                                </Grid>
                            </Grid>
                        </Collapse>
                        <CardHeader
                            title="Package information"
                            action={
                                <IconButton
                                    onClick={() => setPackageCardExpanded((prevExpanded) => !prevExpanded)}
                                    aria-label="expand"
                                    size="small"
                                >
                                    {packageCardExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            }
                        />
                        <Collapse in={packageCardExpanded} unmountOnExit>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} className={classes.card}>
                                    {saleData ? <PackageCard packageInfo={saleData} /> : <LoadingSkeleton />}
                                </Grid>
                            </Grid>
                        </Collapse>
                    </SubCard>
                    <PaymentReceipt saleData={saleData} />
                </Grid>
            </Grid>
        </>
    );
};

export default Payment;
