import style from './sidebar.module.scss'
import { useRouter } from 'next/router'

import { Button, Space, Tooltip } from 'antd';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';

export default function Sidebar() {
    const router = useRouter()

    function goPerson() {
        router.push('/home/person')
    }
    function goHome() {
        router.push('/home')
    }

    return (
        <>
            <div className={style["sidebar"]}>
                <Space>
                    <Tooltip title="返回主页">
                        <Button shape="circle" icon={<HomeOutlined />} ghost onClick={goHome} />
                    </Tooltip>
                    <Tooltip title="个人中心">
                        <Button shape="circle" icon={<UserOutlined />} ghost onClick={goPerson} />
                    </Tooltip>
                </Space>
                <div className={style["sidebar-items"]}></div>
                <div className={style["sidebar-item"]} onClick={goPerson}>1</div>
                <div className={style["sidebar-item"]} onClick={goHome}>2</div>
                <div className={style["sidebar-item"]}>3</div>
                <div className={style["sidebar-item"]}>4</div>
                <div className={style["sidebar-item"]}>5</div>
            </div>
        </>
    )
}