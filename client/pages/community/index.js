import HomeLayout from "../../layouts/HomeLayout";
import MyMain from "../../components/MyMain";
import DefaultLayout from "../../layouts/DefaultLayout";
import Card from "../../components/Card";
import tstImg from "../../public/tstImg.jpg";

export default function Community() {

    return (
        <DefaultLayout>
            <MyMain>
                <HomeLayout>
                    <div>
                        <Card type={'creator'}
                              title={'Игорь Селенов'}
                              description={'Основатель rafl.media, коллекционер фубольных джерси.'}
                              imgUrl={tstImg}
                              path={'community/selenov-igor'}/>
                        <Card type={'creator'}
                              title={'Игорь Селенов'}
                              description={'Основатель rafl.media, коллекционер фубольных джерси.'}
                              imgUrl={tstImg}
                              path={'community/selenov-igor'}/>
                        <Card type={'creator'}
                              title={'Игорь Селенов'}
                              description={'Основатель rafl.media, коллекционер фубольных джерси.'}
                              imgUrl={tstImg}
                              path={'community/selenov-igor'}/>
                        <Card type={'creator'}
                              title={'Игорь Селенов'}
                              description={'Основатель rafl.media, коллекционер фубольных джерси.'}
                              imgUrl={tstImg}
                              path={'community/selenov-igor'}/>
                    </div>
                </HomeLayout>
            </MyMain>
        </DefaultLayout>
    )
}