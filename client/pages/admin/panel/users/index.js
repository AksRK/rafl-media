import {Dropdown, Table} from "antd";
import {useEffect, useState} from "react";
import Link from "next/link";
import {SettingOutlined} from "@ant-design/icons";
import axios from "axios";
import AdminPanelLayout from "../../../../layouts/AdminPanelLayout";
import {alert, formatRuDate} from "../../../../core/utils";
import {ToastContainer} from "react-toastify";


function Users() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    useEffect(() => {
        setLoading(true)
        axios.get(
            `/api/admin/users/?page=${tableParams.pagination.current}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then(res => {
            setDataSource(res.data.docs?.map(p => ({...p, createdAt: formatRuDate(p.createdAt)})))
            if (res.data.totalPages === 1) {
                setTableParams({
                    ...tableParams, pagination: false,
                });
            } else {
                setTableParams({
                    ...tableParams, pagination: {
                        ...tableParams.pagination,
                        current: res.data.page, total: res.data.totalDocs,
                    },
                });
            }
            setLoading(false)})
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
                    <Link href={`/admin/panel/users/edit/${id}`}>
                        Изменить пользователя
                    </Link>
                ),
            },
            {
                key: '2',
                danger: true,
                onClick: () => {
                    axios.delete(`/api/admin/users/${id}`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    }).then(r => {
                        setDataSource(dataSource.filter((item) => item._id !== id))
                        alert('Пользователь удален', 'success')
                    })
                },
                label: 'Удалить пользователя',
            },
        ]
    }

    const columns = [
        {
            title: 'Полное имя',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
                    }}>Список Админинстраторов</h1>
                </div>
                <Link href={'/admin/panel/users/create'} className={'btn'}>
                    Создать пользователя
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

export default Users;