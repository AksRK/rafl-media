import AdminPanelLayout from "../../../../../layouts/AdminPanelLayout";
import {useForm} from 'react-hook-form';
import styles from "./index.module.scss";
import Image from 'next/image'
import plusImg from '../../../../../public/plus.png'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Input, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import {alert} from "../../../../../core/utils";
import {ToastContainer} from "react-toastify";

function EditCreator({id, creator}) {
    const imageRef = useRef()
    const [tags, setTags] = useState(creator?.social);
    const [titleImage, setTitleImage] = useState(creator?.imageUrl)
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            fullName: creator?.fullName,
            description: creator?.description,
            about: creator?.about,
            // login: creator?.login,
            kindActivity: creator?.kindActivity,
            viewsCount: creator?.viewsCount,
        }
    });

    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);
    const router = useRouter()

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };
    const showInput = () => {
        setInputVisible(true);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            if (inputValue.toLowerCase().includes('http://') || inputValue.toLowerCase().includes('https://')) {
                setTags([...tags, inputValue]);
            }else {
                alert('???????????? ???????????? ?????????????????? http:// ?????? https://', 'error')
            }
        }
        setInputVisible(false);
        setInputValue('');
    };

    const onSubmit = (data) => {
        axios.put(
            `/api/creator/${id}`,
            {...data, imageUrl: titleImage, social: tags},
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            if (response) {
                alert('?????????????? ?????????????? ????????????????', 'success')
                setTimeout(() => {
                    router.push('/admin/panel/creators/')
                }, 3000)
            }
        }).catch((error) => {
            if (error.response) {
                error.response.data?.map((er) => {
                    alert(er.msg, 'error')
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

    return (
        <AdminPanelLayout>
            <div className="container-admin">
                <h1>?????????????????? ???????????? ????????????????</h1>
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
                                       htmlFor={'fullName'}>
                                    ???????????? ??????
                                </label>
                                <input type="text"
                                       name={'fullName'}
                                       id={'fullName'}
                                       placeholder={'??????'}
                                       {...register("fullName")}
                                       className={styles.newPostForm__input}
                                       style={errors.fullName ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>

                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'about'}>
                                    ?? ????????????????
                                </label>
                                <input type="text"
                                       name={'about'}
                                       id={'about'}
                                       placeholder={'?????????????? ?? ????????????????'}
                                       {...register("about")}
                                       className={styles.newPostForm__input}
                                       style={errors.about ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'kindActivity'}>
                                    ?????? ????????????????????????
                                </label>
                                <input type="text"
                                       name={'kindActivity'}
                                       id={'kindActivity'}
                                       {...register("kindActivity")}
                                       className={styles.newPostForm__input}
                                       style={errors.kindActivity ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'viewsCount'}>
                                    ??????-???? ????????????????????
                                </label>
                                <input type="text"
                                       name={'viewsCount'}
                                       id={'viewsCount'}
                                       {...register("viewsCount")}
                                       className={styles.newPostForm__input}
                                       style={errors.viewsCount ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className={styles.newPostForm__controller}>
                        <label className={styles.newPostForm__label}
                               htmlFor={'description'}>
                            ????????????????
                        </label>
                        <textarea
                            className={styles.newPostForm__textArea}
                            style={{minHeight: '103px'}}
                            name={'description'}
                            id={'description'}
                            {...register("description")}
                        />
                    </div>
                    <div className={styles.newPostForm__controller}>
                        <label className={styles.newPostForm__label}
                               htmlFor={'social'}>
                            C????. ????????
                        </label>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}>
                            {tags.map((tag, index) => (
                                <Tag
                                    className={styles.editTag}
                                    key={tag}
                                    closable={true}
                                    onClose={() => handleClose(tag)}
                                >
                                    {tag}
                                </Tag>
                            ))}
                            <Tag className={styles.siteTagPlus} onClick={showInput}>
                                {inputVisible
                                    ? <Input
                                        ref={inputRef}
                                        type="text"
                                        size="small"
                                        className={styles.tagInput}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={handleInputConfirm}
                                        onPressEnter={handleInputConfirm}
                                    />
                                    : <><PlusOutlined/>???????????????? ???????????? ???? ??????. ????????</>
                                }
                            </Tag>
                        </div>
                    </div>
                    <div className={styles.newPostForm__wrpBtn}>
                        <input className={'btn'} type={'submit'} value={'??????????????????'}/>
                    </div>
                </form>
            </div>
        </AdminPanelLayout>
    )
}

export async function getServerSideProps(context) {
    const creator = await fetch(`http://localhost:3000/api/creator/${context.params.id}`)
        .then(res => res.json())

    return {
        props: {id: context.params.id, creator }, // will be passed to the page component as props
    }
}

export default EditCreator;