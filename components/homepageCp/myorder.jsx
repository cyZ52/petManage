import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, message, Space } from 'antd';
import axios from 'axios';


export default function MyOrder() {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            const sessionUserInfo = sessionStorage.getItem('userInfo');
            const { username } = JSON.parse(sessionUserInfo);

            axios.post('http://localhost:3001/order/getMyOrder', { username }).then(response => {
                setData(response.data.data);
            })
        } catch (err) {
            console.log('获取我的订单时出错', err);
        }
    }, [])

    function handleTake(id) {
        try {
            axios.post('http://localhost:3001/order/takeProduct', {id}).then(() => {
                message.success('确认收货成功~!');
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            })
        } catch (err) {
            console.log('收货出错', err);
        }
    }

    function handleReturn(id) {
        try {
            axios.post('http://localhost:3001/order/returnProduct', {id}).then(() => {
                message.success('退货申请已发出~!');
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            })
        } catch (err) {
            console.log('收货出错', err);
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
        },
        {
            title: '商品描述',
            dataIndex: 'detail',
        },
        {
            title: '商品价格',
            dataIndex: 'price',
        },
        {
            title: '操作',
            width: 300,
            render: (_, record) => (
                record.state === 0 ? <Button disabled>等待商家发货...</Button> :
                    record.state === 1 ?
                        <Popconfirm title='确认收货?' cancelText='取消' okText='确认' onConfirm={() => handleTake(record._id)}>
                            <Button>确认收货</Button>
                        </Popconfirm> :
                        record.state === 2 ?
                            <>
                                <Space>
                                    <Button type='primary'>订单已完成</Button>
                                    <Popconfirm title='确认申请退货?' cancelText='取消' okText='确认' onConfirm={() => handleReturn(record._id)}>
                                        <Button>申请退货</Button>
                                    </Popconfirm>
                                </Space>
                            </> :
                            record.state === 3 ?
                            <Button disabled>等待商家同意退货...</Button> :
                            record.state === 4 ?
                                <Button type='primary'>退货成功</Button> :
                                <></>
            )
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
