import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './fostering.module.scss';

import CountUp from 'react-countup';
import { Button, Card, Col, Form, Input, Modal, Radio, Row, Statistic, message } from 'antd';

const formatter = (value) => <CountUp end={value} separator="," />;
const { Meta } = Card;

export default function Fostering() {
    const [form] = Form.useForm();
    const [isModalShow, setIsModalShow] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fosterPetNum, setFosterPetNum] = useState(0);
    const [petNum, setPetNum] = useState(0);

    const showModal = () => {
        setIsModalShow(true);
    }

    const handleCancel = () => {
        setIsModalShow(false);
    };

    async function handleOk() {
        try {
            const form_data = await form.validateFields();

            const userInfo = sessionStorage.getItem('personInfo');
            const {username, avater} = JSON.parse(userInfo);

            const updateData = {
                username: username,
                avater: avater,
                ...form_data
            };

            axios.post('http://localhost:3001/foster/applyFoster',updateData).then(() => {
                setConfirmLoading(true);
                message.success('发送申请成功,等待管理员处理结果');
                setTimeout(() => {
                    setConfirmLoading(false);
                    setIsModalShow(false);
                },500);
            })
        }
        catch(err) {
            console.log('发送寄养申请出错:', err);
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3001/foster/getFosterList').then(response => {
            setFosterPetNum(response.data.data.length);
        });

        axios.get('http://localhost:3001/foster/getAllFosterList').then(response => {
            setPetNum(response.data.data.length);
        });
        
    },[]);

    return (
        <div className={styles['fostering']}>
            <h2>寄养中心</h2>
            <div className={styles['statistic']}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="当前正在寄养的宠物" value={fosterPetNum} formatter={formatter} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="已经寄养过的宠物" value={petNum} precision={2} formatter={formatter} />
                    </Col>
                </Row>
            </div>
            <h3>明星宠物</h3>
            <div className={styles['starPet']}>
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </div>

            <Button type="primary" onClick={showModal}>寄养宠物</Button>

            <Modal title="Basic Modal" open={isModalShow} okText='发送申请' onOk={handleOk} cancelText='取消' onCancel={handleCancel} confirmLoading={confirmLoading}>
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
                        label="宠物名称"
                        name="petname"
                    >
                        <Input placeholder='请输入宠物名称' />
                    </Form.Item>

                    <Form.Item
                        label="宠物照片"
                        name="petphoto"
                    >
                        <Input placeholder='后续完善为文件上传' defaultValue={'abc'}/>
                    </Form.Item>

                    <Form.Item
                        label="宠物类别"
                        name="pettype"
                    >
                        <Radio.Group >
                            <Radio value={'小猫'}>小猫</Radio>
                            <Radio value={'小狗'}>小狗</Radio>
                            <Radio value={'小老鼠'}>小老鼠</Radio>
                            <Radio value={'小猪'}>小猪</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}