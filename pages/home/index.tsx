import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import style from '@/styles/Layout.module.scss'
import HomePage from '@/components/homepage';

import type { MenuProps } from 'antd';
import { Button, Layout, Menu, Space, Tooltip, Breadcrumb, } from 'antd';
import {
    FileOutlined,
    UserOutlined,
    HomeOutlined,
    GithubOutlined,
    ShoppingCartOutlined,
    CarryOutOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    onClick?: () => void
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        onClick,
    } as MenuItem;
}


export default function Home() {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        axios.get('http://localhost:3001/auth/checkLogin',{
            withCredentials: true   // 设置在请求中携带session信息
        })
            .then(response => {
                if(response.data.msg != 'isLogin') {
                    // alert('请先登录!')
                    // router.push('/login')
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error); // 处理请求错误
            });
    },[])


    function goHome() {
        router.push('/home')
    }
    function goPerson() {
        router.push('/home/person')
    }
    function goList() {
        router.push('/home/petList/petlist')
    }
    function goHealthy() {
        router.push('/home/petList/pethealthy')
    }
    function goFostering() {
        router.push('/home/petfoster/fostering')
    }
    function goMyPet() {
        router.push('/home/petfoster/mypet')
    }
    function goProduct() {
        router.push('/home/product')
    }

    const items: MenuItem[] = [
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