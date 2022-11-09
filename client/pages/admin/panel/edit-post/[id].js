import AdminPanelLayout from "../../../../layouts/AdminPanelLayout";
import styles from "./index.module.scss";
import Image from 'next/image'
import plusImg from '../../../../public/plus.png'
import Editor from "../../../../components/Editor";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import PostPreview from "../../../../components/PostPreview";


function EditPost({id}) {
    const [fullPost, setFullPost] = useState(null)
    const [postBody, setPostBody] = useState('')
    const imageRef = useRef()
    const [titleImage, setTitleImage] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [previewState, setPreviewState] = useState(false)

    useEffect(() => {
        console.log(id)
        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setDescription(data.description)
                setContent(data.content)
                setTitleImage(data.imageUrl)
            })
    }, [])

    const onSubmit = (event, data) => {
        event.preventDefault()
        console.log(title, description, postBody, titleImage)
        // setFullPost({...data, post: postBody, titleImg: titleImage})
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
                <h1>Редактировать статью</h1>
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
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
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.newPostForm__label}>
                            Тело поста
                        </label>
                        <br/>
                        <br/>
                        <Editor initialContent={content} onChange={(data) => setPostBody(data)}/>
                    </div>

                    <div style={previewState ? {position: 'fixed'} : {}} className={styles.newPostForm__wrpBtn}>
                        <input className={'btn'} type={'submit'} value={'Сохранить'}/>
                        <div onClick={() => setPreviewState(!previewState)}
                             className={'btn'}>
                            {
                                previewState ? 'Редактировать' : 'Предпросмотр'
                            }
                        </div>
                    </div>
                    <div style={{height: '100px'}}></div>
                </form>
                {
                    previewState ? <PostPreview data={fullPost}/> : ''
                }
            </div>
        </AdminPanelLayout>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {id: context.params.id}, // will be passed to the page component as props
    }
}

export default EditPost;