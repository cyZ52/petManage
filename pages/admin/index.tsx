import { useRouter } from 'next/router';
import React, { useState } from 'react';
import style from '@/styles/Layout.module.scss'

import type { MenuProps } from 'antd';
import { Button, Layout, Menu, Space, Tooltip, Breadcrumb, } from 'antd';
import {
    NotificationOutlined,
    LogoutOutlined,
    PieChartOutlined,
    UserOutlined,
    HomeOutlined,
    GithubOutlined,
    CarryOutOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';

const { Content, Sider } = Layout;

type AdminItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: AdminItem[],
    onClick?: () => void
): AdminItem {
    return {
        key,
        icon,
        children,
        label,
        onClick,
    } as AdminItem;
}


export default function Home() {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()

    function goHome() {
        router.push('/admin')
    }
    function goNotifi() {
        router.push('/admin/notifications')
    }
    function goList() {
        router.push('/admin/petfoster/petlist')
    }
    function goAccount(){
        router.push('/admin/account')
    }
    function goHealthy() {
        router.push('/admin/petfoster/pethealthy')
    }
    function goFostering() {
        router.push('/admin/petfoster/fostering')
    }
    function goProduct() {
        router.push('/admin/product')
    }
    function logout(){
        router.push('/login')
    }

    const items: AdminItem[] = [
        getItem('统计图表', '1', <PieChartOutlined />, undefined, goHome),
        getItem('系统通知', '2', <NotificationOutlined />, undefined, goNotifi),
        getItem('账号管理', '3', <UserOutlined />, undefined, goAccount),
        getItem('寄养信息管理', 'sub1', <GithubOutlined />,
            [getItem('寄养列表管理', '4', undefined, undefined, goList),
            getItem('健康状态管理', '5', undefined, undefined, goHealthy)],
        ),
        getItem('寄养预约管理', '6', <CarryOutOutlined />, undefined, goFostering),
        getItem('宠物产品', '7', <ShoppingCartOutlined />, undefined, goProduct),
    ];

    return (
        <>

            <div className={style['layout-header']}>
                <Tooltip title="返回主页">
                    <Button shape="circle" icon={<HomeOutlined />} onClick={goHome} />
                </Tooltip>
                <span>Shame7宠物管理系统后台</span>
                <Tooltip title="退出登录">
                    <Button shape="circle" icon={<LogoutOutlined />} onClick={logout} />
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
                            统计图表
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </>

    );
};
