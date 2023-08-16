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
            <Card sx={{ marginTop: '15px', minWidth: 300, cursor: 'pointer' }}>
                <CardHeader
                    onClick={() => setOpen(!open)}
                    title={title}
                    action={
                        <IconButton aria-label="expand" size="small">
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    }
                />
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <CardContent style={{ fontSize: '14px', color: "black" }}>
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
