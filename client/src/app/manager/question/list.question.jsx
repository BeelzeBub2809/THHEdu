import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './css/list.css'
import CreateQuestionComponent from './create.question';
import EditQuestionComponent from './edit.question';
import { status } from '../../core/constants/config'
import { QuestionService } from '../../core/services/question.service';
import { SubjectService } from '../../core/services/subject.service';

  export default function ListQuestionComponent(){
    const [subjects, setSubjects] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState('');
    const [filterConditions, setFilterConditions] = useState({searchString: ''});
    const [showCreateModal, setshowCreateModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');

    const handleSearch = (event) => {
        const { name, value } = event.target;
        setFilterConditions( ...filterConditions, filterConditions[name] = value );
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
        async function fetchQuestions() {
            if (selectedSubject !== '') {
                let searchCondition = {
                    searchString: filterConditions.searchString,
                };
                const listQuestions = await QuestionService.getQuestionsBySubject(selectedSubject, searchCondition);
                setQuestions(listQuestions);
            } else {
                setQuestions([]);
            }
        }
    
        if (subjects.length > 0) {
            fetchQuestions();
        }
    }, [subjects, selectedSubject, filterConditions]);

    // const filteredData = data.filter(item =>
    //     item.content.toLowerCase().includes(search.toLowerCase()) ||
    //     item.created_user.toLowerCase().includes(search.toLowerCase()) ||
    //     item.subject_name.includes(search) ||
    //     item.chapter_name.toLowerCase().includes(search.toLowerCase()) ||
    //     item.lesson_name.toLowerCase().includes(search.toLowerCase())
    // );

    return (
        <div className="container-fluid">
            <div className='content'>
                <h2>Question bank</h2>
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
                        name='searchString'
                        className="form-control me-2"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => handleSearch(e)}
                    />
                    <button className="btn btn-primary" onClick={() => setshowCreateModal(true)}>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Question name</th>
                            <th>Type</th>
                            <th>Subject</th>
                            <th>Chapter</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((item) => (
                            <tr key={item._id}>
                                <td>{item.questionName}</td>
                                <td>{item.type}</td>
                                <td>{item.subjectId.subjectName}</td>
                                <td>{item.chapterId ?  item.chapterId.title : ''}</td>
                                <td>
                                    <button className="btn btn-link p-0 me-2">
                                        <FontAwesomeIcon icon={faEye} onClick={() => setshowEditModal(true)} />
                                    </button>
                                    <button className="btn btn-link p-0 me-2" onClick={() => setshowEditModal(true)}>
                                        <FontAwesomeIcon icon={faEdit} />
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
            <CreateQuestionComponent showModal={showCreateModal} handleCloseModal={handleCloseCreateModal}/>
            <EditQuestionComponent showModal={showEditModal} handleCloseModal={handleCloseEditModal}/>
        </div>
    )
}