import React, { useState } from 'react';
import { Button, Radio, Space, Table, Tag } from 'antd';
import imgSrc from '@/public/home.jpg'

const columns = [
    {
        title: '宠物名称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '宠物照片',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '所属用户名',
        dataIndex: 'name',
        key: 'address 1',
    },
    {
        title: '健康状态',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags) => (
            <span>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    }
];

const imgsrc = imgSrc.src

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: (
            <img height={'100px'} width={'100px'} src={imgsrc}/>
        ),
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: (
            <img height={'100px'} width={'100px'} src={imgsrc}/>
        ),
        tags: ['cool', 'teacher'],
    },
    {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: (
            <img height={'100px'} width={'100px'} src={imgsrc}/>
        ),
        tags: ['cool', 'teacher'],
    },
    {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '6',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '8',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '9',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '10',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '11',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default function PetHealthyFront() {

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
