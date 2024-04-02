import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


import { Button, Popconfirm, Radio, Space, Table, Tag, message } from 'antd';


export default function FosteringCp() {
    const router = useRouter();
    const [data, setData] = useState([]);

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '宠物名',
            dataIndex: 'petname',
            key: 'petname',
        },
        {
            title: '宠物类别',
            key: 'pettype',
            dataIndex: 'pettype',
        },
        {
            title: '宠物照片',
            key: 'petphoto',
            dataIndex: 'petphoto',
            render: (_, record) => (
                <button>{record.petphoto}</button>
            )
        },
        {
            title: '操作',
            key: 'isnew',
            dataIndex: 'isnew',
            width: 100,
            render: (_, record) => (
                <Popconfirm title='确认同意寄养?' okText='确认' cancelText='取消' onConfirm={() => {handleFoster(record.username, record.petname)}}>
                    <Button>同意寄养</Button>
                </Popconfirm>
            ),
        },
    ];

    function handleFoster(username, petname) {
        const searchData = {
            username,
            petname
        };

        axios.post('http://localhost:3001/foster/confirmFostering', searchData).then(() => {
            message.success('预约已受理,即将前往寄养管理查看。');
            setTimeout(() => {
                router.push('/admin/petfoster/petlist');
            },500);
        })
    }

    useEffect(() => {
        axios.get('http://localhost:3001/foster/getFostering').then((response) => {
            setData(response.data.data);
        })
    }, [])

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
