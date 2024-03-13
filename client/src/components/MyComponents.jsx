import React, { useState } from 'react';
import UserInfo from './UserInfo';
import DOCSUpload from './uploading/DOCSUpload';

const MyComponents = () => {
    return (
        <div>
            <UserInfo />
            <DOCSUpload />
        </div>
    )
}

export default MyComponents;