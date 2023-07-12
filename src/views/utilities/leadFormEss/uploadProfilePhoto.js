import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const UploadPhotoBox = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        setSelectedPhoto(URL.createObjectURL(file));
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width={200}
            height={200}
            border="2px dashed gray"
            borderRadius={4}
            p={2}
        >
            {selectedPhoto ? (
                <img src={selectedPhoto} alt="Uploaded" width="100%" height="100%" />
            ) : (
                <>
                    <Typography variant="body1">Upload your photo</Typography>
                    <input accept="image/*" type="file" onChange={handlePhotoUpload} style={{ display: 'none' }} id="photo-upload" />
                    <label htmlFor="photo-upload">
                        <Button variant="contained" component="span">
                            Choose File
                        </Button>
                    </label>
                </>
            )}
        </Box>
    );
};

export default UploadPhotoBox;
