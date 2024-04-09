import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';

// import DemoPie from '@/components/adminpageCp/stats';
import TextCP from '@/components/adminpageCp/stats';

import style from '@/styles/Layout.module.scss';
import styles from '@/styles/Admin.module.scss';

import { Button, Layout, Menu, Tooltip, message } from 'antd';
import {
    NotificationOutlined,
    LogoutOutlined,
    PieChartOutlined,
    UserOutlined,
    HomeOutlined,
    GithubOutlined,
    CarryOutOutlined,
    ShoppingCartOutlined,
    ReconciliationOutlined,
    MessageOutlined
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
        router.push('/admin');
    }
    function goNotifi() {
        router.push('/admin/notifications');
    }
    function goList() {
        router.push('/admin/petfoster/petlist');
    }
    function goAccount(){
        router.push('/admin/account');
    }
    function goHealthy() {
        router.push('/admin/petfoster/pethealthy');
    }
    function goFostering() {
        router.push('/admin/petfoster/fostering');
    }
    function goProduct() {
        router.push('/admin/product');
    }
    function goOrder() {
        router.push('/admin/order');
    }
    function goDiscuss() {
        router.push('/admin/discuss');
    }
    function logout(){
        message.success('退出登录成功!');
        sessionStorage.clear();
        axios.get('http://localhost:3001/auth/logout');
        router.push('/login');
    }

    const items = [
        getItem('统计图表', '1', <PieChartOutlined />, undefined, goHome),
        getItem('系统通知', '2', <NotificationOutlined />, undefined, goNotifi),
        getItem('账号管理', '3', <UserOutlined />, undefined, goAccount),
        getItem('寄养信息管理', 'sub1', <GithubOutlined />,
            [getItem('寄养列表管理', '4', undefined, undefined, goList),
            getItem('健康状态管理', '5', undefined, undefined, goHealthy)],
        ),
        getItem('寄养预约管理', '6', <CarryOutOutlined />, undefined, goFostering),
        getItem('宠物产品', '7', <ShoppingCartOutlined />, undefined, goProduct),
        getItem('订单处理', '8', <ReconciliationOutlined />, undefined, goOrder),
        getItem('留言回复', '9', <MessageOutlined />, undefined, goDiscuss),
    ];

    return (
        <>

            <div className={style['layout-header']}>
                <Tooltip title="返回主页">
                    <Button shape="circle" icon={<HomeOutlined />} onClick={goHome} >
                        </Button>
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
                            <TextCP />
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </>

    );
};
