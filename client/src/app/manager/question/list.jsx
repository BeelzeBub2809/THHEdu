import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './css/list.css'

const mockData = [
    { id: 1, content: 'What is React', created_user: 'Nguyen Tuan Hung', subject_name: 'Subject Name', chapter_name: 'jane@microsoft.com', lesson_name: 'lesson1', total_question: 20, status: 'Active' },
    { id: 2, content: 'What is React', created_user: 'Nguyen Anh Tuan', subject_name: 'Subject Name', chapter_name: 'floyd@yahoo.com', lesson_name: 'lesson1', total_question: 20, status: 'Inactive' },
    { id: 3, content: 'What is React', created_user: 'Tran Trong Huu', subject_name: 'Subject Name', chapter_name: 'ronald@adobe.com', lesson_name: 'lesson1', total_question: 20, status: 'Inactive' },
    { id: 4, content: 'What is React', created_user: 'Nguyen Tuan Hung', subject_name: 'Subject Name', chapter_name: 'marvin@tesla.com', lesson_name: 'lesson1', total_question: 20, status: 'Active' },
    { id: 5, content: 'What is React', created_user: 'Nguyen Anh Tuan', subject_name: 'Subject Name', chapter_name: 'jerome@google.com',lesson_name: 'lesson1', total_question: 20, status: 'Inactive' },
    { id: 6, content: 'What is React', created_user: 'Tran Trong Huu', subject_name: 'Subject Name', chapter_name: 'kathryn@microsoft.c', lesson_name: 'lesson1', total_question: 20, status: 'Active' },
    { id: 7, content: 'What is React', created_user: 'Nguyen Anh Tuan', subject_name: 'Subject Name', chapter_name: 'jacob@yahoo.com',  lesson_name: 'lesson1', total_question: 20, status: 'Active' },
    { id: 8, content: 'What is React', created_user: 'Trainee', subject_name: 'Subject Name', chapter_name: 'kristin@facebook.co', lesson_name: 'lesson1', total_question: 20, status: 'Inactive' },
  ];

  export default function List(){
    const [data, setData] = useState(mockData);
    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.content.toLowerCase().includes(search.toLowerCase()) ||
        item.created_user.toLowerCase().includes(search.toLowerCase()) ||
        item.subject_name.includes(search) ||
        item.chapter_name.toLowerCase().includes(search.toLowerCase()) ||
        item.lesson_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <div className='content'>
                <h2>Question bank</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                    <label className="me-2">Sort by:</label>
                    <select className="form-select d-inline-block w-auto">
                        <option value="content">Question name</option>
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
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Content</th>
                            <th>Subject</th>
                            <th>Chapter</th>
                            <th>Lesson</th>
                            <th>Created user</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.content}</td>
                            <td>{item.subject_name}</td>
                            <td>{item.chapter_name}</td>
                            <td>{item.lesson_name}</td>
                            <td>{item.created_user}</td>
                            <td>
                                <button className="btn btn-link p-0 me-2">
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className="btn btn-link p-0 me-2">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="btn btn-link p-0">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                            <td>
                                <span className={`badge ${item.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
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
        </div>
    )
}