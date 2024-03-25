import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Layout, Menu, Tooltip, message } from 'antd';
import {
    FileOutlined,
    UserOutlined,
    HomeOutlined,
    GithubOutlined,
    ShoppingCartOutlined,
    CarryOutOutlined
} from '@ant-design/icons';

import style from '@/styles/Layout.module.scss';
import HomePage from '@/components/homepage';
import { setUsername } from '@/redux/slice/user';

const { Content, Sider } = Layout;

function getItem(
    label,
    key,
    icon,
    children,
    onClick
) {
    return {
        key,
        icon,
        children,
        label,
        onClick,
    };
}

export default function Home() {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);


    // useEffect(() => {
    //     // 检查登录状态
    //     const sessionUserInfo = sessionStorage.getItem('userInfo');
    //     const userInfo = JSON.parse(sessionUserInfo);
    //     axios.post('http://localhost:3001/auth/checkLogin', {
    //         userInfo
    //     })
    //         .then(response => {

    //             dispatch(setUsername(userInfo));

    //             if (response.data.msg != 'isLogin') {
    //                 alert('请先登录!');
    //                 router.push('/login');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error); // 处理请求错误
    //         });
    // }, []);

    useEffect(() => {
        try {
            const sessionUserInfo = sessionStorage.getItem('userInfo');
            const userInfo = JSON.parse(sessionUserInfo);


            // 获取用户信息并保存到sessionStorege
            axios.post('http://localhost:3001/auth/getUserInfo', {
                username: userInfo.username
            }).then(response => {
                // console.log(response.data.data);
                sessionStorage.setItem('personInfo', JSON.stringify(response.data.data));
                const seesionPersonInfo = sessionStorage.getItem('personInfo');
                const personInfo = JSON.parse(seesionPersonInfo);
                dispatch(setUsername(personInfo));
            }).catch((err) => {
                console.log('请求失败', err);
            })
        }
        catch {
            setTimeout(() => {
                message.warning('请先登录!');
                router.push('/login')
            }, 200);
        }
    })

    function goHome() {
        router.push('/home');
    }
    function goPerson() {
        router.push('/home/person');
    }
    function goList() {
        router.push('/home/petList/petlist');
    }
    function goHealthy() {
        router.push('/home/petList/pethealthy');
    }
    function goFostering() {
        router.push('/home/petfoster/fostering');
    }
    function goMyPet() {
        router.push('/home/petfoster/mypet');
    }
    function goProduct() {
        router.push('/home/product');
    }
    const items = [
        getItem('首页', '1', <HomeOutlined />, undefined, goHome),
        getItem('个人中心', '2', <UserOutlined />, undefined, goPerson),
        getItem('寄养信息', 'sub1', <GithubOutlined />,
            [getItem('寄养列表', '3', undefined, undefined, goList),
            getItem('健康状态', '4', undefined, undefined, goHealthy)],
        ),
        getItem('寄养预约', 'sub2', <CarryOutOutlined />,
            [getItem('寄养宠物', '5', undefined, undefined, goFostering),
            getItem('我的宠物', '6', undefined, undefined, goMyPet)]),
        getItem('宠物产品', '7', <ShoppingCartOutlined />, undefined, goProduct),
    ];
    return (
        <>
            <div className={style['layout-header']}>
                <Tooltip title="返回主页">
                    <Button shape="circle" icon={<HomeOutlined />} onClick={goHome} />
                </Tooltip>
                <span>Shame7宠物管理系统</span>
                <Tooltip title="个人中心">
                    <Button shape="circle" icon={<UserOutlined />} onClick={goPerson} />
                </Tooltip>
            </div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider theme="dark" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px', }}>
                        <div>
                            <HomePage />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};