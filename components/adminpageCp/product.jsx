import React, { useEffect, useState } from 'react';
import { Button, Table, message, Tag } from 'antd';
import axios from 'axios';




export default function ProductCp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get('http://localhost:3001/product/getAllProduct').then(response => {
        setData(response.data.data);
      })
    }
    catch (err) {
      console.log('获取所有商品发生错误', err);
    }
  }, []);

  function ChangeOnsale(name) {
    try {
      axios.post('http://localhost:3001/product/changeOnSale', { name }).then(() => {
        message.success('修改状态成功!');
        setTimeout(() => {
            window.location.reload();
        }, 500);
      })
      
    } catch (err) {
      console.log('修改上架状态时出错', err)
    }
  }

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      width: '25%',
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
        record.onsale ? <Button onClick={() => ChangeOnsale(record.name)}>下架</Button> : <Button type='primary' onClick={() => ChangeOnsale(record.name)}>上架</Button>
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