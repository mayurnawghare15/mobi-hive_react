import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import blankProfilePhoto from '../../../assets/images/blank-profile-picture.png';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 16,
        boxShadow: '0px 4px 8px rgba(0, 0, 0.3, 0.5)',
        margin: theme.spacing(0.5),
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '100%',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }
    },
    leadPictureContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        marginLeft: theme.spacing(2)
    },
    leadPicture: {
        width: 160,
        height: 160,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    contentContainer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(0.5)
    },
    cardActions: {
        justifyContent: 'flex-end'
    },
    viewDetailsButton: {
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline'
        }
    }
}));

const LeadCard = (props) => {
    const classes = useStyles();
    const user = props.user;
    console.log(user);
    const handleViewDetails = () => {
        alert('clicked');
        // return navigate(`/eligibledevices/${encodeURIComponent(mobile_Number)}`, {
        //     state: { ph_number: state.ph_number, leadid: lead_id }
        // });
    };

    return (
        <Card className={classes.card}>
            <div className={classes.leadPictureContainer}>
                <CardMedia
                    component="img"
                    className={classes.leadPicture}
                    src={user.photo ? user.photo : blankProfilePhoto}
                    alt="Your Image"
                />
            </div>
            <div className={classes.contentContainer}>
                <CardContent>
                    <Typography gutterBottom variant="h4">
                        {user.full_name}
                    </Typography>
                    <Typography mt={1} variant="body2" color="text.primary">
                        Gender: {user.gender}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Phone: {user.full_phones}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Email: {user.email}
                    </Typography>
                    <Typography mt={2} variant="body2" color="text.primary">
                        Monthly Income: {user.monthly_income} Savings: {user.monthly_saving} Dependents: {user.total_dependents} Working
                        Details: {user.working_details}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button className={classes.viewDetailsButton} size="small">
                        View Details
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
};

export default LeadCard;
