import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form, Input, InputNumber, Modal, Radio, message } from 'antd';



export default function SetProductModal() {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    }

    async function handleOk() {
        // 此处发送post请求
        const form_data = await form.validateFields();

        console.log('新发布的系统通知内容:', form_data);

        const postData = {
            ...form_data
        };

        const response = await axios.post('http://localhost:3001/product/setProduct', postData);

        // 打印服务器返回的json数据
        console.log('服务器返回的json数据', response);
        message.success('新增商品信息成功!');
        setConfirmLoading(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setConfirmLoading(false);
            window.location.reload();
        }, 1500);
    }

    const handelCancel = () => {
        setIsModalOpen(false);
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                新增商品
            </Button>
            <Modal title='发布新的系统通知' open={isModalOpen} confirmLoading={confirmLoading} okText='发布' onOk={handleOk} cancelText='取消' onCancel={handelCancel}>
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
                        label="商品名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品名称!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="商品照片"
                        name="photo"
                        rules={[
                            {
                                required: true,
                                message: '请输入内容!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="商品金额"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: '请确定商品金额!',
                            },
                        ]}
                    >
                        <InputNumber min={1} max={10000}/>
                    </Form.Item>

                    <Form.Item
                        label="商品描述"
                        name="detail"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品名描述!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="上架状态"
                        name="onsale"
                        rules={[
                            {
                                required: true,
                                message: '请选择上架状态!',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={true}>上架</Radio>
                            <Radio value={false}>不上架</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
