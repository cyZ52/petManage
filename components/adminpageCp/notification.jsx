import React, { useEffect, useState } from 'react';
import { Button, Table, Tooltip, Popconfirm, message } from 'antd';
import axios from 'axios';


export default function Notification() {
    const [notifyData, setNotifyData] = useState([]);

    // 表格表头
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',   // 对应属性
            key: 'title',
            width: 300,
        },
        {
            title: '详情',
            dataIndex: 'description',   // 对应属性
            key: 'description',
            width: 800,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) => (
                <Popconfirm title='删除当前通知' description='确认删除当前选中系统通知?' onConfirm={() => handleDelete(record.title)}>
                    <Button>删除</Button>
                </Popconfirm>
            )
        },
    ];

    function handleDelete(title) {
        try {
            axios.post('http://localhost:3001/notify/deleteNotify',{
                title: title
            });

            message.success('删除成功!');
            setTimeout(() => {
                window.location.reload();
            },200)
        }
        catch (error) {
            console.error('Error fetching notifications:', error);
        }
           
    }

    async function getNotifies() {
        try {
            const response = await axios.get('http://localhost:3001/notify/getNotifies');

            // 打印服务器返回的json数据
            console.log('服务器返回的json数据', response);

            const data = response.data;

            setNotifyData(data.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }

    }

    useEffect(() => {
        getNotifies();
    }, [])

    return (
        <Table columns={columns} dataSource={notifyData} />
    )
}