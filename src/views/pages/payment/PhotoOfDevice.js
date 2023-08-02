import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    image: {
        marginTop: '1rem', // Adjusted the margin for better spacing
        maxWidth: '100%',
        height: 'auto'
    },
    textcards: {
        border: '2px solid black',
        padding: '0.5rem',
        textAlign: 'center'
    },
    tagsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '0.5rem'
    },
    tag: {
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        marginLeft: '0.5rem'
    }
}));

const PhotoOfDevice = (props) => {
    const deviceData = props.deviceData;
    const classes = useStyles();
    console.log(deviceData);
    return (
        <div>
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {deviceData.model_name}
                </Typography>
                <Grid container className={classes.tagsContainer}>
                    <Typography className={classes.tag}>Phones</Typography>
                    <Typography className={classes.tag}>Sale Order</Typography>
                </Grid>
                <img src={deviceData.photo} className={classes.image} alt="Device" />
            </CardContent>
        </div>
    );
};

export default PhotoOfDevice;
