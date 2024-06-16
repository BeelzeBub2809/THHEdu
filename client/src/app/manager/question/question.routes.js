import { Routes, Route } from 'react-router-dom';
import List from "./list.jsx";
import Edit from "./edit.jsx";
import Create from "./create.jsx";
import PageNotFound from "../../error/page-not-found";
function QuestionRoutes(){
    return (
        <Routes>
            <Route path="/" element={<List/>} />
            <Route path="/list" element={<List/>} />
            <Route path="/edit" element={<Edit/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/*" element={<PageNotFound/>} />
        </Routes>
    )
}

export default QuestionRoutes;