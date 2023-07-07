import React from 'react';

// material-ui
import { Link, Typography, Stack } from '@material-ui/core';

//-----------------------|| FOOTER - AUTHENTICATION 2 & 3 ||-----------------------//

const AuthFooter = () => {
    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <Typography
                    variant="subtitle2"
                    component={Link}
                    href="https://credithive.co.uk"
                    target="_blank"
                    underline="hover"
                ></Typography>
                <Typography variant="subtitle2" component={Link} href="https://credithive.co.uk" target="_blank" underline="hover">
                    &copy; credithive.co.uk
                </Typography>
            </Stack>
        </>
    );
};

export default AuthFooter;
