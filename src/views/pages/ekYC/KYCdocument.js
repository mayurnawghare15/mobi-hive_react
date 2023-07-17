import React, { useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import FaceRecogination from './faceApi/faceRecogination';

function KYCdocument() {
    const [profilephoto, setProfilePhoto] = useState();

    return (
        <>
            <FaceRecogination />
            <MainCard>
                <h1>Prospect eKYC</h1>
            </MainCard>
        </>
    );
}

export default KYCdocument;
