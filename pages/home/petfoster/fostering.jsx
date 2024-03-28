import { useRouter } from 'next/router';
import React, { useState } from 'react';
import style from '@/styles/Layout.module.scss';
import Fostering from '@/components/homepageCp/fostering'

import { Button, Layout, Menu, Tooltip } from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    GithubOutlined,
    CarryOutOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';

const { Content, Sider } = Layout;

function getItem(label, key, icon, children, onClick) {
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
            [
                getItem('寄养列表', '3', undefined, undefined, goList),
                getItem('健康状态', '4', undefined, undefined, goHealthy)
            ],
        ),
        getItem('寄养预约', 'sub2', <CarryOutOutlined />,
            [
                getItem('寄养宠物', '5', undefined, undefined, goFostering),
                getItem('我的宠物', '6', undefined, undefined, goMyPet)
            ]
        ),
        getItem('宠物产品', '7', <ShoppingCartOutlined />, undefined, goProduct)
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
                    <Menu theme="dark" defaultSelectedKeys={['5']} defaultOpenKeys={['sub2']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <div>
                            <Fostering />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}
