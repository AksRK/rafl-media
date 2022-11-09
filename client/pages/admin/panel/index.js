import AdminPanelLayout from "../../../layouts/AdminPanelLayout";
import {Dropdown, Table} from "antd";
import {useEffect, useState} from "react";
import {formatRuDate} from "../../../core/utils";
import Link from "next/link";
import {SettingOutlined} from "@ant-design/icons";
import axios from "axios";


function AdminPanel() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 8,
        },
    });

    useEffect(() => {
        setLoading(true)
        fetch(`/api/posts?page=${tableParams.pagination.current}`)
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
    }, [JSON.stringify(tableParams), JSON.stringify(dataSource)])

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
                    <Link href={`/admin/panel/edit-post/${id}`}>
                        Изменить статью
                    </Link>
                ),
            },
            {
                key: '2',
                danger: true,
                label: (
                    <div onClick={() => {
                        axios.delete(`/api/posts/${id}`).then(r => {
                            setDataSource(dataSource.filter((item) => item._id !== id))
                        })
                    }}>
                        Удалить статью
                    </div>
                ),
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
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
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
            <h1>Главная</h1>
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