import "./Editor.css"
import EmotionItem from "./EmotionItem.jsx";
import Button from "./Button.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const emotionList = [
    {
        emotionId: 1,
        emotionName: "완전 좋음",
    },
    {
        emotionId: 2,
        emotionName: "좋음",
    },
    {
        emotionId: 3,
        emotionName: "보통",
    },
    {
        emotionId: 4,
        emotionName: "나쁨",
    },
    {
        emotionId: 5,
        emotionName: "끔찍함",
    },
]

const getStatringedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    if (month < 10) {
        month = `0${month}`
    }

    if (date < 1) {
        date = `0{date}`
    }

    return `${year}-${month}-${date}`
}
const Editor = ({diary, onUpdate, onSubmit}) => {
    const nav = useNavigate()
    const [input, setInput] = useState({
        createdDate : new Date(diary.createdDate) || new Date(),
        emotionId: diary.emotionId || 3,
        content: diary.content || "",
    })

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'createdDate') {
            value = new Date(value);
        }

        setInput({
            ...input,
            [e.target.name]: value,
        });
    }

    const onSubmitClick = () => {
        if (onUpdate) {
            onUpdate(diary.id, input.createdDate, input.emotionId, input.content)
            nav(-1)
        }

        if (onSubmit) {
            onSubmit(input)
        }
    }

    return (
        <div className={`Editor`}>
            <section className={`date_section`}>
                <h4>오늘의 날짜</h4>
                <input name={`createdDate`} onChange={onChangeInput} value={getStatringedDate(input.createdDate)}
                       type="date"/>
            </section>
            <section className={`emotion_section`}>
                <h4>오늘의 감정</h4>
                <div className={`editor_list_wrapper`}>
                    {emotionList.map((item) =>
                        <EmotionItem onClick={() => onChangeInput({
                            target: {
                                name: "emotionId",
                                value: item.emotionId
                            }
                        })} key={item.emotionId} {...item} isSelected={input.emotionId === item.emotionId}/>)
                    }
                </div>
            </section>
            <section className={`content_section`}>
                <h4>오늘의 일기</h4>
                <textarea value={input.content} name={`content`} onChange={onChangeInput} placeholder={`오늘은 어땠나요?`}></textarea>
            </section>
            <section className={`button_section`}>
                <Button text={`취소하기`} onClick={()=>{nav(-1)}}/>
                <Button text={`작성완료`} type={`POSITIVE`} onClick={onSubmitClick}/>
            </section>
        </div>
    );
}

export default Editor