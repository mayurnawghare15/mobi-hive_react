import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, styled, ThemeProvider } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const DarkMode = ({ onClick }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const theme = useTheme();

    const handleDarkModeToggle = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    control={<Switch sx={{ m: 1 }} checked={isDarkMode} onChange={handleDarkModeToggle} />}
                    label={isDarkMode ? 'Dark' : 'Light'}
                />
            </FormGroup>
        </>
    );
};

export default DarkMode;
