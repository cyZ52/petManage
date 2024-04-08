import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './discuss.module.scss';

import { Card, Table, Button, Modal, Form, Input, message } from 'antd';

export default function DiscussCP() {
    const [form] = Form.useForm();
    const [isModalShow, setIsModalShow] = useState(false);
    const [data, setData] = useState([]);

    const showModal = () => {
        setIsModalShow(true);
    }

    const handleCancel = () => {
        setIsModalShow(false);
    };

    async function handleOk() {
        try {
            const sessionUserInfo = sessionStorage.getItem('userInfo');
            const { username } = JSON.parse(sessionUserInfo);
            const form_data = await form.validateFields();

            const data = {
                username: username,
                user: form_data.user
            };

            axios.post('http://localhost:3001/discuss/askDiscuss', data).then(() => {
                setIsModalShow(false);
                message.success('发起提问成功!');
            })
        } catch (err) {
            console.log('提问时出现错误', err)
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3001/discuss/getDiscuss').then(response => {
            setData(response.data.data);
        })
    }, [])


    const columns = [
        {
            render: (_, record) => (
                <Card
                    title={`用户提问:${record.user}`}
                    bordered={false}
                >
                    <p><b>管理员回答:</b>{record.admin}</p>
                    <p className={styles['discuss-username']}>由用户 {record.username} 提出</p>
                </Card>
            )
        }
    ];

    return (
        <div className={styles['discuss-body']}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 4,
                }} />
            <Button onClick={showModal}>发起提问</Button>
            <Modal title='请写下你的问题' open={isModalShow} onOk={handleOk} onCancel={handleCancel} cancelText='取消' okText='发起提问'>
                <Form
                    name="nitify"
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 400,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        label="用户提问"
                        name="user"
                    >
                        <Input placeholder='请输入问题' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

}

