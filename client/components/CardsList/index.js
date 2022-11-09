import styles from './index.module.scss'
import Card from "../Card";
import tstImg from "../../public/tstImg.jpg";

export default function CardsList({typeCard}) {
    const tstArr = [1,2,3,4,5,6,7,8]

    return (
        <div className={styles.cardsList}>

            {
                tstArr.map((el, index) => {
                    return (
                        <Card key={index}
                              type={typeCard}
                              title={'Ирина Подшибякина: на равных'}
                              description={'Защитница «Локомотива» и Сборной России Ирина Подшибякина о своем пути, восприятии женского футбола и лучших моментах в карьере.'}
                              imgUrl={tstImg}
                              tag={'Интервью'} path={'/'}/>
                    )
                })
            }
        </div>
    )
}