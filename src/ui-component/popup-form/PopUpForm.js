import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const PopupForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the form data, like sending it to an API

        // Clear form inputs
        setName('');
        setEmail('');

        // Close the popup
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Popup Form</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PopupForm;
