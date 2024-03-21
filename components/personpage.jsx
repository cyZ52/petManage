import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './personpage.module.scss';

import { Button, Descriptions, Form, Input, InputNumber, Modal, Radio, message } from 'antd';



export default function PersonPage() {
    const [form] = Form.useForm();
    const router = useRouter();
    const username = useSelector(state => state.user.username);
    const personInfo = sessionStorage.getItem('personInfo');
    const { avater, age, location, sex, like, personSlogan } = JSON.parse(personInfo);

    const [isModalShow, setIsModalShow] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setIsModalShow(true);
    };
    async function handleOk() {
        const form_data = await form.validateFields();

        console.log('修改后的用户信息为:',form_data);

        const updateData = {
            username: username,
            ...form_data
        }

        axios.post('http://localhost:3001/auth/changeUserInfo', updateData).then(() => {
            message.success('修改成功,稍后跳转至主页!');
            setConfirmLoading(true);
            setTimeout(() => {
                setConfirmLoading(false);
                setIsModalShow(false);
                router.push('/home');
            },1000)
        })
    };
    const handleCancel = () => {
        setIsModalShow(false);
    };


    // 个人信息 静态数据
    const PersonItems = [
        {
            key: '1',
            label: '用户名',
            children: [username],
        },
        {
            key: '2',
            label: '头像',
            children: (
                <Button>{avater}</Button>
            ),
        },
        {
            key: '3',
            label: '年龄',
            children: [age],
        },
        {
            key: '4',
            label: '住址',
            children: [location],
        },
        {
            key: '5',
            label: '性别',
            children: [sex ? '男' : '女'],
        },
        {
            key: '6',
            label: '爱好',
            children: [like],
        },
        {
            key: '7',
            label: '个人标语',
            children: [personSlogan]
        },
    ];


    function logout() {
        // 完善退出登陆
        sessionStorage.clear();
        router.push('/login');
    }

    return (
        <>
            <div className={style['PersonPage']}>
                <h2 className={style['PersonPage-title']}>个人中心</h2>
                <br />
                <br />
                <Descriptions
                    bordered
                    title="个人信息"
                    extra={
                        <>
                            <Button type="primary" onClick={showModal}>编辑信息</Button>
                            <Modal title="Basic Modal" open={isModalShow} okText='确认修改' onOk={handleOk} cancelText='取消' onCancel={handleCancel} confirmLoading={confirmLoading}>
                                <Form
                                    name="nitify"
                                    form={form}
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    style={{
                                        maxWidth: 400,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    <Form.Item
                                        label="头像"
                                        name="avater"
                                    >
                                        <Input placeholder='后续完善为文件上传' />
                                    </Form.Item>

                                    <Form.Item
                                        label="年龄"
                                        name="age"
                                    >
                                        <InputNumber min={1} max={100} defaultValue={age} />
                                    </Form.Item>

                                    <Form.Item
                                        label="住址"
                                        name="location"
                                    >
                                        <Input placeholder='请输入你所在的城市' defaultValue={location}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="性别"
                                        name="sex"
                                    >
                                        <Radio.Group defaultValue={sex}>
                                            <Radio value={true}>男</Radio>
                                            <Radio value={false}>女</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        label="爱好"
                                        name="like"
                                    >
                                        <Radio.Group defaultValue={like}>
                                            <Radio value={'小猫'}>小猫</Radio>
                                            <Radio value={'小狗'}>小狗</Radio>
                                            <Radio value={'小老鼠'}>小老鼠</Radio>
                                            <Radio value={'小猪'}>小猪</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        label="个人标语"
                                        name="personSlogan"
                                    >
                                        <Input placeholder='请输入个人标语' defaultValue={personSlogan}/>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </>
                    }
                    items={PersonItems}
                />
                <br />
                <br />
                <Button onClick={logout}>退出登录</Button>
            </div>
        </>
    )
}






