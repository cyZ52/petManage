import React, { useEffect, useState } from 'react';
import axios from 'axios';


import { Button, Table, Tooltip, Popconfirm, message, Avatar } from 'antd';


export default function AccountCp() {
  const [accountData, setAccountData] = useState([]);

  async function getAccounts() {
    try {
      axios.get('http://localhost:3001/account/getAccounts').then(response => {
        setAccountData(response.data.data);
      }
      )
    }
    catch (err) {
      console.log('获取账户信息发生错误',err);
    }
  }

  useEffect(() => {
    getAccounts();
  }, []);

  function handleReset(username) {
    try {
      axios.post('http://localhost:3001/account/resetPassword',{
        username
      }).then(() => {
        message.success('修改成功!');
      })
    }
    catch (err) {
      message.warning('修改失败');
      console.log('修改失败',err);
    }
  }

  // 表格表头
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',   // 对应属性
      key: 'username',
      width: 150,
    },
    {
      title: '头像',
      dataIndex: 'avater',   // 对应属性
      key: 'avater',
      render: (avater) => <Avatar size={64} src={avater}/>,
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
      dataIndex: 'location',
      key: 'location',
      width: 120,
    },
    {
      title: '爱好',
      dataIndex: 'like',
      key: 'like',
      width: 100,
    },
    {
      title: '个人标语',
      dataIndex: 'personSlogan',
      key: 'personSlogan',
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
        <Popconfirm title={`确定重置'${record.username}'账号的密码?`} onConfirm={() => { handleReset(record.username) }}>
          <Button>重置密码</Button>
        </Popconfirm>
    },
  ];



  return (
    <Table columns={columns} dataSource={accountData} />
  )
}