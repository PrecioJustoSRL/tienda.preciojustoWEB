import style from './Tolkipt.module.css'
import { useUser } from '@/context/Context.js'

export default function Error (props) {
    const { setFilterDis, user, userDB, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, cart, setUserCart, modal, setModal, setFilter, success } = useUser()

    return (
        <span className={style.error}>{props.children}</span>
    )
}