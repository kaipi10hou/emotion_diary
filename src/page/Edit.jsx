import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header.jsx"
import Button from "../components/Button.jsx"
import Editor from "../components/Editor.jsx";
import {useContext} from "react";
import {DiaryDispatchContext} from "../App.jsx";
import useDiary from "../hooks/useDiary.jsx";
import usePageTitle from "../hooks/usePageTitle.jsx";

const Edit = () => {
    const params = useParams()
    const nav = useNavigate();
    const {onDelete, onUpdate} = useContext(DiaryDispatchContext)
    const curDiaryItem = useDiary(params.id)
    usePageTitle(`${params.id}번 일기 수정`)

    const onClickDelete = () => {
        if( confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')) {
            onDelete(params.id)
            nav("/", {replace: true})
        }
    }

    const onSubmit = (input) => {
        if (confirm("일기를 정말 수정할까요?")) {
            onUpdate(Number(params.id), input.createdDate.getTime(), input.emotionId, input.content);
            nav("/", {replace: true})
        }
    }



    return (
        <div>
            <Header title={`일기 수정하기`}
                    leftChild={<Button text={`< 뒤로가기`} onClick={() => nav(-1)}/>}
                    rightChild={<Button text={`삭제하기`} type={`NEGATIVE`} onClick={onClickDelete}/>}
            />
            <Editor initData={curDiaryItem} onSubmit={onSubmit}/>
        </div>
    );
}

export default Edit;