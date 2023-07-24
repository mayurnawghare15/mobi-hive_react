import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Container,
    FormControl,
    Grid,
    InputLabel,
    Stack,
    Button,
    DialogContent,
    TextField,
    Select,
    MenuItem
} from '@mui/material';
import SubCard from '../../ui-component/cards/SubCard';

import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { BussinessSectorContext } from '../../context/BussinessSectorContext';

const AddOccupationPopup = ({ show, setShow }) => {
    const { t } = useTranslation();
    const { bussinessSectordata, bussinessSectordataIsLoading } = useContext(BussinessSectorContext);

    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <Dialog open={show}>
                <DialogTitle sx={{ fontSize: '1.2rem' }}>Add Occupation </DialogTitle>
                <DialogContent>
                    <Container fullWidth>
                        <form>
                            <SubCard>
                                <Stack spacing={1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                className="textfield"
                                                type="text"
                                                variant="outlined"
                                                label={t('Occupation')}
                                                value={'first_name'}
                                                name="first_name"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel className="label" id="tittle-label">
                                                    {t('EmployerSector')}
                                                </InputLabel>
                                                <Select labelId="tittle-label" id="EmployerSector" name="EmployerSector" value={'kk'}>
                                                    {bussinessSectordataIsLoading ? (
                                                        <>Loading...</>
                                                    ) : bussinessSectordata ? (
                                                        bussinessSectordata.results.length > 0 ? (
                                                            bussinessSectordata.results.map((item, index) => (
                                                                <MenuItem value={item.text} id={item.id}>
                                                                    {item.text}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            []
                                                        )
                                                    ) : null}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </SubCard>
                        </form>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setShow} color="warning" alignItems="end" size="large" type="submit" variant="contained">
                        {t('Close')}
                    </Button>
                    <Button onClick={onSubmit} color="primary" alignItems="end" size="large" type="submit" variant="contained">
                        {t('Save')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddOccupationPopup;
