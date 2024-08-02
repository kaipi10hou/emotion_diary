import "./Editor.css"
import EmotionItem from "./EmotionItem.jsx";
import Button from "./Button.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {emotionList} from "../util/constants.js";
import {getStringedDate} from "../util/get-stringed-date.js";

const Editor = ({onSubmit, initData}) => {
    const nav = useNavigate()
    const [input, setInput] = useState({
        createdDate : new Date(),
        emotionId: 3,
        content: "",
    })

    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                createdDate: new Date(initData.createdDate)
            })
        }

    }, [initData]);

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
        onSubmit(input);
    }

    return (
        <div className={`Editor`}>
            <section className={`date_section`}>
                <h4>오늘의 날짜</h4>
                <input name={`createdDate`} onChange={onChangeInput} value={getStringedDate(input.createdDate)}
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