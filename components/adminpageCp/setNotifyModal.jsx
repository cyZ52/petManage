import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form, Input, Modal, Radio, message } from 'antd';



export default function SetNotifyModal() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  }

  async function handleOk() {
    // 此处发送post请求
    const form_data = await form.validateFields();

    console.log('新发布的系统通知内容:', form_data);

    const postData = {
      title: form_data.title,
      description: form_data.description
    };

    const response = await axios.post('http://localhost:3001/notify/setNotifies', postData);

    // 打印服务器返回的json数据
    console.log('服务器返回的json数据', response);
    message.success('新增成功!');
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmLoading(false);
      window.location.reload();
    }, 1500);
  }

  const handelCancel = () => {
    setIsModalOpen(false);
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        新增通知
      </Button>
      <Modal title='发布新的系统通知' open={isModalOpen} confirmLoading={confirmLoading} okText='发布' onOk={handleOk} cancelText='取消' onCancel={handelCancel}>
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
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: '请输入内容!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
