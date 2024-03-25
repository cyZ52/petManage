import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './personpage.module.scss';

import { Button, Descriptions, Form, Input, InputNumber, Modal, Radio, Space, message } from 'antd';



export default function PersonPage() {
    const [form] = Form.useForm();
    const router = useRouter();
    const username = useSelector(state => state.user.username);

    // const personInfo = sessionStorage.getItem('personInfo');
    // const { avater, age, location, sex, like, personSlogan } = JSON.parse(personInfo);
    const personInfo = typeof window !== 'undefined' ? sessionStorage.getItem('personInfo') : null;
    const { avater, age, location, sex, like, personSlogan } = personInfo ? JSON.parse(personInfo) : {};

    const [isModalShow, setIsModalShow] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [isPasswordModalShow, setIsPasswordModalShow] = useState(false);
    const [PasswordconfirmLoading, setPasswordConfirmLoading] = useState(false);

    const showModal = () => {
        setIsModalShow(true);
    };
    
    const showPasswordModal = () => {
        setIsPasswordModalShow(true);
    };

    const handleCancel = () => {
        setIsModalShow(false);
    };
    
    const handlePasswordCancel = () => {
        setIsPasswordModalShow(false);
    };

    async function handleOk() {
        const form_data = await form.validateFields();

        console.log('修改后的用户信息为:', form_data);

        const updateData = {
            username: username,
            ...form_data
        }

        axios.post('http://localhost:3001/account/changeUserInfo', updateData).then(() => {
            message.success('修改成功,稍后跳转至主页!');
            setConfirmLoading(true);
            setTimeout(() => {
                setConfirmLoading(false);
                setIsModalShow(false);
                router.push('/home');
            }, 1000)
        })
    };

    async function changePassword() {
        const form_data = await form.validateFields();

        const updateData = {
            username: username,
            ...form_data
        }

        axios.post('http://localhost:3001/account/changePassword',updateData).then(() => {
            message.success('修改密码成功,请重新登录!');
            setPasswordConfirmLoading(true);
            setTimeout(() => {
                setPasswordConfirmLoading(false);
                setIsPasswordModalShow(false);
                router.push('/login');
            }, 1000)
        })
    }

    function logout() {
        message.success('退出登录成功!');
        sessionStorage.clear();
        axios.get('http://localhost:3001/auth/logout');
        router.push('/login');
    }

    // 个人信息表头
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
                        <Space>
                            <Button type="primary" onClick={showPasswordModal}>修改密码</Button>
                            <Button type="primary" onClick={showModal}>编辑信息</Button>
                        </Space>
                            
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
                                        <Input placeholder='请输入你所在的城市' defaultValue={location} />
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
                                        <Input placeholder='请输入个人标语' defaultValue={personSlogan} />
                                    </Form.Item>
                                </Form>
                            </Modal>
                            <Modal title="Basic Modal" open={isPasswordModalShow} okText='确认修改' onOk={changePassword} cancelText='取消' onCancel={handlePasswordCancel} confirmLoading={PasswordconfirmLoading}>
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
                                        label="新的密码"
                                        name="password"
                                    >
                                        <Input placeholder='请输入新的密码' />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </>
                    }
                    items={PersonItems}
                />
                <br />
                <br />

                <br />
                <br />
                <Button onClick={logout}>退出登录</Button>
            </div>
        </>
    )
}






