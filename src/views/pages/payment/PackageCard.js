import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PackageCard = ({ packageInfo }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Selected Package
                </Typography>
                <Typography variant="body1">{`Package Name: ${packageInfo.name}`}</Typography>
                <Typography variant="body1">{`Price: $${packageInfo.price.toFixed(2)}`}</Typography>
                {/* Add more package details as needed */}
            </CardContent>
        </Card>
    );
};

export default PackageCard;
