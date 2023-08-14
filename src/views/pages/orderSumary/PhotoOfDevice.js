import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';
const APP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const useStyles = makeStyles((theme) => ({
    image: {
        marginTop: '1rem',
        maxWidth: '50%',
        height: 'auto'
    },
    textcards: {
        border: '2px solid black',
        padding: '0.5rem',
        textAlign: 'center'
    },
    tagsContainer: {
        marginTop: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    tag: {
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        backgroundColor: '#483285',
        color: theme.palette.common.white,
        marginLeft: '0.5rem',
        fontSize: '16px',
        fontWeight: 'bold'
    }
}));

const PhotoOfDevice = (props) => {
    const deviceData = props.deviceData;
    const classes = useStyles();
    return (
        <div>
            <CardContent>
                <Grid container justifyContent="space-between">
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h3" gutterBottom>
                            {deviceData.device.model_name}
                        </Typography>
                        <Grid container className={classes.tagsContainer}>
                            <Typography className={classes.tag}>{deviceData.device.device_type}</Typography>
                            <Typography className={classes.tag}>{deviceData.order_sr_id}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <img src={APP_IMAGE_URL + deviceData.device.photo} className={classes.image} alt={deviceData.device.model_name} />
                    </Grid>
                </Grid>
            </CardContent>
        </div>
    );
};

export default PhotoOfDevice;
