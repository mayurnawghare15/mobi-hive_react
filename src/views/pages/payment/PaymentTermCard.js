import React from 'react';
import { Card, CardContent, Typography, Button, IconButton, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../hooks/useAuthContext';
import DeleteOrderAPI from '../../../apicalls/DeleteOrderAPI';
import { handleDelete } from '../../../helper/deleteOrder';

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[3]
    },
    buttonsContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignContent: 'flex-end'
    },
    acceptButton: {
        marginRight: theme.spacing(1)
    }
}));

const PaymentTermsCard = ({ saleData }) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const orderId = saleData.order_id;
    const leadId = saleData.prospect_id.id;
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }

    const handleAccept = () => {
        return navigate(`/payment/`, { state: saleData });
    };

    const handleDeletebtn = () => {
        handleDelete(token, orderId, leadId);
    };
    // const handleDelete = () => {
    //     const input = window.confirm('Are you sure , You want to delete the order');
    //     if (input) {
    //         try {
    //             DeleteOrderAPI(token, orderId, leadId)
    //                 .then((res) => {
    //                     if (res) {
    //                         toast.success('Order Deleted Successfully');
    //                         // navigate(-1);
    //                         window.history.  back();
    //                     }
    //                 })
    //                 .catch((error) => {});
    //         } catch (error) {}
    //     }
    // };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant="h4">
                    Payment Term(s)
                    <hr />
                </Typography>
                <Typography variant="h5">
                    By clicking next that is presented to you at the time of your Order, or by using or accessing Credithive products, you
                    indicate your assent to be bound by our TOS Agreement.
                </Typography>
                <Grid container className={classes.buttonsContainer}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<CheckIcon />}
                            onClick={handleAccept}
                            className={classes.acceptButton}
                        >
                            Accept & Pay
                        </Button>
                    </Grid>
                    <Grid item>
                        <IconButton color="error" onClick={handleDeletebtn}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PaymentTermsCard;
