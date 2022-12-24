import {Dropdown, Modal, Select, Table} from "antd";
import {useEffect, useState} from "react";
import Link from "next/link";
import {ExclamationCircleFilled, SettingOutlined} from "@ant-design/icons";
import axios from "axios";
import AdminPanelLayout from "../../../../layouts/AdminPanelLayout";
import {alert, formatRuDate} from "../../../../core/utils";
import {ToastContainer} from "react-toastify";

function AdminPanel() {
    const { confirm } = Modal
    const [dataSource, setDataSource] = useState([])
    const [category, setCategory] = useState('media')
    const [loading, setLoading] = useState(false);
    const onChange = (value) => {
        setCategory(value)
    };
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 8,
        },
    });

    const deletePost = (idPost) => {
        confirm({
            title: 'Вы действительно хотите удалить пост?',
            icon: <ExclamationCircleFilled />,
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            style: {
                top:'40%'
            },
            onOk() {
                axios.delete(category === 'media'?`/api/posts/${idPost}`:`/api/creator/posts/${idPost}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(r => {
                    setDataSource(dataSource.filter((item) => item._id !== idPost))
                    alert('Статья удалена', 'success')
                })
            },
            onCancel() {
                alert('Вы отменили удаление', 'info')
            },
        });
    };

    useEffect(() => {
        setLoading(true)
        fetch(`/api/${category === 'community' ? 'creator/posts/admin/all' : 'posts/admin/all'}?page=${tableParams.pagination.current}`)
            .then(res => res.json())
            .then(data => {
                setDataSource(data.docs.map(p => ({...p, createdAt: formatRuDate(p.createdAt)})))
                if (data.totalPages === 1) {
                    setTableParams({
                        ...tableParams, pagination: false,
                    });
                } else {
                    setTableParams({
                        ...tableParams, pagination: {
                            ...tableParams.pagination,
                            current: data.page, total: data.totalDocs,
                        },
                    });
                }
                setLoading(false)
            })
    }, [JSON.stringify(tableParams), JSON.stringify(dataSource), category])

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    const renderItems = (id) => {

        return [
            {
                key: id,
                label: (
                    <Link href={`/admin/panel/posts/edit/${id}${category === 'community' ? '?type=creator' : '?type=post'}`}>
                        Изменить статью
                    </Link>
                ),
            },
            {
                key: '2',
                danger: true,
                onClick: () => {deletePost(id)},
                label: 'Удалить статью',
            },
        ]
    }

    const columns = [
        // {
        //     title: 'Фото',
        //     dataIndex: 'imageUrl',
        //     key: 'imageUrl',
        //     render: (imageUrl) => {
        //         return <div style={{width:'100px', height:'100px'}}><img style={{width: '100%', height:'100%',objectFit:'cover'}} src={imageUrl.fullUrl} alt="#"/></div>
        //     },
        // },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: category === 'community' ? 'Креатор' : 'Категория',
            dataIndex: category === 'community' ? 'creator' : 'category',
            key: category === 'community' ? 'creator' : 'category',
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Лайки',
            dataIndex: 'likes',
            key: 'likes',
            sorter: (a, b) => a.likes - b.likes,
        },
        {
            title: 'Кол-во просмотров',
            dataIndex: 'viewsCount',
            key: 'viewsCount',
            sorter: (a, b) => a.viewsCount - b.viewsCount,
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
                    }}>Статьи</h1>
                    <Select
                        placeholder="Выберите категорию"
                        optionFilterProp="children"
                        onChange={onChange}
                        value={category}
                        options={[
                            {
                                label: 'Медиа',
                                value: 'media'
                            },
                            {
                                label: 'Комьюнити',
                                value: 'community'
                            },]}
                        style={{
                            width: '300px',
                        }}
                    />
                </div>
                <Link href={'/admin/panel/posts/create'} className={'btn'}>
                    Создать статью
                </Link>
            </div>
            <Table dataSource={dataSource}
                   columns={columns}
                   pagination={tableParams.pagination}
                   bordered
                   loading={loading}
                   onChange={handleTableChange}
                   rowKey="_id"
                   scroll={{ x: true }}
            />
        </AdminPanelLayout>
    )
}

export default AdminPanel;