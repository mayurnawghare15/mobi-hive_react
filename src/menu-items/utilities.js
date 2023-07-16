// assets
import { IconBrandFramer, IconZoomCheck, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';
import CreateIcon from '@mui/icons-material/Create';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

// constant
const icons = {
    IconeCreateLead: IconZoomCheck,
    CreateIcon: CreateIcon,
    DocumentScannerIcon: DocumentScannerIcon,
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
<<<<<<< HEAD
            title: 'KYC ',
=======
            title: 'Create Lead',
>>>>>>> 5fce6f9f8e5358a1507504b3dbd27ee719c5f8c5
            type: 'item',
            url: '/lead/createlead',
            icon: icons['CreateIcon'],
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'KYC',
            type: 'item',
            url: '/lead/kyc',
            icon: icons['DocumentScannerIcon'],
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
