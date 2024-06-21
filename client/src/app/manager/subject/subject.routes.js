import { Routes, Route } from 'react-router-dom';
import ListSubjectComponent from "./list.subject";
import EditSubjectComponent from "./edit.subject";
import CreateSubjectComponent from "./create.subject";
import PageNotFound from "../../error/page-not-found";
function SubjectRoutes(){
    return (
        <Routes>
            <Route path="/" element={<ListSubjectComponent/>} />
            <Route path="/list" element={<ListSubjectComponent/>} />
            <Route path="/edit" element={<EditSubjectComponent/>} />
            <Route path="/create" element={<CreateSubjectComponent />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    )
}

export default SubjectRoutes;