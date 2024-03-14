import Link from "next/link"
import { Button } from "antd"

import style from "@/styles/Home.module.scss"


export default function Front() {
  return (
    <>
        <div className={style["front-body"]}>
          <h1 className={style["front-title"]}>欢迎使用宠物管理平台</h1>
          <Button type="default" ghost><Link href={"/login"}>去登录</Link></Button>
      </div>

    </>
  )
}
