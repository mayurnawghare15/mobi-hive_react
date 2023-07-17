import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogActions, Container,
    FormControl,
    Grid,
    InputLabel,
    SubCard, Stack
} from '@material-ui/core';

import { useTranslation } from 'react-i18next';

const VerifyUser = ({ recipent, verifyPopUp, setVerifyPopUp }) => {
    const { t } = useTranslation();
    return (
        <>
            <Dialog open={verifyPopUp}>
                <DialogTitle sx={{ fontSize: '1.2rem' }}>Are you {recipent} </DialogTitle>
                <DialogActions>
                    <Container fullWidth>
                        <form>
                            <SubCard>
                                <h3>Personal Details</h3>
                                <Stack spacing={1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControl fullWidth>
                                                <InputLabel className="label" id="tittle-label">
                                                    {t('title')}
                                                </InputLabel>
                                                {/* <Select labelId="tittle-label" id="tittle" name="saluation" value={saluation} onChange={onInputChange}>
                                                  
                                                </Select> */}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </SubCard>
                        </form>
                    </Container>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default VerifyUser;
