import styles from './index.module.scss'

export default function MyMain({children, bigPadding = false, post = false}) {

    return (
        <main className={styles.main + ' ' +
            (bigPadding?styles.main_big_padding:'') +
            (post?styles.main_postBody:'')}>
            {children}
        </main>
    )
}