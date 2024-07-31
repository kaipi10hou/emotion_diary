import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./page/Home.jsx";
import Diary from "./page/Diary.jsx";
import New from "./page/New.jsx";
import NotFound from "./page/NotFound.jsx";
import Edit from "./page/Edit.jsx"
import {createContext, useReducer, useRef} from "react";

const mockData = [
    {
        id: 1,
        createdDate: new Date("2024-07-29"),
        emotionId: 1,
        content: "1번 일기 내용",
    },
    {
        id: 2,
        createdDate: new Date("2024-07-28"),
        emotionId: 2,
        content: "2번 일기 내용",
    },
    {
        id: 3,
        createdDate: new Date("2024-06-28"),
        emotionId: 3,
        content: "3번 일기 내용",
    },
]

function reducer(state, action) {
    switch (action.type) {
        case "CREATE":
           return [action.data, ...state];
        case "UPDATE":
            return state.map((item) =>{
                    console.log('reducer 업데이트 :',item.id, action.data.id)

                    return String(item.id) === String(action.data.id)
                        ? action.data
                        : item
            }
            )
        case "DELETE":
            return state.filter((item) => String(item.id) !== String(action.data))
    }
    return state;
}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()


function App() {
    const [data, dispatch] = useReducer(reducer, mockData);

    const idRef = useRef(3);


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
        console.log('업데이트 호출',id, createdDate, emotionId, content)
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
    )
}

export default App