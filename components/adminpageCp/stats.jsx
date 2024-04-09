import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import UploadImgCP from '../uploadImg';

import { Button } from 'antd';

export default function TextCP() {
    function a(url){
        console.log('fn');
    }
    return (
        <UploadImgCP fn={a}/>
    )
}