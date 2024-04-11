import React, { useEffect, useState } from 'react';
import { Button, Table, message, Space, Popconfirm, Tag } from 'antd';
import axios from 'axios';

export default function OrderCp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get('http://localhost:3001/order/getAllOrder').then(response => {
        setData(response.data.data);
      })
    }
    catch (err) {
      console.log('获取所有订单发生错误', err);
    }
  }, []);

  function handleSend(id) {
    try {
      axios.post('http://localhost:3001/order/sendProduct', {id}).then(() => {
        message.success('发货成功!');
        setTimeout(() => {
          window.location.reload();
        }, 500)
      })
    } catch (err) {
      console.log('发货出错',err);
    }
  }

  function handleConfirmReturn(id) {
    try {
      axios.post('http://localhost:3001/order/confirmReturnProduct', {id}).then(() => {
        message.success('同意退货成功!');
        setTimeout(() => {
          window.location.reload();
        }, 500)
      })
    } catch (err) {
      console.log('发货出错',err);
    }
  }


  const columns = [
    {
      title: '用户名称',
      dataIndex: 'username'
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品金额',
      dataIndex: 'price',
      width: '15%',
    },
    {
      title: '商品描述',
      dataIndex: 'detail',
      width: '40%',
      render: (detail) => (
        <Tag color='geekblue'>{detail}</Tag>
      )
    },
    {
      title: '操作',
      dataIndex: 'onsale',
      render: (_, record) => (
        record.state === 0 ?
          <Popconfirm title='确认发货?' cancelText='取消' okText='确认' onConfirm={() => handleSend(record._id)}>
            <Button>确认发货</Button>
          </Popconfirm> :
          record.state === 1 ?
            <Button disabled>等待买家收货...</Button> :
            record.state === 2 ?
              <Button type='primary'>订单已完成</Button> :
              record.state === 3 ?
                <Popconfirm title='确认同意退货?' cancelText='取消' okText='确认' onConfirm={() => handleConfirmReturn(record._id)}>
                  <Button>同意退货</Button>
                </Popconfirm> :
                record.state === 4 ?
                  <Button type='primary'>订单已取消</Button> :
                  <></>
      )
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
    />
  );
};