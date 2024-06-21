import { Routes, Route } from 'react-router-dom';
import ListQuestionComponent from "./list.question.jsx";
import EditQuestionComponent from "./edit.question.jsx";
import CreateQuestionComponent from "./create.question.jsx";
import PageNotFound from "../../error/page-not-found";
function QuestionRoutes(){
    return (
        <Routes>
            <Route path="/" element={<ListQuestionComponent/>} />
            <Route path="/list" element={<ListQuestionComponent/>} />
            <Route path="/edit" element={<EditQuestionComponent/>} />
            <Route path="/create" element={<CreateQuestionComponent/>} />
            <Route path="/*" element={<PageNotFound/>} />
        </Routes>
    )
}

export default QuestionRoutes;