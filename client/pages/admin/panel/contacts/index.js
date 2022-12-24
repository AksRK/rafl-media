import AdminPanelLayout from "../../../../layouts/AdminPanelLayout";
import {useEffect, useState} from "react";
import axios from "axios";
import {alert, formatRuDate} from "../../../../core/utils";
import {Dropdown, Input, Modal, Table} from "antd";
import {ExclamationCircleFilled, SettingOutlined} from "@ant-design/icons";
import {ToastContainer} from "react-toastify";

function Contacts() {
    const { confirm } = Modal;
    const [editContact, setEditContact] = useState(null)
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValue, setFormValue] = useState({title:'', url:'', titleUrl:''})

    useEffect(() => {
        loadContacts()
    }, [JSON.stringify(dataSource)])

    function loadContacts() {
        setLoading(true)
        axios.get(
            `/api/project/contacts`,).then(res => {
            setDataSource(res.data?.map(p => ({...p, createdAt: formatRuDate(p.createdAt)})))
            setLoading(false)})
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (editContact) {
            return editContactFunc()
        }
        return addNewContactFunc()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setEditContact(null)
        setFormValue({title:'', url:'', titleUrl:''})
    };

    const renderItems = (id) => {
        return [
            {
                key: id,
                label: (
                    <span onClick={()=> {
                        showModal()
                        setEditContact(id)
                        const currContact = dataSource.filter((el)=> el._id === id?el:null)[0]
                        setFormValue({title: currContact.title, url: currContact.url, titleUrl: currContact.titleUrl?currContact.titleUrl:''})
                    }}>
                        Редактировать
                    </span>
                ),
            },
            {
                key: '2',
                danger: true,
                onClick: () => {
                    deleteContact(id)
                },
                label: 'Удалить контакт',
            },
        ]
    }
    const columns = [
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ссылка',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Название ссылки',
            dataIndex: 'titleUrl',
            key: 'titleUrl',
            render: (text) => {
                return (
                    <>
                        {text?text:'Не указано'}
                    </>
                )
            }
        },
        {
            title: 'Действия',
            key: 'action',
            render: (text) => {
                return <Dropdown menu={{items: renderItems(text._id)}}>
                    <SettingOutlined style={{fontSize: '20px'}}/>
                </Dropdown>
            },
        },
    ];

    function addNewContactFunc() {
        axios.post(
            `/api/project/contacts/`,
            {...formValue},
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            if (response) {
                alert('Добавлен новый контакт!', 'success')
                setIsModalOpen(false);
                setFormValue({title:'', url:'', titleUrl:''})
                setEditContact(null)
                loadContacts()
            }
        }).catch((error) => {
            if (error.response) {
                error.response.data?.map((er) => {
                    alert(er.msg || er.message, 'error')
                })
            }
        })
    }
    function editContactFunc() {
        axios.put(
            `/api/project/contacts/${editContact}`,
            {...formValue},
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            if (response) {
                alert('Данные контакта обновлены!', 'success')
                setIsModalOpen(false);
                setFormValue({title:'', url:'', titleUrl:''})
                setEditContact(null)
                loadContacts()
            }
        }).catch((error) => {
            if (error.response) {
                error.response.data?.map((er) => {
                    alert(er.msg || er.message, 'error')
                })
            }
        })
    }

    const deleteContact = (id) => {
        confirm({
            title: 'Удалить контакт?',
            icon: <ExclamationCircleFilled />,
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            style: {
                top:'40%'
            },
            onOk() {
                axios.delete(`/api/project/contacts/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(r => {
                    setDataSource(dataSource.filter((item) => item._id !== id))
                    alert('контакт удален', 'success')
                })
            },
            onCancel() {
                alert('Вы отменили удаление', 'info')
            },
        });
    };

    return (
        <AdminPanelLayout>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <h1 style={{
                        marginBottom: 0,
                    }}>Контакты</h1>
                </div>
                <button onClick={()=> showModal()} className={'btn'}>
                    Добавить контакт
                </button>
            </div>
            <Modal title={editContact?'Изменить контакт':'Новый контакт'}
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   footer={[
                       <div key={'btn-wrp'} style={{display:'flex', justifyContent:'center', gap:'5px'}}>
                           <button key="submit" className={'btn'} style={{display:'inline-block'}} type="primary" onClick={handleOk}>
                               {editContact?'Сохранить':'Добавить'}
                           </button>
                       </div>
                    ]}
                   width={1000}>
                <label htmlFor={'titleContact'}>Заголовок</label>
                <Input placeholder={'Заголовок'}
                       id={'titleContact'}
                       onChange={(e)=> setFormValue({...formValue, title: e.target.value})}
                       value={formValue.title}/>
                <label htmlFor={'urlContact'}>Ссылка</label>
                <Input placeholder={'Ссылка'}
                       id={'urlContact'}
                       onChange={(e)=> setFormValue({...formValue, url: e.target.value})}
                       value={formValue.url}/>
                <label htmlFor={'titleUrlContact'}>Название ссылки (необязательно)</label>
                <Input placeholder={'Название ссылки (необязательно)'}
                       id={'titleUrlContact'}
                       onChange={(e)=> setFormValue({...formValue, titleUrl: e.target.value})}
                       value={formValue.titleUrl}/>
            </Modal>

            <Table dataSource={dataSource}
                   columns={columns}
                   bordered
                   loading={loading}
                   rowKey="_id"
                   scroll={{ x: true }}
            />
        </AdminPanelLayout>
    )
}

export default Contacts;