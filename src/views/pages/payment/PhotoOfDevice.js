import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PhotoOfDevice = ({ photoUrl }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Photo of the Device
                </Typography>
                <img src={photoUrl} alt="Device" style={{ maxWidth: '100%', height: 'auto' }} />
            </CardContent>
        </Card>
    );
};

export default PhotoOfDevice;
