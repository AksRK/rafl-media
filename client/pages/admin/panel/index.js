import AdminPanelLayout from "../../../layouts/AdminPanelLayout";
import {Dropdown, Table} from "antd";
import {useEffect, useState} from "react";
import {formatRuDate} from "../../../core/utils";
import Link from "next/link";
import {SettingOutlined} from "@ant-design/icons";


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
                setTableParams({
                    ...tableParams, pagination: {
                        ...tableParams.pagination, total: data.totalDocs,
                    },
                });
                setLoading(false)
            })
    }, [JSON.stringify(tableParams)])

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
                label: 'Удалить',
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