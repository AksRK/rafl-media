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
import FetchSelect, {fetchReadAlsoPost, fetchReadAlsoCreatorPost, fetchUserList} from "../../../../../components/UI/FetchSelect";
import CyrillicToTranslit from "cyrillic-to-translit-js";

import { ToastContainer, toast } from 'react-toastify';
import {useRouter} from "next/router";
import {alert} from "../../../../../core/utils";


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
    const router = useRouter()

    const [findReadAlsoPostPrimary, setFindReadAlsoPostPrimary] = useState([])
    const [findReadAlsoPostSecondary, setFindReadAlsoPostSecondary] = useState([])



    useEffect(() => {
        scrollTo(top)
        setFullPost({...watchAllFields, post: postBody, titleImg: titleImage})
    }, [previewState])

    const onSubmit = (data) => {
        setFullPost({...data, post: postBody, titleImg: titleImage})
        const titleUrl = CyrillicToTranslit().transform(data.title, "-").replaceAll('?', '').replaceAll('&', '').toLowerCase()
        axios.post(
            category === 'community' ?'/api/creator/posts' : '/api/posts',
            category === 'community' ? {
                ...data, content: postBody, imageUrl: titleImage, category, titleUrl: titleUrl, creator: value.value, readAlso: [
                    findReadAlsoPostPrimary.key,
                    findReadAlsoPostSecondary.key,
                ], userId: '633ad4e026be25c7184a194f'
            } : {
                ...data, content: postBody, imageUrl: titleImage, category, titleUrl: titleUrl, readAlso: [
                    findReadAlsoPostPrimary.key,
                    findReadAlsoPostSecondary.key,
                ], userId: '633ad4e026be25c7184a194f'
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            if (response) {
                alert('???????????? ???????? ????????????????????????!', 'success')
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
            alert('???????????????? ??????????????????!', 'info')
        }).catch((error) => {
            alert('???????????? ????????????????, ???????????????????? ???????? ???????????? png/jpg/jpeg, ???????????????????????? ???????????? 5????', 'error')
        })
    }

    const imgRemove = () => {
        axios.delete('/api' + titleImage.url)
            .then((response) => {
                alert('???????????????? ??????????????!', 'info')
            })
            .catch((error) => {
                alert(error.msg || error.message, 'error')
        })
    }

    const onChange = (value) => {
        setCategory(value)
    };

    useEffect(() => {
        if (findReadAlsoPostSecondary.key === findReadAlsoPostPrimary.key && findReadAlsoPostSecondary.key && findReadAlsoPostPrimary.key) {
            alert('???????????? ???????????????????????? 2 ???????????????????? ????????????!', 'error')
            setFindReadAlsoPostPrimary([])
            setFindReadAlsoPostSecondary([])
        }
    }, [findReadAlsoPostSecondary, findReadAlsoPostPrimary])

    useEffect(() => {
        setFindReadAlsoPostPrimary([])
        setFindReadAlsoPostSecondary([])
    }, [category])

    return (
        <AdminPanelLayout>
            <div className="container-admin">
                <h1>?????????? ????????????</h1>
                <div className={styles.flexWrp}>
                    <div>
                        <p>???????????????? ??????????????????</p>
                        <Select
                            placeholder="???????????????? ??????????????????"
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
                                    <p>???????????????? ????????????????</p>
                                    <FetchSelect
                                        showSearch
                                        value={value}
                                        placeholder="?????????? ???? ???????????? ?????? ??????????"
                                        fetchOptions={fetchUserList}
                                        onChange={(newValue) => {
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
                                    ?????????????????? ????????????
                                </label>
                                <textarea
                                    className={styles.newPostForm__textArea}
                                    placeholder={'?????????????????? ????????????'}
                                    name={'title'}
                                    id={'title'}
                                    {...register("title")}
                                    style={errors.title ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'description'}>
                                    ????????????????
                                </label>
                                <textarea
                                    className={styles.newPostForm__textArea}
                                    placeholder={'???????????????? ????????????'}
                                    name={'description'}
                                    id={'description'}
                                    {...register("description")}
                                    style={errors.description ? {borderColor: 'red', background: '#ffc8c8', minHeight: '323px'} : {minHeight: '323px'}}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.newPostForm__label}>
                            ?????????????? ??????????:
                        </label>
                        <div style={{display:'flex', flexWrap:'wrap', gap:'12px', marginTop:'20px'}}>
                            <div>
                                <FetchSelect
                                    showSearch
                                    value={findReadAlsoPostPrimary}
                                    placeholder="?????????? ???? ?????????????????? ??????????"
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
                                    ????????????????
                                </span>
                            </div>
                            <span style={{height:'30px', width:'1px', background:'#000000'}}></span>
                            <div>
                                <FetchSelect
                                    showSearch
                                    value={findReadAlsoPostSecondary}
                                    placeholder="?????????? ???? ?????????????????? ??????????"
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
                                    ????????????????
                                </span>
                            </div>

                        </div>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.newPostForm__label}>
                            ???????? ??????????
                        </label>
                        <br/>
                        <br/>
                        <Editor onChange={(data) => setPostBody(data)}/>
                    </div>

                    <div style={previewState?{position:'fixed'}:{}} className={styles.newPostForm__wrpBtn}>
                        <input className={'btn'} type={'submit'} value={'????????????????????????'}/>
                        <div onClick={()=>setPreviewState(!previewState)}
                             className={'btn'}>
                            {
                                previewState?'??????????????????????????':'????????????????????????'
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