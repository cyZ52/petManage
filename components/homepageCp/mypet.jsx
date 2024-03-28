import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';





export default function MyPet() {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: '宠物名称',
            dataIndex: 'petname',
            key: 'petname',
        },
        {
            title: '宠物照片',
            dataIndex: 'petphoto',
            key: 'petphoto',
            render: (petphoto) => <button>{petphoto}</button>
        },
        {
            title: '健康状态',
            key: 'healthy',
            dataIndex: 'healthy',
            render: (healthy) => (
                <span>
                    <Tag color={healthy == '良好' ? 'green' : 'geekblue'}>
                        {healthy}
                    </Tag>
                </span>
            ),
        },
        {
            title: '寄养状态',
            key: 'fostering',
            dataIndex: 'fostering',
            render: (fostering) => (
                <span>
                    <Tag color={fostering ? 'green' : 'grey'}>
                        {fostering ? '寄养中' : '未在寄养'}
                    </Tag>
                </span>
            ),
        }
    ];

    useEffect(() => {
        try {
            const userInfo = sessionStorage.getItem('personInfo');
            const { username } = JSON.parse(userInfo);


            axios.post('http://localhost:3001/foster/getMypet', { username }).then((response) => {
                setData(response.data.data);
            })
        }
        catch (err) {
            console.log('获取我的宠物时发生错误:', err);
        }
    }, []);

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
