import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const LeadIDCard = ({ leadInfo }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>{`Name: ${leadInfo.name}`}</Typography>
                <Typography variant="body1">{`Email: ${leadInfo.email}`}</Typography>
                <Typography variant="body1">{`Phone: ${leadInfo.phone}`}</Typography>
                <Typography variant="body1">{`Address: ${leadInfo.address}`}</Typography>
            </CardContent>
        </Card>
    );
};

export default LeadIDCard;
