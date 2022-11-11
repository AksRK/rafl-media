import AdminPanelLayout from "../../../../../layouts/AdminPanelLayout";
import styles from "./index.module.scss";
import Image from 'next/image'
import plusImg from '../../../../../public/plus.png'
import Editor from "../../../../../components/Editor";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import PostPreview from "../../../../../components/PostPreview";
import {useForm} from "react-hook-form";
import {Select} from "antd";
import {Category} from "../../../../../core/mock";


function EditPost({id, post}) {
    const [fullPost, setFullPost] = useState(null)
    const [postBody, setPostBody] = useState(post?.content)
    const [category, setCategory] = useState(post?.category)
    const imageRef = useRef()
    const [titleImage, setTitleImage] = useState(post?.imageUrl)
    const [previewState, setPreviewState] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title,
            description: post?.description,
        }
    });
    const onSubmit = (data) => {
        event.preventDefault()
        console.log({...data, post: postBody, titleImg: titleImage, category})
        // setFullPost({...data, post: postBody, titleImg: titleImage})
        axios.put(
            `/api/posts/${id}`,
            {...data, post: postBody, content: postBody, imageUrl: titleImage, readAlso: [
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
            // TODO сделать алерт
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

    const onChange = (value) => {
        setCategory(value)
    };

    return (
        <AdminPanelLayout>
            <div className="container-admin">
                <h1>Редактировать статью</h1>
                <Select
                    placeholder="Выберите категорию"
                    optionFilterProp="children"
                    onChange={onChange}
                    value={category}
                    options={Category}
                />
                <br/><br/>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    {...register("title",
                                        {required: true, minLength: 5, maxLength: 80})}
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
                                    {...register("description",
                                        {required: true, minLength: 5, maxLength: 200})}
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
                        <Editor initialContent={postBody} onChange={(data) => setPostBody(data)}/>
                    </div>

                    <div style={previewState ? {position: 'fixed'} : {}} className={styles.newPostForm__wrpBtn}>
                        <input className={'btn'} type={'submit'} value={'Опубликовать'}/>
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
    const post = await fetch(`http://localhost:3000/api/posts/${context.params.id}`)
        .then(res => res.json())

    return {
        props: {id: context.params.id, post }, // will be passed to the page component as props
    }
}

export default EditPost;