import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PlaceOrderAPI from '../apicalls/PlaceOrderAPI';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    redButton: {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        marginRight: '10px',
        '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: 'white'
        }
    },
    confirmButton: {
        backgroundColor: 'white',
        color: theme.palette.success.main,
        border: `1px solid ${theme.palette.success.main}`,
        marginRight: '10px',
        '&:hover': {
            backgroundColor: theme.palette.success.main,
            color: 'white'
        }
    }
}));
export default function ResponsiveDialog(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const { confirmOrder, setConfirmOrder, selectedPackage, data, encrypted_mobile_Number, state } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [package_Type, setPackage_type] = useState(true);

    const pkgId = selectedPackage;
    const deviceId = data.device.id;
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }

    const handleConfirm = () => {
        setConfirmOrder(false);
        PlaceOrderAPI(token, state.leadid, deviceId, pkgId)
            .then((res) => {
                if (res) {
                    toast.success(res.message);
                    return navigate(`/ordersummary/${encodeURIComponent(encrypted_mobile_Number)}`, {
                        state: { ph_number: state.ph_number, leadid: state.leadid, deviceId: deviceId }
                    });
                }
            })
            .catch((error) => {
                // return toast.error('Something went wrong , Please check your internet connection.');
            });
    };

    const handleClose = () => {
        setConfirmOrder(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={confirmOrder}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                style: {
                    borderRadius: '16px',
                    padding: '16px',
                    minWidth: '300px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                }
            }}
        >
            <DialogTitle id="responsive-dialog-title" style={{ fontSize: '20px', textAlign: 'center', color: theme.palette.primary.main }}>
                {'Confirm Order'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{ fontSize: '18px', color: 'black' }}>
                    Are you sure you want to purchase the device with the selected package?
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                <Button variant="outlined" onClick={handleClose} className={classes.redButton}>
                    Deny
                </Button>
                <Button variant="contained" onClick={handleConfirm} className={classes.confirmButton}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
