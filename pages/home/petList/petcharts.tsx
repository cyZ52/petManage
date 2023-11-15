import { useRouter } from 'next/router';
import React, { useState } from 'react';
import style from '@/styles/Layout.module.scss'

import type { MenuProps } from 'antd';
import { Button, Layout, Menu, Space, Tooltip, Breadcrumb, } from 'antd';
import {
    FileOutlined,
    UserOutlined,
    HomeOutlined,
    GithubOutlined,
    PieChartOutlined,
    SnippetsOutlined
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


export default function Petcharts() {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()

    function goHome() {
        router.push('/home')
    }
    function goPerson() {
        router.push('/home/person')
    }
    function goDog() {
        router.push('/home/petList/dog')
    }
    function goCat() {
        router.push('/home/petList/cat')
    }
    function goPetList() {
        router.push('/home/petList/petlist')
    }
    function goPetCharts() {
        router.push('/home/petList/petcharts')
    }
    function goMissing() {
        router.push('/home/missing')
    }

    const items: MenuItem[] = [
        getItem('首页', '1', <HomeOutlined />, undefined, goHome),
        getItem('个人中心', '2', <UserOutlined />,),
        getItem('宠物种类', 'sub1', <GithubOutlined />,
            [getItem('小狗', '3', undefined, undefined, goDog),
            getItem('小猫', '4', undefined, undefined, goCat)],
        ),
        getItem('宠物信息', 'sub2', <PieChartOutlined />, 
        [getItem('宠物列表', '5', undefined, undefined, goPetList), 
        getItem('宠物图表', '6', undefined, undefined, goPetCharts)]),
        getItem('挂失信息', '7', <SnippetsOutlined />, undefined, goMissing),
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
                    <Menu theme="dark" mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px', }}>
                        <div>
                            home
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </>

    );
};
