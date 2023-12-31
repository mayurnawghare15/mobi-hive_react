import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import { useEffect } from 'react';

const languageMap = {
    en: { label: 'English', dir: 'ltr', active: false },
    fr: { label: 'Français', dir: 'ltr', active: true },
    ar: { label: 'Arabic', dir: 'ltr', active: false },
    por: { label: 'Portuguese', dir: 'ltr', active: false }
};

// localStorage.setItem('i18nextLng', languageMap['en']);

const LanguageSelect = () => {
    let selected = localStorage.getItem('i18nextLng') === 'en-US' ? 'en' : localStorage.getItem('i18nextLng'); //First time show error
    const { t } = useTranslation();

    const [menuAnchor, setMenuAnchor] = React.useState(null);
    React.useEffect(() => {
        document.body.dir = languageMap[selected].dir;
    }, [menuAnchor, selected]);

    return (
        <div className="d-flex justify-content-end align-items-center language-select-root">
            <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
                {languageMap[selected].label}
                <ArrowDropDown fontSize="large" />
            </Button>
            <Popover
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <div>
                    <List>
                        <ListSubheader>{t('select_language')}</ListSubheader>
                        {Object.keys(languageMap)?.map((item) => (
                            <ListItem
                                button
                                key={item}
                                onClick={() => {
                                    i18next.changeLanguage(item);
                                    setMenuAnchor(null);
                                }}
                            >
                                {languageMap[item].label}
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Popover>
        </div>
    );
};

export default LanguageSelect;
