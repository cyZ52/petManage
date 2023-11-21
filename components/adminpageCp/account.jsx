import React from 'react';
import { Button, Table, Tooltip, Popconfirm } from 'antd';


const columns = [
  {
    title: '用户名',
    dataIndex: 'name',   // 对应属性
    key: 'name',
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: '头像',
    dataIndex: 'avater',   // 对应属性
    key: 'avater',
    render: (text) => <Button>{text}</Button>,
    width: 120,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 100,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    width: 100,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: 120,
  },
  {
    title: '爱好',
    dataIndex: 'likes',
    key: 'likes',
    width: 100,
  },
  {
    title: '个人标语',
    dataIndex: 'motto',
    key: 'motto',
    ellipsis: {
      showTitle: false,
    },
    render: (address) => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    ),
  },
  {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm title={`确定删除${record.key}号账号?`} onConfirm={() => handleDelete(record.key)}>
            <Button>删除账号</Button>
          </Popconfirm>
        ) : null,
    },
];

// 模拟静态数据
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    sex: '男',
    address: '成都',
    avater: 'avaterUrl',
    likes: '小猫',
    motto: 'abcdefg'
  },
];

// 删除账号
function handleDelete(key){
  alert(`删除成功，${key}号账号已删除`)
}

export default function AccountCp(){

  return (
    <Table columns={columns} dataSource={data} />
  )
}