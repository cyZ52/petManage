import React, { useState } from 'react';
import { Form, Table } from 'antd';

// 静态模拟数据
const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

export default function ProductCp() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: '商品金额',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '商品描述',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: () => (<button>修改</button>)
    },
  ];
  return (
    <Table
      dataSource={data}
      columns={columns}
    />
  );
};