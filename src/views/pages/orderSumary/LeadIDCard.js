import React from 'react';
import { Card, CardContent, Typography, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { readData } from '../../../utils/indexDB';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: '#e3f2fd',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),

        minWidth: 200,
        height: 250
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2)
    },
    details: {
        color: 'black',
        marginBottom: theme.spacing(1),
        marginTop: 2,
        color: 'black',
        fontSize: "15px"
    },
    income: {
        color: 'black',
        marginBottom: theme.spacing(1),
        marginTop: 2,
        color: 'black',
        fontSize: "14px",
        fontWeight: 'bold'

    },
    iconText: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}));

const LeadIDCard = (leadInfo) => {
    const classes = useStyles();
    leadInfo = leadInfo.leadInfo;
    console.log(leadInfo);

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h4" className={classes.title}>
                    {`Name :  ${leadInfo.first_name} ${leadInfo.last_name}`}
                </Typography>
                <Typography variant="body1" className={classes.details}>
                    <div className={classes.iconText}>
                        <LocalPhoneIcon className={classes.icon} />
                        {leadInfo.full_phones}
                    </div>
                </Typography>
                <Typography variant="body1" className={classes.details}>
                    <div className={classes.iconText}>
                        <EmailIcon className={classes.icon} />
                        {leadInfo.email}
                    </div>
                </Typography>
                <Typography variant="body1" className={classes.details}>
                    {`Date of Birth: ${leadInfo.date_of_birth}`}
                </Typography>
                <Typography variant="body1" className={classes.details}>
                    <div className={classes.iconText}>
                        <LocationOnOutlinedIcon className={classes.icon} />
                        {leadInfo.city_name}
                    </div>
                </Typography>
                <Typography variant="body1" className={classes.income}>
                    {`Income ${leadInfo.currency} ${leadInfo.monthly_income}, Paying  ${leadInfo.currency} ${leadInfo.monthly_installments} Installments & Saving  ${leadInfo.currency} ${leadInfo.monthly_saving} Monthly`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LeadIDCard;
