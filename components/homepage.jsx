import { useEffect, useState } from 'react'
import style from './homepage.module.scss'
import CarouselCp from './homepageCp/carousel'
import Notification from './homepageCp/notification'
import { useDispatch, useSelector } from 'react-redux'


export default function HomePage() {
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);

    const time = new Date();
    // 获取时间
    var dateTime = '';
    var year = time.getFullYear();
    var mounth = time.getMonth();
    var day = time.getDay();
    var h = time.getHours();
    var m = time.getMinutes();
    // var s = time.getSeconds();
    dateTime = `现在是${year}-${mounth}-${day} ${h}:${m}`;



    return (
        <>
            <div className={style['HomePage']} >
                <h2 className={style['HomePage-timer']}>{dateTime} 欢迎用户{username}</h2>
                {/* <h3>宠物轮播:</h3> */}
                <CarouselCp />
                <br />
                <h3>系统通知:</h3>
                <div className={style['HomePage-notifi']}>
                    <Notification />
                </div>
            </div>
        </>
    )
}
