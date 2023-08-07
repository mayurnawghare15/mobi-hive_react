import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        marginTop: theme.spacing(1),
        height: 'auto',
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: theme.spacing(1)
    },
    heading: {
        alignItems: 'center',
        display: 'flex'
    },
    content: {},
    formControl: {
        marginBottom: theme.spacing(1),
        width: '100%'
    },
    labels: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'black'
    },
    input: {
        display: 'none'
    },
    button: {
        marginTop: theme.spacing(2)
    },
    fileName: {
        marginLeft: theme.spacing(2),
        color: theme.palette.text.secondary
    },
    title: {
        fontSize: '1.6rem',
        fontWeight: 'bold',
        marginRight: theme.spacing(2)
    },
    proofLabel: {
        fontSize: '1.2rem',
        color: 'black'
    }
}));

const PaymentReceipt = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Card className={classes.card}>
            <CardHeader title={t('Payment')} />

            <CardContent className={classes.content}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel className={classes.labels} htmlFor="monthly-income">
                                {t('amount')} *
                            </InputLabel>
                            <OutlinedInput
                                type="number"
                                id="monthly-income"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label={t('amount')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth className={classes.formControl}>
                            <TextField label={t('Receipt')} type="text" variant="outlined" fullWidth name="customer_locality" required />
                        </FormControl>
                    </Grid>
                </Grid>

                <Typography mt={2} className={classes.proofLabel}>
                    Payment Proof
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                    <input accept="image/*" className={classes.input} ref={fileInputRef} type="file" onChange={handleFileChange} />
                    <Button variant="contained" color="secondary" component="span" className={classes.button} onClick={handleButtonClick}>
                        <b style={{ color: 'white' }}>Upload</b>
                    </Button>
                    {selectedFile ? (
                        <Typography variant="body2" className={classes.fileName}>
                            {selectedFile.name}
                        </Typography>
                    ) : (
                        <Typography variant="body2" className={classes.fileName}>
                            No file selected
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default PaymentReceipt;
