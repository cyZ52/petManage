import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, message, Image, Tag } from 'antd';
import axios from 'axios';


export default function ProductFront() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/product/getProduct').then( response => {
            setData(response.data.data);
        })
    },[])

    function handleBuy(name, detail, price, photo) {
        try {
            const sessionUserInfo = sessionStorage.getItem('userInfo');
            const {username} = JSON.parse(sessionUserInfo); 

            const data = {
                username,
                name,
                detail,
                price,
                photo
            }

            axios.post('http://localhost:3001/order/buyProduct', data).then(() => {
                message.success('购买成功,可到我的订单查看发货进度!');
            })

        } catch (err) {
            console.log('购买时发生错误',err);
        }
    }

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品照片',
            dataIndex: 'photo',
            render: (photo) => (
                <Image width={100} height={100} src={photo}/>
            )
        },
        {
            title: '商品价格',
            dataIndex: 'price',
        },
        {
            title: '商品描述',
            dataIndex: 'detail',
            render: (detail) => (
                <Tag color='geekblue'>{detail}</Tag>
            )
        },
        {
            title: '购买',
            render: (_, record) => (
                <Popconfirm title='确认购买所选商品?' cancelText='取消' okText='确认' onConfirm={() => handleBuy(record.name, record.detail, record.price, record.photo)}>
                    <Button>购买</Button>
                </Popconfirm>
            )
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
