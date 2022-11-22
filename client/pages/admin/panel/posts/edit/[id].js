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
import CyrillicToTranslit from "cyrillic-to-translit-js";
import {ToastContainer} from "react-toastify";
import {useRouter} from "next/router";
import {alert} from "../../../../../core/utils";
import FetchSelect, {fetchReadAlsoCreatorPost, fetchReadAlsoPost} from "../../../../../components/UI/FetchSelect";


function EditPost({id, post, type = ''}) {
    const [fullPost, setFullPost] = useState(null)
    const [postBody, setPostBody] = useState(post?.content)
    const [category, setCategory] = useState(type === 'creator' ? 'community' : post?.category)
    const imageRef = useRef()
    const [titleImage, setTitleImage] = useState(post?.imageUrl)
    const [previewState, setPreviewState] = useState(false)
    const { register,watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title,
            description: post?.description,
            likes: post?.likes,
            viewsCount: post?.viewsCount,
        }
    });
    const watchAllFields = watch();
    const router = useRouter();

    const [findReadAlsoPostPrimary, setFindReadAlsoPostPrimary] = useState([])
    const [findReadAlsoPostSecondary, setFindReadAlsoPostSecondary] = useState([])
    useEffect(() => {
        scrollTo(top)
        setFullPost({...watchAllFields, post: postBody, titleImg: titleImage})
        post?.readAlso.map((el, index) => {
            if (el !== null) {
                fetch(`/api/${category === 'community'?'creator/posts/edit/':'posts/edit/'}${el}`)
                    .then((response) => response.json())
                    .then((body) => {
                            if (index === 0) {
                                return setFindReadAlsoPostPrimary({
                                    key: body?._id,
                                    label: body?.title,
                                    value: body?.title,
                                })
                            }
                            return setFindReadAlsoPostSecondary({
                                key: body?._id,
                                label: body?.title,
                                value: body?.title,
                            })
                        }
                    );
            }
        })
    }, [previewState])

    useEffect(() => {
        if (findReadAlsoPostSecondary.key === findReadAlsoPostPrimary.key && findReadAlsoPostSecondary.key && findReadAlsoPostPrimary.key) {
            alert('Нельзя использовать 2 одинаковые статьи!', 'error')
            setFindReadAlsoPostPrimary([])
            setFindReadAlsoPostSecondary([])
        }else if (findReadAlsoPostSecondary.key === post._id || findReadAlsoPostPrimary.key === post._id) {
            alert('Вы не можете рекомендовать эту статью!', 'error')
            setFindReadAlsoPostPrimary([])
            setFindReadAlsoPostSecondary([])
        }
    }, [findReadAlsoPostSecondary, findReadAlsoPostPrimary])

    const onSubmit = (data) => {
        event.preventDefault()
        const titleUrl = CyrillicToTranslit().transform(data.title, "-").replaceAll('?', '').replaceAll('&', '').toLowerCase()

        axios.put(
            type === 'creator' ? `/api/creator/posts/${id}` :`/api/posts/${id}`,
            {...data, post: postBody, content: postBody, titleUrl, imageUrl: titleImage, readAlso: [
                    findReadAlsoPostPrimary.key,
                    findReadAlsoPostSecondary.key,
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            if (response) {
                alert('Статья была успешно отредактирована!', 'success')
                setTimeout(() => {
                    router.push('/admin/panel/posts')
                }, 3000)
            }
        }).catch((error) => {
            if (error.response) {
                error.response.data?.map((er) => {
                    alert(er.msg || er.message, 'error')
                })
            }
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
            setTitleImage(response.data)
            alert('Картинка загружена!', 'info')
        }).catch((error) => {
            alert('Ошибка загрузки, допустимые типы файлов png/jpg/jpeg, максимальный размер 5мб', 'error')
        })
    }

    const imgRemove = () => {
        axios.delete('/api' + titleImage.url)
            .then((response) => {
                alert('Картинка удалена!', 'info')
            })
            .catch((error) => {
                alert(error.msg || error.message, 'error')
            })
    }

    const onChange = (value) => {
        setCategory(value)
    };

    return (
        <AdminPanelLayout>
            <ToastContainer/>
            <div className="container-admin">
                <h1>Редактировать статью</h1>
                <Select
                    disabled={true}
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
                                        <Image src={titleImage.fullUrl} alt={123} width={500} height={500}/>
                                    </div>
                                    <div onClick={() => {
                                        imageRef.current.value = ''
                                        setTitleImage(null)
                                        imgRemove()
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
                                    {...register("title")}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'description'}>
                                    Описание
                                </label>
                                <textarea
                                    className={styles.newPostForm__textArea}
                                    style={{minHeight: '257px'}}
                                    placeholder={'Описание статьи'}
                                    name={'description'}
                                    id={'description'}
                                    {...register("description")}
                                />
                            </div>
                            <div className={styles.newPostForm__counter}>
                                <div className={styles.newPostForm__controller}>
                                    <label className={styles.newPostForm__label}
                                           htmlFor={'viewsCount'}>
                                        Кол-во лайков
                                    </label>
                                    <input type="text"
                                           name={'likes'}
                                           id={'likes'}
                                           {...register("likes",
                                               {required: true, valueAsNumber: true})}
                                           className={styles.newPostForm__input}
                                           style={errors.likes ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                    />
                                </div>
                                <div className={styles.newPostForm__controller}>
                                    <label className={styles.newPostForm__label}
                                           htmlFor={'viewsCount'}>
                                        Кол-во просмотров
                                    </label>
                                    <input type="text"
                                           name={'viewsCount'}
                                           id={'viewsCount'}
                                           {...register("viewsCount",
                                               {required: true, valueAsNumber: true})}
                                           className={styles.newPostForm__input}
                                           style={errors.viewsCount ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.newPostForm__label}>
                            Читайте также:
                        </label>
                        <div style={{display:'flex', flexWrap:'wrap', gap:'12px', marginTop:'20px'}}>
                            <div>
                                <FetchSelect
                                    showSearch
                                    value={findReadAlsoPostPrimary}
                                    placeholder="Поиск по заголовку поста"
                                    fetchOptions={category === 'community' ?fetchReadAlsoCreatorPost:fetchReadAlsoPost}
                                    onChange={(newValue) => {
                                        setFindReadAlsoPostPrimary(newValue);
                                    }}
                                    style={{
                                        width: '300px',
                                    }}
                                />
                                <span style={{display: 'inline-block', padding: '5px 10px', marginLeft: '10px', userSelect: 'none'}}
                                      className={'btn'}
                                      onClick={()=> setFindReadAlsoPostPrimary([])}>
                                    Очистить
                                </span>
                            </div>
                            <span style={{height:'30px', width:'1px', background:'#000000'}}></span>
                            <div>
                                <FetchSelect
                                    showSearch
                                    value={findReadAlsoPostSecondary}
                                    placeholder="Поиск по заголовку поста"
                                    fetchOptions={category === 'community' ?fetchReadAlsoCreatorPost:fetchReadAlsoPost}
                                    onChange={(newValue) => {
                                        setFindReadAlsoPostSecondary(newValue);
                                    }}
                                    style={{
                                        width: '300px',
                                    }}
                                />
                                <span style={{display: 'inline-block', padding: '5px 10px', marginLeft: '10px', userSelect: 'none'}}
                                      className={'btn'}
                                      onClick={()=> setFindReadAlsoPostSecondary([])}>
                                    Очистить
                                </span>
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
    let post;
    if (context.query?.type === 'creator') {
        post = await fetch(`http://localhost:3000/api/creator/posts/${context.params.id}`)
            .then(res => res.json())
    } else {
        post = await fetch(`http://localhost:3000/api/posts/${context.params.id}`)
            .then(res => res.json())
    }

    return {
        props: {id: context.params.id, post, type: context.query.type }, // will be passed to the page component as props
    }
}

export default EditPost;