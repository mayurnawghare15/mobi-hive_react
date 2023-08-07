import React from 'react';
import { Card, CardContent, Typography, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';

// Create custom styles
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[3],
        minWidth: 300
    },
    title: {
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2)
    },
    details: {
        color: 'black',
        marginBottom: theme.spacing(1),
        marginTop: 2
    },
    iconText: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}));

const LeadIDCard = (props) => {
    const { leadInfo } = props;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h4" className={classes.title}>
                    {`Name: ${leadInfo.first_name} ${leadInfo.last_name}`}
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
                        <LocationCityIcon className={classes.icon} />
                        {leadInfo.city.city_name}
                    </div>
                </Typography>
                <Typography variant="body1" className={classes.details}>
                    {`Income ${leadInfo.monthly_income}, Paying ${leadInfo.monthly_installments} Installments & Saving ${leadInfo.monthly_saving} Monthly`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LeadIDCard;
