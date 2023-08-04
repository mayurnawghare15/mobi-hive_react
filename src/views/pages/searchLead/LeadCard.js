import React, { useState } from 'react';
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
        width: '100%'
    },
    leadPictureContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
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
    }
}));

const LeadCard = () => {
    const classes = useStyles();
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
    };

    return (
        <Card className={classes.card}>
            <div className={classes.leadPictureContainer}>
                {imageLoading ? (
                    <img src={blankProfilePhoto} alt="Error" className={classes.leadPicture} />
                ) : (
                    <CardMedia
                        component="img"
                        className={classes.leadPicture}
                        src="/your_image_source.jpg"
                        alt="Your Image"
                        title="green iguana"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                )}
            </div>
            <div className={classes.contentContainer}>
                <CardContent>
                    <Typography gutterBottom variant="h4">
                        LeadName
                    </Typography>
                    <Typography mt={1} variant="body2" color="text.primary">
                        Sex: Male
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Phone: +1234567890
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Email: lizard@example.com
                    </Typography>
                    <Typography mt={2} variant="body2" color="text.primary">
                        Earning: $50,000 Installments: 12 Savings: $10,000 Dependents: 2
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
};

export default LeadCard;
