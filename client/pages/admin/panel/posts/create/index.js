import AdminPanelLayout from "../../../../../layouts/AdminPanelLayout";
import {useForm} from 'react-hook-form';
import styles from "./index.module.scss";
import Image from 'next/image'
import plusImg from '../../../../../public/plus.png'
import Editor from "../../../../../components/Editor";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import PostPreview from "../../../../../components/PostPreview";
import {Category} from "../../../../../core/mock";
import {Select} from "antd";
import FetchSelect, {fetchUserList} from "../../../../../components/UI/FetchSelect";


function NewPost() {
    const [fullPost, setFullPost] = useState(null)
    const [value, setValue] = useState([]);
    const [postBody, setPostBody] = useState('')
    const imageRef = useRef()
    const [titleImage, setTitleImage] = useState('')
    const [category, setCategory] = useState('')
    const [previewState, setPreviewState] = useState(false)
    const { register,watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description:'',
        }
    });
    const watchAllFields = watch();

    useEffect(() => {
        scrollTo(top)
        setFullPost({...watchAllFields, post: postBody, titleImg: titleImage})
    }, [previewState])

    const onSubmit = (data) => {
        setFullPost({...data, post: postBody, titleImg: titleImage})
        axios.post(
            '/api/posts',
            {
                ...data, content: postBody, imageUrl: titleImage, category, readAlso: [
                    "634adfc0b3152bd7eb481f06",
                    "634ae06fc43506a1e371d7ba"
                ], userId: '633ad4e026be25c7184a194f'
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
            setTitleImage(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const imgRemove = () => {
        axios.delete('/api' + titleImage.url)
            .then((response) => {
                // TODO сделать алерт
            })
            .catch((error) => {
            console.log(error)
        })
    }

    const onChange = (value) => {
        setCategory(value)
    };

    return (
        <AdminPanelLayout>
            <div className="container-admin">
                <h1>Новая статья</h1>
                <div className={styles.flexWrp}>
                    <div>
                        <p>Выберите категорию</p>
                        <Select
                            placeholder="Выберите категорию"
                            optionFilterProp="children"
                            onChange={onChange}
                            options={Category}
                            style={{
                                width: '300px',
                            }}
                        />
                    </div>
                    <div>
                        {
                            category === 'community'
                                ? <>
                                    <p>Выберите креатора</p>
                                    <FetchSelect
                                        showSearch
                                        value={value}
                                        placeholder="Поиск по логину или имени"
                                        fetchOptions={fetchUserList}
                                        onChange={(newValue) => {
                                            console.log(newValue.value)
                                            setValue(newValue);
                                        }}
                                        style={{
                                            width: '300px',
                                        }}
                                    />
                                </>
                                : <></>
                        }
                    </div>
                </div>
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
                                        imgRemove()
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
                                    style={errors.title ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'description'}>
                                    Описание
                                </label>
                                <textarea
                                    className={styles.newPostForm__textArea}
                                    placeholder={'Описание статьи'}
                                    name={'description'}
                                    id={'description'}
                                    {...register("description",
                                        {required: true, minLength: 5, maxLength: 200})}
                                    style={errors.description ? {borderColor: 'red', background: '#ffc8c8', minHeight: '323px'} : {minHeight: '323px'}}
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
                        <Editor onChange={(data) => setPostBody(data)}/>
                    </div>

                    <div style={previewState?{position:'fixed'}:{}} className={styles.newPostForm__wrpBtn}>
                        <input className={'btn'} type={'submit'} value={'Опубликовать'}/>
                        <div onClick={()=>setPreviewState(!previewState)}
                             className={'btn'}>
                            {
                                previewState?'Редактировать':'Предпросмотр'
                            }
                        </div>
                    </div>
                    <div style={{height:'100px'}}></div>
                </form>
                {
                    previewState?<PostPreview data={fullPost}/>:''
                }
            </div>
        </AdminPanelLayout>
    )
}

export default NewPost;