import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Button, Form, Input, Modal, Radio, Space, Table, Tag, message } from 'antd';




export default function PetHealthyCp() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);

    
    function onCancel() {
        setIsShow(false);
        form.resetFields();
    }
    
    function showModal(record) {
        setCurrentRecord(record);
        setIsShow(true);
    }
    
    async function changeHealthy() {
        const form_data = await form.validateFields();
        
        const updateData = {
            username: currentRecord.username,
            petname: currentRecord.petname,
            ...form_data
        };
        
        axios.post('http://localhost:3001/foster/changeHealthy', updateData).then(() => {
            message.success('修改健康状态成功,即将前往管理页面查看');
            setTimeout(() => {
                router.push('/admin/petfoster/petlist');
            }, 500);
        })
    }
    
    useEffect(() => {
        axios.get('http://localhost:3001/foster/getAllFosterList').then((response) => {
            setData(response.data.data);
        });
    }, [])
    
    const columns = [
        {
            title: '宠物名称',
            dataIndex: 'petname',
            key: 'petname',
        },
        {
            title: '所属用户',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '健康状态',
            key: 'healthy',
            dataIndex: 'healthy',
            render: (healthy) => (
                <Tag color={healthy === '良好' ? 'green' : 'geekblue'}>{healthy}</Tag>
            ),
        },
        {
            title: '更改状态',
            key: 'isnew',
            dataIndex: 'isnew',
            render: (_, record) => (
                <>
                    <Button onClick={() => showModal(record)}>修改</Button>
                    <Modal onCancel={onCancel} onOk={() => changeHealthy()} open={isShow} okText='确认修改' cancelText='取消'>
                        <h3>修改健康状态</h3>
                        <Form
                            name="healthy"
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
                        >
                            <Form.Item
                                label="健康状态"
                                name="healthy"
                            >
                                <Input placeholder='请描述当前宠物的健康状态' />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
