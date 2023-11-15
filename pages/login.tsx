import { Button, Form, Input } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useRouter } from "next/router";

import style from "@/styles/Login.module.scss"



export default function Login() {
    const [form] = Form.useForm()
    const router = useRouter()

    async function Login(){
        const form_data=await form.validateFields()
        console.log(form_data)
        alert("登录成功！")
        router.push('/')
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
                            <Button type="primary" htmlType="submit" onClick={Login} className={style["login-form-button"]} ghost>
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