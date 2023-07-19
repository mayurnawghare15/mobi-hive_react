import React, { useState } from 'react';
import MainCard from '../ui-component/cards/MainCard';
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Input,
    InputBase,
    Slide,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

function ViewKYCDetails({ open, setOpen, frontSide, backSide, documentType = 'BankStatement' }) {
    const [serialNumber, setSerialNumber] = useState('');
    const [issueBy, setIssueBy] = useState('');
    const [issueDate, setIssueDate] = useState('');

    // if (documentType === 'BankStatement') {
    //     backSide = false;
    // }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* Put Lead Details from Lead from */}
            <Dialog fullScreen open={open} onClose={handleClose} maxWidth="md">
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers>
                    <MainCard>
                        {frontSide && (
                            <>
                                <h3>
                                    <b> Front Side*</b>
                                </h3>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    fullWidth
                                    height={200}
                                    border={2}
                                    borderColor="grey.400"
                                    borderRadius={8}
                                >
                                    <IconButton variant="contained" color="primary" disableElevation style={{ borderRadius: 100 }}>
                                        <AddCircleOutlineRoundedIcon fontSize="large" />
                                    </IconButton>
                                </Box>
                            </>
                        )}

                        {backSide && (
                            <>
                                <h3>
                                    <b> Back Side*</b>
                                </h3>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    fullWidth
                                    height={200}
                                    border={2}
                                    borderColor="grey.400"
                                    borderRadius={8}
                                >
                                    <IconButton variant="contained" color="primary" disableElevation style={{ borderRadius: 100 }}>
                                        <AddCircleOutlineRoundedIcon fontSize="large" />
                                    </IconButton>
                                </Box>
                            </>
                        )}
                        <h3>
                            <b>Serial No*</b>
                        </h3>
                        <TextField
                            className="textfield"
                            type="text"
                            variant="outlined"
                            value={serialNumber}
                            name="employed_since"
                            onChange={(event) => setSerialNumber(event.target.value)}
                            fullWidth
                            required
                        />
                        <h3>
                            <b>Issue By</b>
                        </h3>
                        <TextField
                            className="textfield"
                            type="text"
                            variant="outlined"
                            value={issueBy}
                            name="employed_since"
                            onChange={(event) => setIssueBy(event.target.value)}
                            fullWidth
                            required
                        />
                        <h3>
                            <b>Issue Date</b>
                        </h3>

                        <TextField
                            className="textfield"
                            type="date"
                            variant="outlined"
                            value={issueDate}
                            name="employed_since"
                            onChange={(event) => setIssueDate(event.target.value)}
                            required
                        />
                    </MainCard>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ViewKYCDetails;
