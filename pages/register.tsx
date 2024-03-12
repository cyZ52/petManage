import Link from "next/link";
import { useRouter } from "next/router";

import axios from "axios";

import { Button, Form, Input, Alert } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';

import style from "@/styles/Login.module.scss"
import { useState } from "react";



export default function Register() {
    const [form] = Form.useForm()
    const router = useRouter()

    const [showAlertWarning, setShowAlertWarning] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);


    async function handleRegister() {
        try {
            // 从表单中获取数据
            const form_data = await form.validateFields();
            // 打印表单内容
            console.log('打印表单内容:', form_data);

            // 构建 POST 请求的数据
            const postData = {
                username: form_data.username,
                password: form_data.password
            };

            // 发送 POST 请求
            const response = await axios.post('http://localhost:3001/auth/register', postData);

            // 打印服务器返回的json数据
            console.log('服务器返回的json数据', response);

            const data = response.data;

            // 根据服务器的响应处理结果
            if (response.status === 200) {
                if (data.code === '0003') {
                    console.log(data.msg);
                    // 用户名已存在
                    setShowAlertWarning(true);
                } else {
                    // 注册成功
                    setShowAlertSuccess(true);
                }


            } else {
                // 处理其他响应状态码
                console.error('发生错误,错误状态码:', response.status);
            }
        } catch (error) {
            // 处理请求错误
            console.error('注册失败:', error);
        }
    }

    function goLogin(){
        setShowAlertSuccess(false);
        router.push('/login');
    }

    return (
        <>
            <div className={style["login-body"]}>
                {!showAlertWarning ? <></> :
                    <div className={style["alert"]}>
                        <Alert
                            message="用户名已存在"
                            type="warning"
                            showIcon
                            closable
                            afterClose={() => setShowAlertWarning(false)}
                        />
                    </div>
                }
                {!showAlertSuccess ? <></> :
                    <div className={style["alert"]}>
                        <Alert
                            message="注册成功,请登录"
                            type="success"
                            showIcon
                            closable
                            afterClose={() => goLogin()}
                        />
                    </div>
                }


                <div className={style["login-box"]}>
                    <h1 className={style["login-title"]}>新的开始</h1>
                    <h5 className={style["login-title-1"]}>注册账号</h5>
                    <Form
                        className={style["login-form"]}
                        form={form}
                    >
                        <Form.Item name="username" rules={[{ required: true, message: '用户名不能为空！' }]}>
                            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '密码不能为空！' }]}>
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="请输入密码"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={handleRegister} className={style["login-form-button"]} ghost>
                                注册
                            </Button>
                            <br />
                            <Link href={"/login"} className={style["goLogin"]}>已有账号,去登录</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        </>
    )
}