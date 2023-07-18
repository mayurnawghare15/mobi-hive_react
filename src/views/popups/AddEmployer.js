import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogActions, Container,
    FormControl,
    Grid,
    InputLabel,
    Stack,
    Button,
    DialogContent,
    TextField,
    Select,
    MenuItem,
    TextareaAutosize
} from '@material-ui/core';
import SubCard from '../../ui-component/cards/SubCard';

import { useTranslation } from 'react-i18next';
import { ChoiceListContext } from '../../context/ChoiceListContext';
import { useContext } from 'react';
import { BussinessSectorContext } from '../../context/BussinessSectorContext';

const CreateEmployerPopup = ({ show, setShow }) => {
    const { t } = useTranslation();
    const { data, isLoading } = useContext(ChoiceListContext);
    const { bussinessSectordata, bussinessSectordataIsLoading } = useContext(BussinessSectorContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <Dialog open={show}>
                <DialogTitle sx={{ fontSize: '1.2rem' }}>Add Employer </DialogTitle>
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
                                                label={t('Business Name')}
                                                value={"first_name"}
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
                                                <Select labelId="tittle-label" id="EmployerSector" name="EmployerSector" value={"kk"}>
                                                    {bussinessSectordataIsLoading ? <>Loading...</> : bussinessSectordata
                                                        ? bussinessSectordata.results.length > 0 ? bussinessSectordata.results.map((item, index) => (
                                                            <MenuItem value={item.text} id={item.id}>
                                                                {item.text}
                                                            </MenuItem>
                                                        )) : []
                                                        : null}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                className="textfield"
                                                type="text"
                                                variant="outlined"
                                                label={t('email')}
                                                value={"first_name"}
                                                name="first_name"

                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                className="textfield"
                                                type="text"
                                                variant="outlined"
                                                color="secondary"
                                                label={t('phone_number')}
                                                value={"middle_name"}
                                                name="middle_name"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                className="textfield"
                                                type="text"
                                                variant="outlined"
                                                color="secondary"
                                                label={t('whatsapp_number')}
                                                value={"middle_name"}
                                                name="middle_name"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel className="label" color="primary">
                                                <b>{t('Address')}*</b>
                                            </InputLabel>
                                            <FormControl mt={1} fullWidth>
                                                <TextareaAutosize
                                                    required
                                                    // value={current_address}
                                                    name="address"
                                                    // onChange={onInputChange}
                                                    minRows={5}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel className="label" id="tittle-label">
                                                    {t('City')}
                                                </InputLabel>
                                                <Select labelId="tittle-label" id="EmployerSector" name="EmployerSector" value={"kk"}>
                                                    {isLoading ? <>Loading...</> : data
                                                        ? data.cities.length > 0 ? data.cities.map((item, index) => (
                                                            <MenuItem value={item.name} id={item.slug}>
                                                                {item.name}
                                                            </MenuItem>
                                                        )) : []
                                                        : null}
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
                    <Button onClick={setShow}
                        color="warning"
                        alignItems="end"
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        {t('Close')}
                    </Button>
                    <Button onClick={onSubmit}
                        color="primary"
                        alignItems="end"
                        size="large"
                        type="submit"
                        variant="contained">
                        {t('Save')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateEmployerPopup;
