import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Popconfirm, Table, Tag, message, Image } from 'antd';




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
            render: (petphoto) => <Image width={100} height={100} src={petphoto}/>
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
        },
        {
            title: '更改状态',
            key: 'isnew',
            dataIndex: 'isnew',
            width: 80,
            render: (_, record) => (
                record.isnew === 0 ? <Button disabled>预约正在处理中..</Button> :
                    record.isnew === 1 ?
                        <Popconfirm title='确认领会当前所选宠物?' onConfirm={() => handelTakeBack(record.petname)} okText='确认领回' cancelText='继续寄养'>
                            <Button type='primary'>领回宠物</Button>
                        </Popconfirm>
                        :
                        record.isnew === 2 ?
                        <Popconfirm title='确认重新寄养宠物?' onConfirm={() => handelRefoster(record.petname)} okText='确认' cancelText='取消'>
                            <Button type='primary'>重新寄养宠物</Button>
                        </Popconfirm>
                            : <></>
            )
            ,
        },
    ];

    function handelTakeBack(petname) {
        try {
            const userInfo = sessionStorage.getItem('personInfo');
            const { username } = JSON.parse(userInfo);

            const searchData = {
                username,
                petname
            };

            axios.post('http://localhost:3001/foster/takeBackPet', searchData).then(() => {
                message.success('申请成功,请尽快到店领回宠物!');
                setTimeout(() => {
                    window.location.reload();
                },500);
            })
        }
        catch(err) {
            console.log('领回宠物发生错误', err);
        }
    };

    function handelRefoster(petname) {
        try {
            const userInfo = sessionStorage.getItem('personInfo');
            const { username } = JSON.parse(userInfo);

            const searchData = {
                username,
                petname
            };

            axios.post('http://localhost:3001/foster/refosterPet', searchData).then(() => {
                message.success('申请成功!');
                setTimeout(() => {
                    window.location.reload();
                },500);
            })
        }
        catch(err) {
            console.log('重新宠物发生错误', err);
        }
    };

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
