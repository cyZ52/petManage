import { useRouter } from 'next/router';
import React, { useState } from 'react';
import style from '@/styles/Layout.module.scss'

import type { MenuProps } from 'antd';
import { Button, Layout, Menu, Space, Tooltip, Breadcrumb, } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined
} from '@ant-design/icons';

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


export default function LayoutPage() {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()

    function goHome() {
        router.push('/home')
    }
    function goPerson() {
        router.push('/home/person')
    }

    const items: MenuItem[] = [
        getItem('Option 1', '1', <PieChartOutlined />, undefined, goHome),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
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
                <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="light"  mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Content style={{margin: '0 16px',}}>
                        <div>
                            11
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </>

    );
};
