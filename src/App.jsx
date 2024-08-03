import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./page/Home.jsx";
import Diary from "./page/Diary.jsx";
import New from "./page/New.jsx";
import NotFound from "./page/NotFound.jsx";
import Edit from "./page/Edit.jsx"
import {createContext, useEffect, useReducer, useRef, useState} from "react";

const DIARY_LIST = "diaryList"

/*const mockData = [
    {
        id: 1,
        createdDate: new Date("2024-07-11").getTime(),
        emotionId: 1,
        content: "1번 일기 내용",
    },
    {
        id: 2,
        createdDate: new Date("2024-08-01").getTime(),
        emotionId: 2,
        content: "2번 일기 내용",
    },
    {
        id: 3,
        createdDate: new Date("2024-07-28").getTime(),
        emotionId: 3,
        content: "3번 일기 내용",
    },
]*/

function reducer(state, action) {
    let nextState
    switch (action.type) {
        case "INIT": return action.data
        case "CREATE": {
            nextState = [action.data, ...state];
            break
        }
        case "UPDATE": {
            nextState = state.map((item) =>
                String(item.id) === String(action.data.id)
                    ? action.data
                    : item
            )
            break
        }
        case "DELETE": {
            nextState = state.filter((item) => String(item.id) !== String(action.data))
            break
        }
        default:
            return state
    }
    localStorage.setItem(DIARY_LIST, JSON.stringify(nextState))
    return nextState
}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()


function App() {
    const [data, dispatch] = useReducer(reducer, []);
    const [isLoading, setIsLoading] = useState(true)

    const idRef = useRef(1);

    useEffect(() => {
        const dataString = localStorage.getItem(DIARY_LIST)

        let dataJson
        try {
            dataJson = JSON.parse(dataString)
        } catch (e) {
            setIsLoading(false)
            return
        }

        if (!Array.isArray(dataJson)) {
            setIsLoading(false)
            return;
        }

        let maxId = 0;
        dataJson.forEach((item) => {
            if (Number(item.id) > maxId) {
                maxId = Number(item.id)
            }
        })
        idRef.current = maxId + 1
        dispatch({
            "type": "INIT",
            "data": dataJson,
        });

        setIsLoading(false)
    }, []);


    const onCreate = (createdDate, emotionId, content) => {
        dispatch({
            "type": "CREATE",
            "data": {
                id: idRef.current++,
                createdDate,
                emotionId,
                content,
            }
        })
    }

    const onUpdate = (id, createdDate, emotionId, content) => {
        dispatch({
            "type": "UPDATE",
            "data": {
                id: id,
                createdDate: createdDate,
                emotionId: emotionId,
                content: content,
            }
        })
    }

    const onDelete = (id) => {
        dispatch({
            "type": "DELETE",
            "data": id,
        })
    }

    if (isLoading) {
        return <div>데이터 로딩중입니다...</div>
    }

    return (
        <>
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/new'} element={<New/>}/>
                        <Route path={'/diary/:id'} element={<Diary/>}/>
                        <Route path={'/edit/:id'} element={<Edit onCreate={onCreate}/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        </>
    );
}

export default App
