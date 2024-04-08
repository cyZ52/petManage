import React, { useEffect, useState } from 'react';
import { Button, Table, message, Modal, Form, Input } from 'antd';
import axios from 'axios';

export default function DiscussCp() {
    const [form] = Form.useForm();
    const [isModalShow, setIsModalShow] = useState(false);
    const [currentRecord,setCurrentRecord] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:3001/discuss/getDiscuss').then(response => {
                setData(response.data.data);
            })
        }
        catch (err) {
            console.log('获取所有商品发生错误', err);
        }
    }, []);

    const showModal = (record) => {
        setCurrentRecord(record);
        setIsModalShow(true);
    }

    const handleCancel = () => {
        setIsModalShow(false);
    };

    async function handleAnswer(username, user) {
        try {
            const form_data = await form.validateFields();


            const upData = {
                username: username,
                user: user,
                ...form_data
            }

            axios.post('http://localhost:3001/discuss/answerDiscuss', upData).then(() => {
                setIsModalShow(false);
                message.success('回答成功!');
                setTimeout(() => {
                    window.location.reload();
                }, 500)
            })
        } catch (err) {
            console.log('回答问题时出错', err);
        }
    }


    const columns = [
        {
            title: '用户',
            dataIndex: 'username',
        },
        {
            title: '用户提问',
            dataIndex: 'user',
        },
        {
            title: '管理员回答',
            dataIndex: 'admin',
        },
        {
            title: '操作',
            width: 100,
            render: (_, record) => (
                <>
                    <Button onClick={() => showModal(record)}>回答</Button>
                    <Modal title='回答当前问题' open={isModalShow} onCancel={handleCancel} onOk={() => handleAnswer(currentRecord.username, currentRecord.user)} cancelText='取消' okText='确认回答'>
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
                                label="回答问题"
                                name="admin"
                            >
                                <Input placeholder='请回答问题' />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>

            )
        },
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            pagination={{
                pageSize: 10,
              }}
        />
    );
};