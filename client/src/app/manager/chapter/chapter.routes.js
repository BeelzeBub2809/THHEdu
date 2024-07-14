import { Routes, Route } from 'react-router-dom';
import PageNotFound from "../../error/page-not-found";
import ListChapterComponent from './list.chapter';

function ChapterRoutes(){
    return (
        <Routes>
            <Route path="/list" element={<ListChapterComponent/>}/>
            <Route path="/*" element={<ListChapterComponent/>} />
        </Routes>
    )
}

export default ChapterRoutes;