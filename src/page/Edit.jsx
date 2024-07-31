import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header.jsx"
import Button from "../components/Button.jsx"
import Editor from "../components/Editor.jsx";

const Edit = () => {
    const params = useParams()
    const nav = useNavigate();

    return (
        <div>
            <Header title={`일기 수정하기`}
                    leftChild={<Button text={`< 뒤로가기`} onClick={() => nav(-1)}/>}
                    rightChild={<Button text={`삭제하기`} type={`NEGATIVE`} />}
            />
            <Editor />
        </div>
    );
}

export default Edit;