import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    carouselImage: {
        height: '300px',
        objectFit: 'cover'
    },
    iconButton: {
        cursor: 'pointer'
    }
}));

const ImageCarousel = ({ images }) => {
    const classes = useStyles();
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={8} lg={6}>
                    <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} className={classes.carouselImage} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                        {`${currentImage + 1} / ${images.length}`}
                    </Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={3} align="right">
                    <ChevronLeftIcon className={classes.iconButton} onClick={handlePrev} />
                </Grid>
                <Grid item xs={6} md={4} lg={3} align="left">
                    <ChevronRightIcon className={classes.iconButton} onClick={handleNext} />
                </Grid>
            </Grid>
        </div>
    );
};

export default ImageCarousel;
