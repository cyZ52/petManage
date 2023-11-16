import { useState } from 'react'
import style from './homepage.module.scss'
import CarouselCp from './homepageCp/carousel'
import Notification from './homepageCp/notification'


export default function HomePage() {


    return (
        <>
            <div className={style['HomePage']} >
                <h2 className={style['HomePage-timer']}>xxxx-xx-xx xx:xx:xx 欢迎用户xxx</h2>
                <h3>宠物轮播:</h3>
                <CarouselCp />
                <h3>系统通知:</h3>
                <div className={style['HomePage-notifi']}>
                    <Notification />
                </div>
            </div>
        </>
    )
}
