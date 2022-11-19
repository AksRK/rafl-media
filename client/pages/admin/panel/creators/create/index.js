import AdminPanelLayout from "../../../../../layouts/AdminPanelLayout";
import {useForm} from 'react-hook-form';
import styles from "./index.module.scss";
import Image from 'next/image'
import plusImg from '../../../../../public/plus.png'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Input, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {ToastContainer} from "react-toastify";
import {alert} from "../../../../../core/utils";
import {useRouter} from "next/router";

function NewCreator() {
    const imageRef = useRef()
    const [tags, setTags] = useState([]);
    const [titleImage, setTitleImage] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            description: '',
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
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const onSubmit = (data) => {
        axios.post(
            '/api/creator',
            {...data, imageUrl: titleImage, social: tags},
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            if (response) {
                alert('Креатор успешно добавлен', 'success')
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

    return (
        <AdminPanelLayout>
            <ToastContainer/>
            <div className="container-admin">
                <h1>Создать креатора</h1>
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
                                    Полное имя
                                </label>
                                <input type="text"
                                       name={'fullName'}
                                       id={'fullName'}
                                       placeholder={'ФИО'}
                                       {...register("fullName",
                                           {required: true, minLength: 5, maxLength: 80})}
                                       className={styles.newPostForm__input}
                                       style={errors.fullName ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>

                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'login'}>
                                    Логин
                                </label>
                                <input type="text"
                                       name={'login'}
                                       id={'login'}
                                       placeholder={'Введите логин'}
                                       {...register("login",
                                           {required: true, minLength: 3, maxLength: 80, pattern: /^[A-Za-z0-9]*$/})}
                                       className={styles.newPostForm__input}
                                       style={errors.login ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'about'}>
                                    О креаторе
                                </label>
                                <input type="text"
                                       name={'about'}
                                       id={'about'}
                                       placeholder={'Коротко о креаторе'}
                                       {...register("about",
                                           {required: true, minLength: 5, maxLength: 100})}
                                       className={styles.newPostForm__input}
                                       style={errors.about ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'kindActivity'}>
                                    Вид деятельности
                                </label>
                                <input type="text"
                                       name={'kindActivity'}
                                       id={'kindActivity'}
                                       {...register("kindActivity",
                                           {required: true, minLength: 5, maxLength: 100})}
                                       className={styles.newPostForm__input}
                                       style={errors.kindActivity ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className={styles.newPostForm__controller}>
                        <label className={styles.newPostForm__label}
                               htmlFor={'description'}>
                            Описание
                        </label>
                        <textarea
                            className={styles.newPostForm__textArea}
                            style={{minHeight: '103px'}}
                            name={'description'}
                            id={'description'}
                            {...register("description",
                                {required: true, minLength: 5, maxLength: 200})}
                            // value={description}
                            // onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={styles.newPostForm__controller}>
                        <label className={styles.newPostForm__label}
                               htmlFor={'social'}>
                            Cоц. сети
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
                                    : <><PlusOutlined/>Добавить ссылку на соц. сеть</>
                                }
                            </Tag>
                        </div>
                    </div>
                    <div className={styles.newPostForm__wrpBtn}>
                        <input className={'btn'} type={'submit'} value={'Создать'}/>
                    </div>
                </form>
            </div>
        </AdminPanelLayout>
    )
}

export default NewCreator;