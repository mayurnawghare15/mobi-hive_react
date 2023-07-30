import React from 'react';
import { Card, Skeleton } from '@mui/material';

const LoadingSkeleton = () => {
    return (
        <Card>
            <Skeleton variant="rect" height={200} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="30%" />
        </Card>
    );
};

export default LoadingSkeleton;
