import React, { useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import FaceRecogination from './faceApi/faceRecogination';
import WebcamCapture from './WebcamCapture';

function KYCdocument() {
    const [profilephoto, setProfilePhoto] = useState();

    return (
        <>
            <MainCard>
                <h1>Prospect eKYC</h1>
                {/* <WebcamCapture />
                 */}
                <FaceRecogination />
            </MainCard>
        </>
    );
}

export default KYCdocument;
