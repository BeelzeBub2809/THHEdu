import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './css/list.css'
import  CreateQuizComponent from './create.quiz'
import  EditQuizComponent from './edit.quiz'
import { status } from '../../core/constants/config'
import { SubjectService } from '../../core/services/subject.service';
import { QuizService } from '../../core/services/quiz.service'

export default function ListQuizComponent(){
    const [search, setSearch] = useState('');
    const [showCreateModal, setshowCreateModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [filterConditions, setFilterConditions] = useState({searchString: ''});
    const [quizzes, setQuizzes] = useState([]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleCloseCreateModal = () => {
        setshowCreateModal(false)
    }
    const handleCloseEditModal = () => {
        setshowEditModal(false)
    }

    useEffect(() => {
        async function fetchSubjects() {
            let searchCondition = { isActive: true };
            const subjectData = await SubjectService.getAllSubjects(searchCondition);
            if (Array.isArray(subjectData.subjects)) {
                setSubjects(subjectData.subjects);
                if (subjectData.subjects.length > 0) {
                    setSelectedSubject(subjectData.subjects[0]._id);
                }
            } else {
                setSubjects([]);
            }
        }
        fetchSubjects();
    }, []);

    useEffect(() => {
        async function fetchQuizzes() {
            if (selectedSubject !== '') {
                let searchCondition = {
                    searchString: filterConditions.searchString,
                };
                const listQuestions = await QuizService.getQuizBySubject(selectedSubject, searchCondition);
                setQuizzes(listQuestions);
            } else {
                setQuizzes([]);
            }
        }
    
        if (subjects.length > 0) {
            fetchQuizzes();
        }
    }, [subjects, selectedSubject, filterConditions]);  

    // const filteredData = data.filter(item =>
    //     item.quiz_name.toLowerCase().includes(search.toLowerCase()) ||
    //     item.created_user.toLowerCase().includes(search.toLowerCase()) ||
    //     item.subject_name.includes(search) ||
    //     item.chapter_name.toLowerCase().includes(search.toLowerCase()) ||
    //     item.lesson_name.toLowerCase().includes(search.toLowerCase())
    // );

    return (
        <div className="container-fluid">
            <div className='content'>
                <h2>All Quizzes</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                    <label className="me-2">Select subject:</label>
                        <select className="form-select d-inline-block w-auto" name='subjectId' value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                            {
                                subjects.map(subject => (
                                    <option key={subject._id} value={subject._id}>
                                        {subject.subjectCode} - {subject.subjectName}
                                    </option>
                                ))
                            }
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
                            <th>Quiz name</th>
                            <th>Duration</th>
                            <th>Subject</th>
                            <th>Chapter</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.map((item) => (
                        <tr key={item._id}>
                            <td>{item.quizName}</td>
                            <td>{item.duration}</td>
                            <td>{item.subjectId.subjectCode}</td>
                            <td>{item.chapterId ? item.chapterId.title : ''}</td>
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
                                {
                                    item.isActive === status.ACTIVE ? (
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
            </div>
            <CreateQuizComponent showModal={showCreateModal} handleCloseModal={handleCloseCreateModal}/>
            <EditQuizComponent showModal={showEditModal} handleCloseModal={handleCloseEditModal}/>
        </div>
    )
}