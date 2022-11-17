import {Dropdown, Table} from "antd";
import {useEffect, useState} from "react";
import Link from "next/link";
import {SettingOutlined} from "@ant-design/icons";
import axios from "axios";
import AdminPanelLayout from "../../../../layouts/AdminPanelLayout";
import {alert, formatRuDate} from "../../../../core/utils";
import {ToastContainer} from "react-toastify";


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
        fetch(`/api/creator?page=${tableParams.pagination.current}`)
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
                    <Link href={`/admin/panel/creators/edit/${id}`}>
                        Изменить креатора
                    </Link>
                ),
            },
            {
                key: '2',
                danger: true,
                onClick: () => {
                    axios.delete(`/api/creator/${id}`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                        // TODO сделать алерт
                    }).then(r => {
                        setDataSource(dataSource.filter((item) => item._id !== id))
                        alert('Креатор удален', 'success')
                    })
                },
                label: 'Удалить креатора',
            },
        ]
    }

    const columns = [
        {
            title: 'ФИО',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Логин',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Вид деятельности',
            dataIndex: 'kindActivity',
            key: 'kindActivity',
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'О креаторе',
            dataIndex: 'about',
            key: 'about',
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
            <ToastContainer/>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>Креаторы</h1>
                <Link href={'/admin/panel/creators/create'} className={'btn'}>
                    Создать креатора
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