import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CardHeader, Grid } from '@mui/material';
import samA03 from '../../assets/images/samsungA03.png';
import './style.css';

import ImageCarousel from './ImageCarousel';

export default function PhoneCard() {
    const carouselImages = [samA03, samA03, samA03];

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={
                    <Typography variant="h3" component="div">
                        SAMSUNG
                    </Typography>
                }
                action={
                    <Grid>
                        <Typography mr={2} variant="h4" component="div" textAlign="right">
                            Cash
                        </Typography>
                        <Typography mt={1} mr={3} variant="h3" component="div" textAlign="right">
                            $400
                        </Typography>
                    </Grid>
                }
            />
            <hr />
            <div className="imageCarousel">
                <ImageCarousel className="image" images={carouselImages} />
            </div>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    4GB Ram, 64GB Storage, Expandable up to 2GB, Battery 5000mAh, OS Android 13.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions>
        </Card>
    );
}
