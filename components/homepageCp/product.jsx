import React, { useEffect, useState } from 'react';
import { Button, Radio, Space, Table, Tag } from 'antd';
import axios from 'axios';


export default function ProductFront() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/product/getProduct').then( response => {
            setData(response.data.data);
        })
    },[])

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品照片',
            dataIndex: 'photo',
        },
        {
            title: '商品价格',
            dataIndex: 'price',
        },
        {
            title: '商品描述',
            dataIndex: 'detail',
        },
        {
            title: '购买',
            render: () => (
                <Button>购买</Button>
            )
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
