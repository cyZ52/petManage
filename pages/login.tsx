import { Button, Form, Input } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useRouter } from "next/router";

import axios from 'axios';

import style from "@/styles/Login.module.scss"



export default function Login() {
    const [form] = Form.useForm();
    const router = useRouter();


    async function handleLogin() {
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
            const response = await axios.post('http://localhost:3001/auth/login', postData);

            // 打印服务器返回的json数据
            console.log('服务器返回的json数据', response);

            const data = response.data;

            // 根据服务器的响应处理结果
            if (response.status === 200) {
                if (data.code === '0002') {
                    // 完善UI
                } else {
                    // 如果是管理员，跳转到管理员页面
                    if (data.code === '0000') {
                        router.push('/admin');
                    } else {
                        // 否则跳转到普通用户页面
                        router.push('/home');
                    }
                }

                console.log(data.msg);
            } else {
                // 处理其他响应状态码
                console.error('发生错误,错误状态码:', response.status);
            }
        } catch (error) {
            // 处理请求错误
            console.error('登录失败:', error);
        }
    }

    return (
        <>
            <div className={style["login-body"]}>
                <div className={style["login-box"]}>
                    <h1 className={style["login-title"]}>欢迎</h1>
                    <h5 className={style["login-title-1"]}>请登录</h5>
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
                            <Button type="primary" htmlType="submit" onClick={handleLogin} className={style["login-form-button"]} ghost>
                                登录
                            </Button>
                            <br />
                            <Link href={"/register"} className={style["goRegister"]}>去注册</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        </>
    )
}