import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './css/list.css'
import  CreateQuizComponent from './create'
import  EditQuizComponent from './edit'
import { status } from '../../core/constants/config'

const mockData = [
    { id: 1, quiz_name: 'Jane Cooper', created_user: 'Nguyen Tuan Hung', subject_name: 'Subject Name', chapter_name: 'jane@microsoft.com', lesson_name: 'lesson1', total_question: 20, status: 1 },
    { id: 2, quiz_name: 'Floyd Miles', created_user: 'Nguyen Anh Tuan', subject_name: 'Subject Name', chapter_name: 'floyd@yahoo.com', lesson_name: 'lesson1', total_question: 20, status: 0 },
    { id: 3, quiz_name: 'Ronald Richards', created_user: 'Tran Trong Huu', subject_name: 'Subject Name', chapter_name: 'ronald@adobe.com', lesson_name: 'lesson1', total_question: 20, status: 0 },
    { id: 4, quiz_name: 'Marvin McKinney', created_user: 'Nguyen Tuan Hung', subject_name: 'Subject Name', chapter_name: 'marvin@tesla.com', lesson_name: 'lesson1', total_question: 20, status: 1 },
    { id: 5, quiz_name: 'Jerome Bell', created_user: 'Nguyen Anh Tuan', subject_name: 'Subject Name', chapter_name: 'jerome@google.com',lesson_name: 'lesson1', total_question: 20, status: 0 },
    { id: 6, quiz_name: 'Kathryn Murphy', created_user: 'Tran Trong Huu', subject_name: 'Subject Name', chapter_name: 'kathryn@microsoft.c', lesson_name: 'lesson1', total_question: 20, status: 1 },
    { id: 7, quiz_name: 'Jacob Jones', created_user: 'Nguyen Anh Tuan', subject_name: 'Subject Name', chapter_name: 'jacob@yahoo.com',  lesson_name: 'lesson1', total_question: 20, status: 1 },
    { id: 8, quiz_name: 'Kristin Watson', created_user: 'Trainee', subject_name: 'Subject Name', chapter_name: 'kristin@facebook.co', lesson_name: 'lesson1', total_question: 20, status: 0 },
  ];

  export default function List(){
    const [data, setData] = useState(mockData);
    const [search, setSearch] = useState('');
    const [showCreateModal, setshowCreateModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleCloseCreateModal = () => {
        setshowCreateModal(false)
    }
    const handleCloseEditModal = () => {
        setshowEditModal(false)
    }

    const filteredData = data.filter(item =>
        item.quiz_name.toLowerCase().includes(search.toLowerCase()) ||
        item.created_user.toLowerCase().includes(search.toLowerCase()) ||
        item.subject_name.includes(search) ||
        item.chapter_name.toLowerCase().includes(search.toLowerCase()) ||
        item.lesson_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <div className='content'>
                <h2>All Quizzes</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                    <label className="me-2">Sort by:</label>
                    <select className="form-select d-inline-block w-auto">
                        <option value="quiz_name">Quiz name</option>
                        <option value="status">Status</option>
                    </select>
                    </div>
                    <div className="d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />
                    <button className="btn btn-primary" onClick = {() => setshowCreateModal(true)}>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Quiz</th>
                            <th>Subject</th>
                            <th>Chapter</th>
                            <th>Lesson</th>
                            <th>Created user</th>
                            <th>Total questions</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.quiz_name}</td>
                            <td>{item.subject_name}</td>
                            <td>{item.chapter_name}</td>
                            <td>{item.lesson_name}</td>
                            <td>{item.created_user}</td>
                            <td>{item.total_question}</td>
                            <td>
                                <button className="btn btn-link p-0 me-2">
                                    <FontAwesomeIcon icon={faEye} onClick={() => setshowEditModal(true)}/>
                                </button>
                                <button className="btn btn-link p-0 me-2">
                                    <FontAwesomeIcon icon={faEdit} onClick={() => setshowEditModal(true)}/>
                                </button>
                                <button className="btn btn-link p-0">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                            <td>
                                <span className={`badge ${item.status === status.ACTIVE ? 'bg-success' : 'bg-danger'}`}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <div className="pagination-container">
                    <span>Showing data 1 to 8 of 256K entries</span>
                    <nav>
                    <ul className="pagination justify-content-end">
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">...</a></li>
                        <li className="page-item"><a className="page-link" href="#">40</a></li>
                    </ul>
                    </nav>
                </div>
            </div>
            <CreateQuizComponent showModal={showCreateModal} handleCloseModal={handleCloseCreateModal}/>
            <EditQuizComponent showModal={showEditModal} handleCloseModal={handleCloseEditModal}/>
        </div>
    )
}