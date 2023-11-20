import style from './personpage.module.scss'

import { Button, Descriptions} from 'antd';
import type {  DescriptionsProps } from 'antd';

export default function PersonPage() {


    // 个人信息 静态数据
    const PersonItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '用户名',
            children: 'Cloud Database',
        },
        {
            key: '2',
            label: '头像',
            children: (
                <Button>11</Button>
            ),
        },
        {
            key: '3',
            label: '年龄',
            children: '111',
        },
        {
            key: '4',
            label: '住址',
            children: '成都',
        },
        {
            key: '5',
            label: '性别',
            children: '男',
        },
        {
            key: '6',
            label: '爱好',
            children: '小狗',
        },
        {
            key: '7',
            label: '个人标语',
            children: (
                <>
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1
                    <br />
                </>
            ),
        },
    ];

    // // 账号信息 静态数据
    // const Accountitems: DescriptionsProps['items'] = [
    //     {
    //         key: '1',
    //         label: '账号',
    //         children: '11111111111',
    //     },
    //     {
    //         key: '2',
    //         label: '用户名',
    //         children: 'abc',
    //     },
    //     {
    //         key: '3',
    //         label: '头像',
    //         children: (
    //             <Button>换成Aveter</Button>
    //         ),
    //     },
    //     {
    //         key: '4',
    //         label: '账号角色',
    //         children: '管理员',
    //     },
    //     {
    //         key: '5',
    //         label: '密码',
    //         children: (
    //             <input value={'123123123'} type='password'></input>
    //         ),
    //     },
    //     {
    //         key: '6',
    //         children: (
    //             <Button>修改密码</Button>
    //         ),
    //     },
    // ];

    return (
        <>
            <div className={style['PersonPage']}>
                <h2 className={style['PersonPage-title']}>个人中心</h2>
                <br />
                <br />
                <Descriptions
                    bordered
                    title="个人信息"
                    extra={<Button type="primary">编辑信息</Button>}
                    items={PersonItems}
                />
                <br />
                <br />
                {/* <Descriptions
                    title="账号信息"
                    items={Accountitems}
                /> */}
                <Button>退出登录</Button>
            </div>
        </>
    )
}






