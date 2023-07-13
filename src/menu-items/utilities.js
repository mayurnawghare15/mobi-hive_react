// assets
import { IconBrandFramer, IconZoomCheck, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

// constant
const icons = {
    IconeCreateLead: IconZoomCheck,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconWindmill: IconWindmill,
    IconBrandFramer: IconBrandFramer,
    IconLayoutGridAdd: IconLayoutGridAdd
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Verify Phone Number',
            type: 'item',
            url: '/lead/verify-phonenumber',
            icon: icons['IconeCreateLead'],
            breadcrumbs: true
        },
        {
            id: 'util-color',
            title: 'Create Lead',
            type: 'item',
            url: '/lead/createlead',
            icon: icons['IconPalette'],
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons['IconShadow'],
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Icons',
            type: 'collapse',
            icon: icons['IconWindmill'],
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};
