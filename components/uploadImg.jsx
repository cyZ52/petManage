import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';


import { Button, message } from 'antd';

export default function UploadImgCP({ fn }) {
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');

    // 发送请求获取图片的 URL

    function handelClick() {
        fileInputRef.current.click();
    }
    function handleChange(e) {
        const file = e.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        // 发送请求
        axios.post('http://localhost:3001/uploadImg', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data.url);
                setImageUrl(response.data.url);
                message.success('上传照片成功!');
                fn(response.data.url);
            })
            .catch(err => {
                console.error('上传图片发生错误:', err);
            });
    }

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleChange(e)}
            />
            <Button type='primary' onClick={() => handelClick()}>上传图片</Button>
        </>

    );
}