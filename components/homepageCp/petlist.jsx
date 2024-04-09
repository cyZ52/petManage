import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Avatar, Image, Table } from 'antd';

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
            render: (petphoto) => <Image width={100} height={100} src={petphoto}/>
        },
        {
            title: '所属用户头像',
            dataIndex: 'avater',
            key: 'avater',
            render: (avater) => <Avatar size={64} src={avater}/>
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
