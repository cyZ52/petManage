import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button,  Space, Table, Tag } from 'antd';

export default function PetListFront() {
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
            render: (petphoto) => <button>{petphoto}</button>
        },
        {
            title: '所属用户头像',
            dataIndex: 'avater',
            key: 'avater',
            render: (avater) => <button>{avater}</button>
        },
        {
            title: '所属用户名',
            dataIndex: 'username',
            key: 'username',
        },
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
