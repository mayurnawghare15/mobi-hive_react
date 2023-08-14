import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import LoadingSkeleton from '../../../components/LoadingSkeleton';

const CustomCard = ({ title, content }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card sx={{ minWidth: 300, border: '1px solid rgba(211,211,211,0.6)' }}>
                <CardHeader
                    title={title}
                    action={
                        <IconButton onClick={() => setOpen(!open)} aria-label="expand" size="small">
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    }
                />
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Container sx={{ lineHeight: 2 }}>{content}</Container>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};

export default function DevieInfo({ deviceData }) {
    return (
        <>
            {deviceData ? (
                <>
                    <CustomCard
                        title="Specification"
                        content={<div dangerouslySetInnerHTML={{ __html: deviceData.device.device_summary }} />}
                    />
                    <CustomCard
                        title="About Device"
                        content={<div dangerouslySetInnerHTML={{ __html: deviceData.device.about_device }} />}
                    />
                </>
            ) : (
                <LoadingSkeleton />
            )}
        </>
    );
}
