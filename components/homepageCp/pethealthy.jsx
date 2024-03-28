import React, { useEffect, useState } from 'react';
import { Button, Radio, Space, Table, Tag } from 'antd';
import axios from 'axios';


export default function PetHealthyFront() {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: '宠物名称',
            dataIndex: 'petname',
            key: 'petname',
        },
        {
            title: '宠物照片',
            dataIndex: 'petphoto',
            key: 'petphoto',
            render: (avater) => <button>{avater}</button>
        },
        {
            title: '所属用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '健康状态',
            key: 'healthy',
            dataIndex: 'healthy',
            render: (healthy) => (
                <span>
                            <Tag color={healthy == '良好' ? 'green' : 'geekblue'}>
                                {healthy}
                            </Tag>
                </span>
            ),
        }
    ];

    useEffect(() => {
        axios.get('http://localhost:3001/foster/getFosterList').then((response) => {
            setData(response.data.data);
        })
    },[])

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
