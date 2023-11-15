import Sidebar from "@/components/sidebar"
import style from "@/styles/Home.module.scss"


export default function Home() {

    return (
        <>
            <div className={style["home"]}>
                <Sidebar />
            </div>
        </>

    )
}