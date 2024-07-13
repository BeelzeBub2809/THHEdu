import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './css/list.css'
import { AuthService }from '../../core/services/auth.service'
import CreateSubjectComponent from './create.subject'
import EditSubjectComponent from './edit.subject'
import { SubjectService } from '../../core/services/subject.service'
import { Pagination } from '../../shared/components/pagination'
import ViewSubjectComponent from './view.subject'

  export default function ListSubjectComponent(){
    
    const [data, setData] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filterConditions, setFiterConditions] = useState({author: 'me', searchString: ''});
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [size, setSize] = useState(15);

    const user_detail = AuthService.getUserDetail() || { user_id: 1};

    const handleSearch = (event) => {
        setFiterConditions({...filterConditions, searchString: event.target.value});
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    }

    const handleCloseViewModal = () => {
        setShowViewModal(false);
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    }

    const handleSortChange = (event) => {
        const {name, value} = event.target;
        if(name === 'author'){
            setFiterConditions({...filterConditions, author: value});
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let searchConditions = {
                page: page,
                size: size,
                managerId: filterConditions.author === 'me' ? user_detail.user_id : '',
                searchString: filterConditions.searchString,
            }

            let data = await SubjectService.getAllSubjects(searchConditions);
            setData(data.subjects);
            setSize(data.pagination.size);
            setMaxPage(data.pagination.maxPage);
        }
        fetchData();
    }, [page, size, filterConditions]); 

    return (
        <div className="container-fluid">
            <div className='content'>
                <h2>All Subjects</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <label className="me-2">Show by:</label>
                        <select className="form-select d-inline-block w-auto" name = "author" onChange={handleSortChange}>
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
                            <th>Subject Code</th>
                            <th>Subject Name</th>
                            <th>Manager</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.subjectCode}</td>
                            <td>{item.subjectName}</td>
                            <td>{item.manager.fullname}</td>
                            <td>
                                <button className="btn btn-link p-0 me-2" onClick={()=>{ setSelectedItem(item); setShowViewModal(true)}}>
                                    <FontAwesomeIcon icon={faEye}/>
                                </button>
                                <button className="btn btn-link p-0 me-2" onClick={()=>{ setSelectedItem(item); setShowEditModal(true)}}>
                                    <FontAwesomeIcon icon={faEdit}/>
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
            <CreateSubjectComponent showModal={showCreateModal} handleCloseModal={handleCloseCreateModal}/>
            <ViewSubjectComponent showModal={showViewModal} handleCloseModal={handleCloseViewModal} item = {selectedItem}/>
            <EditSubjectComponent showModal={showEditModal} handleCloseModal={handleCloseEditModal} item = {selectedItem}/>
        </div>
    )
}