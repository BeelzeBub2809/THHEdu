import './css/list.css'
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import CreateChapterComponent from './create.chapter';
import { chapterType } from '../../core/constants/type';
import { Pagination } from '../../shared/components/pagination';
import { ChapterService } from '../../core/services/chapter.service';
import { chapterTypeIcon } from '../../core/constants/type';
import EditChapterComponent from './edit.chaper';
import ViewChapterComponent from './view.chapter'

export default function ListChapterComponent(){
    const { subjectId } = useParams();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [ chapterData, setChapterData ] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [size, setSize] = useState(15);
    const [filterConditions, setFiterConditions] = useState({ searchString: ''});
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    }

    const handleCloseViewModal = () => {
        setShowViewModal(false);
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    }

    const handleSearch = (event) => {
        setFiterConditions({...filterConditions, searchString: event.target.value});
    };

    useEffect( () => {
        const fetchChapterData = async () => {
            if (subjectId) {
                let chapters = await ChapterService.getChaptersBySubject(subjectId, filterConditions);
                if(chapters){
                    setChapterData(chapters);
                } else {
                    setChapterData([])
                }
            }
        }
        fetchChapterData();
    }, [subjectId, filterConditions]);

    return(
        <div className="container-fluid">
            <div className='content'>
                <h2>All chapters</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <label className="me-2">Show by:</label>
                        <select className="form-select d-inline-block w-auto" name = "author">
                            <option value="me">Manage by me</option>
                            <option value="others">Other managers</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center">
                        <input 
                            type="text" 
                            className="form-control me-2" 
                            placeholder="Search" 
                            onBlur={(e) => handleSearch(e)}
                        />
                        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                            <FontAwesomeIcon icon={faUserPlus}/>
                        </button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                        <tbody>
                            {chapterData.length > 0 && chapterData.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>
                                        <img src = {
                                            item.type == chapterType.LECTURE ? chapterTypeIcon.lecture
                                                : item.type == chapterType.VIDEO ? chapterTypeIcon.video
                                                : chapterTypeIcon.quiz
                                        } alt=""/>
                                    </td>
                                    <td>
                                        <button className="btn btn-link p-0 me-2">
                                            <FontAwesomeIcon icon={faEye}  onClick={()=>{ setSelectedItem(item); setShowViewModal(true)}}/>
                                        </button>
                                        <button className="btn btn-link p-0 me-2">
                                            <FontAwesomeIcon icon={faEdit}  onClick={()=>{ setSelectedItem(item); setShowEditModal(true)}}/>
                                        </button>
                                        <button className="btn btn-link p-0">
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </button>
                                    </td>
                                    <td>
                                        {
                                            item.isActive ? (
                                                <span className = "badge bg-success">
                                                    Active
                                                </span>
                                            ) : ( 
                                                <span className = "badge bg-danger">
                                                    Inactive
                                                </span>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    size = {size}
                    totalPages={maxPage}
                    currentPage={page}
                    setPage={setPage}
                />
            </div>
            <CreateChapterComponent showModal={showCreateModal} handleCloseModal={handleCloseCreateModal} subjectId={subjectId}/>
            {
                showViewModal 
                    && 
                <ViewChapterComponent showModal={showViewModal} handleCloseModal={handleCloseViewModal} item = {selectedItem}/>
            }
            {
                showEditModal
                    &&
                <EditChapterComponent showModal={showEditModal} handleCloseModal={handleCloseEditModal} item = {selectedItem} subjectId = {subjectId}/>
            }
        </div>
    )
}