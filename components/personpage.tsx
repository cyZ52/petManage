import style from './personpage.module.scss'

export default function PersonPage(){

    return (
        <>
        <div className={style['PersonPage']}>
            <h2 className={style['PersonPage-title']}>个人中心</h2>
        </div>
        </>
    )
}