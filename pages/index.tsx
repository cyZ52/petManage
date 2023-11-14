import Link from "next/link"
import { Button } from "antd"

import style from "@/styles/Home.module.scss"


export default function Home() {
  return (
    <>
      <div className={style["home"]}>
        <div className={style["home-body"]}>
          <h1 className={style["home-title"]}>欢迎使用宠物管理平台</h1>
          <Button type="default" ghost><Link href={"/login"}>去登录</Link></Button>
        </div>
      </div>

    </>
  )
}
