import * as React from 'react';

import { Grid } from '@mui/material';

import PhoneCard from '../../../components/phoneCard/PhoneCard';

const EligibleDevices = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <PhoneCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <PhoneCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <PhoneCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <PhoneCard />
                </Grid>
            </Grid>
        </>
    );
};
export default EligibleDevices;
