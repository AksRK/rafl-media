import Logo from '../../UI/Logo'
import styles from './index.module.scss'

export default function PreLoader() {

    return (
        <div className={styles.preLoader}>
            <div className={styles.preLoader__logoWrp}>
                <Logo/>
            </div>
        </div>
    )
}