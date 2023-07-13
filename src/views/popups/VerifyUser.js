import React, { useState } from 'react'
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';


const VerifyUser = ({ recipent,showPopup,setShowPopup }) => {
    return (
        <>
            <Dialog open={showPopup}>
                <DialogTitle sx={{ fontSize: '1.2rem' }}>Are you {recipent} </DialogTitle>

                <DialogActions>
                    <Button onClick={""} color="primary">
                        Yes
                    </Button>
                    <Button onClick={() => setShowPopup(false)} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default VerifyUser