import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Grid } from '@mui/material';

const Form = () => {
    const [name, setName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <TextField
                        label="Name"
                        error={name.length === 0}
                        helperText={!name.length ? 'Name is required' : ''}
                        variant="outlined"
                        fullWidth
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Middle Name"
                        variant="outlined"
                        fullWidth
                        value={middleName}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControlLabel label="Last Name" />
                    <TextField
                        label="Last Name"
                        error={name.length === 0}
                        helperText={!name.length ? 'Name is required' : ''}
                        variant="outlined"
                        fullWidth
                        value={lastName}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Name" variant="outlined" fullWidth value={name} required onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid>
                    <TextField label="Email" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel control={<Checkbox />} label="Subscribe to newsletter" />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default Form;
