import AdminPanelLayout from "../../../layouts/AdminPanelLayout";
import {useEffect} from "react";
import {useRouter} from "next/router";

function AdminPanel() {
    const router = useRouter()
    useEffect(() => {
        router.push('/admin/panel/posts')
    }, [])

    return (
        <AdminPanelLayout>
            <h1>Главная</h1>
            {/*// TODO придумать заполнение главной*/}
        </AdminPanelLayout>
    )
}

export default AdminPanel;