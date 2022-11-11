import styles from './index.module.scss'
import postStyle from '../../pages/posts/index.module.scss'
import Image from "next/image";

export default function PostPreview({data}) {

    return (
        <div className={styles.postPreview}>
            {
                !data
                    ?<h1 style={{margin:'30px auto', textAlign:'center'}}>Нечего смотреть, поля пустые...</h1>
                    :<section className={postStyle.fullPost}>
                        <div className={postStyle.fullPost__head}>
                            <h1 className={'page-title page-title--full-post'}>
                                {
                                    data.title?data.title:'Вы не указали заголовок..'
                                }
                            </h1>
                            <span className={postStyle.fullPost__description}>
                        {
                            data.description?data.description:'Вы не указали описание..'
                        }
                    </span>
                            <div className={postStyle.fullPost__titleImg}>
                                {
                                    data.titleImg
                                        ?<Image src={data.titleImg.fullUrl} alt="" width={300} height={300}/> //авто не работает, срань -_-
                                        :'Картинка не загружена...'
                                }
                            </div>
                        </div>


                        <div className={postStyle.fullPost__wrp}>

                            <div className={postStyle.fullPost__content}>
                                {
                                    data.post
                                        ?<div className={'sun-editor-editable sun-editor-editable--content'}
                                              dangerouslySetInnerHTML={{__html: data.post}}/>
                                        :'Тело поста пустое...'
                                }

                            </div>
                        </div>
                    </section>
            }
        </div>
    )
}