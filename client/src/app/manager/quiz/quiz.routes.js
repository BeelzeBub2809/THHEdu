import { Routes, Route } from 'react-router-dom';
import ListQuizComponent from "./list.quiz.jsx";
import EditQuizComponent from "./edit.quiz.jsx";
import CreateQuizComponent from "./create.quiz.jsx";
import PageNotFound from "../../error/page-not-found";
function QuizRoutes(){
    return (
        <Routes>
            <Route path="/" element={<ListQuizComponent/>} />
            <Route path="/list" element={<ListQuizComponent/>} />
            <Route path="/edit" element={<EditQuizComponent/>} />
            <Route path="/create" element={<CreateQuizComponent/>} />
            <Route path="/*" element={<PageNotFound/>} />
        </Routes>
    )
}

export default QuizRoutes;