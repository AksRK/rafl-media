import AdminPanelLayout from "../../../../../layouts/AdminPanelLayout";
import styles from "./index.module.scss";
import Image from 'next/image'
import plusImg from '../../../../../public/plus.png'
import {useEffect, useRef, useState} from "react";
import axios from "axios";


function EditCreator({id}) {
    const imageRef = useRef()
    const [titleImage, setTitleImage] = useState('')

    useEffect(() => {
        fetch(`/api/creator/${id}`)
            .then(res => res.json())
            .then(data => {
                // setTitleImage(data.imageUrl)
            })
    }, [])

    const onSubmit = (event, data) => {
        event.preventDefault()
        // setFullPost({...data, post: postBody, titleImg: titleImage})
        axios.put(
            `/api/posts/${id}`,
            {
                title, description, content: postBody, imageUrl: titleImage, readAlso: [
                    "634adfc0b3152bd7eb481f06",
                    "634ae06fc43506a1e371d7ba"
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            // alert('success')
        }).catch((error) => {
            console.log(error)
        })
    }

    const imgUpload = (event) => {
        const Data = new FormData()
        Data.append('image', event.target.files[0])
        axios.post(
            '/api/uploads',
            Data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
            setTitleImage(response.data.fullUrl)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <AdminPanelLayout>
            <div className="container-admin">
                <h1>Редактировать креатора</h1>
                <form onSubmit={onSubmit}>
                    <div className={styles.newPostFormWrp}>
                        <div className={styles.addImg}>
                            <input
                                type="file"
                                accept="image/*"
                                ref={imageRef}
                                name={'titleImg'}
                                id={'titleImg'}
                                onChange={(event) => imgUpload(event)}
                            />
                            <div className={styles.addImg__plus}>
                                <Image src={plusImg} alt={'plus'}/>
                            </div>
                            {titleImage
                                ? <>
                                    <div className={styles.addImg__preview}>
                                        <Image src={titleImage} alt={123} width={500} height={500}/>
                                    </div>
                                    <div onClick={() => {
                                        imageRef.current.value = ''
                                        setTitleImage(null)
                                    }}
                                         className={styles.addImg__plus + ' ' + styles.addImg__plus_del}>
                                        <Image src={plusImg} alt={'plus'}/>
                                    </div>
                                </>
                                : ''
                            }
                        </div>
                        <div style={{flexGrow: 1}}>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'title'}>
                                    Заголовок статьи
                                </label>
                                <textarea
                                    className={styles.newPostForm__textArea}
                                    placeholder={'Заголовок статьи'}
                                    name={'title'}
                                    id={'title'}
                                    // value={title}
                                    // onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'description'}>
                                    Описание
                                </label>
                                <textarea
                                    className={styles.newPostForm__textArea}
                                    style={{minHeight: '323px'}}
                                    placeholder={'Описание статьи'}
                                    name={'description'}
                                    id={'description'}
                                    // value={description}
                                    // onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>

                    <div className={styles.newPostForm__wrpBtn}>
                        <input className={'btn'} type={'submit'} value={'Сохранить'}/>
                    </div>
                    <div style={{height: '100px'}}></div>
                </form>
            </div>
        </AdminPanelLayout>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {id: context.params.id}, // will be passed to the page component as props
    }
}

export default EditCreator;