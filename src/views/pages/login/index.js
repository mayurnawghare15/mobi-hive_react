import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../../../ui-component/language/languageSelect';
import './style.css';

// material-ui
import { useTheme } from '@mui/material';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import Logo from './../../../ui-component/Logo';

import RestLogin from './RestLogin';
import AuthFooter from './../../../ui-component/cards/AuthFooter';
import { useEffect } from 'react';
import AuthWrapper1 from '../../../themes/AuthWrapper1';

//================================|| LOGIN MAIN ||================================//
const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
        localStorage.setItem('i18nextLng', 'en');
    }, []);

    const { t } = useTranslation();

    return (
        <>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <AuthWrapper1>
                    <Grid container justifyContent="right" color="primary">
                        <LanguageSelect color="red" />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: { xs: '100%', sm: '35%' }, minHeight: 'calc(100vh - 68px)', mx: 'auto' }}
                        >
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <RouterLink to="#">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        <label>{t('login')}</label>
                                                    </Typography>
                                                    <Typography
                                                        className="label"
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : ''}
                                                    >
                                                        <label>{t('enter_your_credentials_to_continue')}</label>
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RestLogin />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography
                                                    component={RouterLink}
                                                    to="/register"
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    <label>{t('dont_have_an_account')}</label>
                                                </Typography>
                                            </Grid>
                                        </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid>
                </AuthWrapper1>
            </Grid>
        </>
    );
};

export default Login;
