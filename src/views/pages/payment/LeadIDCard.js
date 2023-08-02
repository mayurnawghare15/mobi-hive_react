import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
        marginBottom: theme.spacing(1)
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
                    {`Phone: ${leadInfo.full_phones}`}
                </Typography>
                <Typography variant="body1" className={classes.details}>
                    {`Email: ${leadInfo.email}`}
                </Typography>
                <Typography variant="body1" className={classes.details}>
                    {`Date of Birth: ${leadInfo.date_of_birth}`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LeadIDCard;
