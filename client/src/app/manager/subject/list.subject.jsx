import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './css/list.css'
import { AuthService }from '../../core/services/auth.service'
import { status } from '../../core/constants/config'
import CreateSubjectComponent from './create.subject'
import EditSubjectComponent from './edit.subject'

const mockData = [
    { id: 1, name: 'SWP', user_id: 1, created_by: 'Anh Tuan', email: 'jane@microsoft.com', status: 1 },
    { id: 2, name: 'FER',user_id: 2, created_by: 'Tuan Hung', email: 'floyd@yahoo.com', status: 0 },
    { id: 3, name: 'SDN', user_id: 2, created_by: 'Tuan Hung', email: 'ronald@adobe.com', status: 0 },
    { id: 4, name: 'MAD', user_id: 2,created_by: 'Tuan Hung', email: 'marvin@tesla.com', status: 1 },
    { id: 5, name: 'MAE', user_id: 1, created_by: 'Anh Tuan', email: 'jerome@google.com', status: 0 },
    { id: 6, name: 'TRS6', user_id: 1, created_by: 'Anh Tuan', email: 'kathryn@microsoft.com', status: 1 },
    { id: 7, name: 'LUK5', user_id: 2,created_by: 'Tuan Hung', email: 'jacob@yahoo.com', status: 1 },
    { id: 8, name: 'OSG', user_id: 3, created_by: 'Trong Huu', email: 'kristin@facebook.com', status: 0 },
  ];

  export default function ListSubjectComponent(){
    
    const [data, setData] = useState(mockData);
    const [search, setSearch] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filterConditions, setFiterConditions] = useState({author: 'me'});
    const user_detail = AuthService.getUserDetail() || { user_id: 1};

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
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
        let fetchedData = fetchData();
        setData(fetchedData.filter(p => filterConditions.author === 'others' || p.user_id === user_detail.user_id));
    }, [filterConditions]);

    const fetchData = () => {
        return mockData;
    }

    return (
        <div className="container-fluid">
            <div className='content'>
                <h2>All Subjects</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <label className="me-2">Show by:</label>
                        <select className="form-select d-inline-block w-auto" name = "author" onChange={handleSortChange}>
                            <option value="me">Created by me</option>
                            <option value="others">Other authors</option>
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
                    <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                        <FontAwesomeIcon icon={faUserPlus}/>
                    </button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Name subject</th>
                            <th>Created by</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.created_by}</td>
                            <td>
                                <button className="btn btn-link p-0 me-2" onClick={()=>{ setSelectedItem(item); setShowCreateModal(true)}}>
                                    <FontAwesomeIcon icon={faEye}/>
                                </button>
                                <button className="btn btn-link p-0 me-2" onClick={()=>{ setSelectedItem(item); setShowCreateModal(true)}}>
                                    <FontAwesomeIcon icon={faEdit}/>
                                </button>
                                <button className="btn btn-link p-0">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </td>
                            <td>
                                {
                                    item.status === status.ACTIVE ? (
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
            <CreateSubjectComponent showModal={showCreateModal} handleCloseModal={handleCloseCreateModal}/>
            <EditSubjectComponent showModal={showEditModal} handleCloseModal={handleCloseEditModal} item = {selectedItem}/>
        </div>
    )
}