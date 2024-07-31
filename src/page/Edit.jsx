import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header.jsx"
import Button from "../components/Button.jsx"
import {useContext} from "react";
import {DiaryDispatchContext, DiaryStateContext} from "../App.jsx";
import Editor from "../components/Editor.jsx";

const Edit = () => {
    const params = useParams()
    const nav = useNavigate();
    const data = useContext(DiaryStateContext)
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext)

    const diary = data.find((item) => String(item.id) === String(params.id));

    const onClickDelete = () => {
        onDelete(params.id)
    }

    return (
        <div>
            <Header title={`일기 수정하기`}
                    leftChild={<Button text={`< 뒤로가기`} onClick={() => nav(-1)}/>}
                    rightChild={<Button text={`삭제하기`} type={`NEGATIVE`} onClick={onClickDelete}/>}
            />
            <Editor diary={diary} onUpdate={onUpdate} />
        </div>
    );
}

export default Edit;