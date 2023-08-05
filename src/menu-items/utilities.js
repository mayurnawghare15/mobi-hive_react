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
    title: 'Menu',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Recent Leads',
            type: 'item',
            url: '/search',
            icon: icons['IconeCreateLead'],
            breadcrumbs: true
        },
        {
            id: 'util-createLead',
            title: 'Create Lead',
            type: 'item',
            url: '/lead/verify-phonenumber',
            icon: icons['CreateIcon'],
            breadcrumbs: true
        }
        // {
        //     id: 'util-color',
        //     title: 'Create Lead',
        //     type: 'item',
        //     url: '/lead/createlead/:mobile_Number',
        //     icon: icons['CreateIcon'],
        //     breadcrumbs: false
        // },
        // {
        //     id: 'util-shadow',
        //     title: 'KYC',
        //     type: 'item',
        //     url: '/lead/kyc',
        //     icon: icons['DocumentScannerIcon'],
        //     breadcrumbs: false
        // },
        // {
        //     id: 'util-Devices',
        //     title: 'Eligible Devices',
        //     type: 'item',
        //     url: '/eligibledevices',
        //     icon: icons['DocumentScannerIcon'],
        //     breadcrumbs: false
        // }
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     icon: icons['IconWindmill'],
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};
