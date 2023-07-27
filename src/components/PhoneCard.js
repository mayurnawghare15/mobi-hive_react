import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, CardHeader } from '@mui/material';
import samA03 from '../assets/images/samsungA03.png';
import { Button } from 'react-bootstrap';

export default function PhoneCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader>OEM</CardHeader>
            <CardActionArea>
                <CardMedia component="img" height="140" image={samA03} alt="green iguana" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except
                        Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions>
        </Card>
    );
}
