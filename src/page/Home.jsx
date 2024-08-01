import Header from '../components/Header.jsx'
import Button from "../components/Button.jsx";
import DiaryList from "../components/DiaryList.jsx";
import {useContext, useState} from "react";
import {DiaryStateContext} from "../App.jsx";

const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();
    return data.filter(
        (item) =>
        {
            console.log(`beginTime : ${beginTime} ===> ${new Date(beginTime)}`)
            console.log(`item.createdDate ${item.createdDate} ====> ${new Date(item.createDate)}`)
            console.log(`beginTime <= item.createdDate ${beginTime <= item.createdDate}`)
            return beginTime <= item.createdDate
            && item.createdDate <= endTime
        }
    );
}

const Home = () => {
    const data = useContext(DiaryStateContext)

    const [pivotDate, setPivotDate] = useState(new Date());
    const year = pivotDate.getFullYear();  // 연도 추출
    const month = pivotDate.getMonth();  // 월 추출 (0부터 11까지 반환하므로 1을 더해줌)
    const formattedDate = `${year}년 ${month + 1}월`;

    const monthlyData = getMonthlyData(pivotDate, data)

    const onIncreaseMonth = () => {
        setPivotDate(new Date(year, month + 1));
    }

    const onDecreaseMoth = () => {
        setPivotDate(new Date(year, month - 1));

    }
    return (
        <div>
            <Header
                title={formattedDate}
                leftChild={<Button text={"<"} onClick={onDecreaseMoth} />}
                rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
            />
            <DiaryList data={monthlyData}/>
        </div>
    )
}

export default Home