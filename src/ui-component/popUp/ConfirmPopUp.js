import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { Button } from 'react-bootstrap';

function ConfirmPopUp(setShowConfirmation) {
    const handleDOBSubmit = () => {
        console.log('Confirmed');
    };

    return (
        <>
            <DialogTitle sx={{ fontSize: '1.2rem' }}>Are You </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
                <Button onClick={handleDOBSubmit} color="primary">
                    Continue
                </Button>
                <Button onClick={() => setShowConfirmation(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </>
    );
}

export default ConfirmPopUp;
