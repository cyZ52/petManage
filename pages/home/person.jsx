import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Layout, Menu, Tooltip } from 'antd';
import {
    NotificationOutlined,
    LogoutOutlined,
    PieChartOutlined,
    UserOutlined,
    HomeOutlined,
    GithubOutlined,
    CarryOutOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    MessageOutlined
} from '@ant-design/icons';
import style from '@/styles/Layout.module.scss';
import PersonPage from '@/components/personpage';

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

export default function Person() {
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
    function goMyOrder() {
        router.push('/home/myorder');
    }
    function goDiscuss() {
        router.push('/home/discuss');
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
        getItem('我的订单', '8', <ShoppingOutlined />, undefined, goMyOrder),
        getItem('留言板', '9', <MessageOutlined />, undefined, goDiscuss),
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
                    <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Content>
                        <div>
                            <PersonPage />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
