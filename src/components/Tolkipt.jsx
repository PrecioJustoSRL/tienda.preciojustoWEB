import style from './Tolkipt.module.css'

export default function Error (props) {
    return (
        <span className={style.error}>{props.children}</span>
    )
}