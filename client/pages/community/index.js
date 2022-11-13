import HomeLayout from "../../layouts/HomeLayout";
import MyMain from "../../components/MyMain";
import DefaultLayout from "../../layouts/DefaultLayout";
import Card from "../../components/Card";
import tstImg from "../../public/tstImg.jpg";

export default function Community({creators}) {
    console.log(creators)
    return (
        <DefaultLayout>
            <MyMain>
                <HomeLayout>
                    <div>
                        {
                            creators.docs.map(c =>
                                <Card type={'creator'}
                                      key={c._id}
                                      title={c.fullName}
                                      description={c.description}
                                      imgUrl={c.imageUrl.fullUrl}
                                      path={`/community/${c.login}`}/>
                            )
                        }
                    </div>
                </HomeLayout>
            </MyMain>
        </DefaultLayout>
    )
}

export async function getServerSideProps(context) {
    const creators = await fetch(`http://localhost:3000/api/creator/`).then(r => r.json())
    return {
        props: {creators: creators}, // will be passed to the page component as props
    }
}