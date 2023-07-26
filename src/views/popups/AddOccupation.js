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
import AddOcupationAPI from '../../apicalls/AddOccupationAPI';
import { useAuthContext } from '../../hooks/useAuthContext';
import { toast } from 'react-toastify';

const AddOcupationPopup = ({ show, setShow, setCallOccuptionApi }) => {
    const { user } = useAuthContext();
    const { t } = useTranslation();
    const { bussinessSectordata, bussinessSectordataIsLoading } = useContext(BussinessSectorContext);

    const [formOccupation, setFormOccupation] = useState({
        text: '',
        selected_text: ''
    });
    let token = null;
    if (user) {
        token = user.token;
    }

    const { text, selected_text } = formOccupation;
    const onInputChange = (e) => {
        const { name, value } = e.target;

        console.log(name + ' ' + value);

        setFormOccupation({
            ...formOccupation,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        AddOcupationAPI(formOccupation, token)
            .then((res) => {
                if (res) {
                    console.log(res + ' Res ');
                    setShow();
                    setFormOccupation({
                        text: '',
                        selected_text: ''
                    });
                    setCallOccuptionApi(true);
                    toast.success('Occupation added successfully');
                } else {
                    // setIsLoading(false)
                    // setCreateLeadForm([])
                }
            })
            .catch((error) => {
                return toast.error('Something went wrong , Please check your internet connection.');
            });
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
                                                onChange={onInputChange}
                                                value={text}
                                                name="text"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel className="label" id="tittle-label">
                                                    {t('EmployerSector')}
                                                </InputLabel>
                                                <Select
                                                    label={t('EmployerSector')}
                                                    labelId="tittle-label"
                                                    id="employee_sector_selected_text"
                                                    name="selected_text"
                                                    onChange={onInputChange}
                                                    value={selected_text}
                                                >
                                                    {bussinessSectordataIsLoading ? (
                                                        <>Loading...</>
                                                    ) : bussinessSectordata ? (
                                                        bussinessSectordata.results.length > 0 ? (
                                                            bussinessSectordata.results.map((item, index) => (
                                                                <MenuItem value={item.id} id={item.id}>
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

export default AddOcupationPopup;
