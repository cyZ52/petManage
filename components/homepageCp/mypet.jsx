import React, { useEffect, useState } from 'react';
import styles from './mypet.module.scss'

import { Input, QRCode, Space, Button, Modal, Alert } from 'antd';

export default function MyPet() {
    const [codeUrl, setCodeUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const url = 'http://a132810.e1.luyouxia.net:25563/pay/wechatPay';
    const data = {
        token: '1',
        shop_id: '1'
    };

    function goPay() {
        setIsModalOpen(true);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data)
            console.log(data.data.code_url);
            setCodeUrl(data.data.code_url);
        }).catch(err => {
            console.log(err);
        })
        // alert('1')
    };


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setCodeUrl('');
    }, [isModalOpen]);



    return (
        <>

            <Button type="primary" onClick={goPay}>
                确认支付
            </Button>
            <Modal open={isModalOpen} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        取消支付
                    </Button>,
                    // <Button key="submit" type="primary" onClick={handleOk}>
                    //     确认支付
                    // </Button>
                ]}
            >
                <div className={styles['modal']}>
                    <h2 >订单详情</h2>
                    <div  className={styles['modal-qrcode']}>
                        {!codeUrl && (
                        <QRCode value="https://ant.design/" status="loading" />
                    )}
                    <QRCode value={codeUrl} />
                    </div>
                    
                </div>

            </Modal>


        </>
    )
}