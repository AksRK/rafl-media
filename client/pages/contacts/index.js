import styles from './index.module.scss'
import {NextSeo} from "next-seo";

export default function Contacts({contacts}) {
    return (
        <>
            <NextSeo
                title={`RAFL - Контакты`}
                openGraph={{
                    title: `RAFL - Контакты`,
                }}
            />
            <div className={styles.contacts}>
                <h2 className={'page-title'}>Контакты</h2>

                <div className={styles.contacts__wrp}>
                    {
                        contacts?.map((contact) => {
                            return (
                                <div key={contact._id} className={styles.contacts__el}>
                                    <span>{contact.title}:</span>
                                    <a className={'link link_hover_black'} href={contact.url}
                                       target="_blank" rel="noreferrer">
                                        <span>
                                            {
                                                contact.titleUrl
                                                    ?contact.titleUrl
                                                    :contact.url.split('//')[1]
                                            }
                                        </span>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const contacts = await fetch(`http://localhost:3000/api/project/contacts`).then(r => r.json())
    return {
        props: {contacts: contacts}
    }
}