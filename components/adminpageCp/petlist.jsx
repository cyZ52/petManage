import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Popconfirm, Radio, Space, Table, Tag } from 'antd';

const columns = [
    {
        title: '宠物名称',
        dataIndex: 'petname',
        key: 'petname',
    },
    {
        title: '宠物类别',
        dataIndex: 'pettype',
        key: 'pettype',
    },
    {
        title: '宠物照片',
        dataIndex: 'petphoto',
        key: 'petphoto',
        render: (petphoto) => (
            <button>{petphoto}</button>
        )
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
        )
    },
    {
        title: '寄养状态',
        key: 'isnew',
        dataIndex: 'isnew',
        render: (_,record) => (
            record.isnew === 0 ? <Tag color='geekblue'>预约寄养中..</Tag> :
            record.isnew === 1 ?
                    <Tag color='green'>正在寄养中</Tag>
                :
                record.isnew === 2 ?
                    <Tag color='red'>寄养结束</Tag>
                    : <></>
        ),
    }
];


export default function PetListCp() {
    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3001/foster/getAllFosterList').then((response) => {
            setData(response.data.data);
        });
    },[])

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
