import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './css/list.css'

const mockData = [
    { id: 1, name: 'Jane Cooper', role: 'Nguyen Tuan Hung', phone: '(225) 555-0118', email: 'jane@microsoft.com', status: 'Active' },
    { id: 2, name: 'Floyd Miles', role: 'Nguyen Anh Tuan', phone: '(205) 555-0100', email: 'floyd@yahoo.com', status: 'Inactive' },
    { id: 3, name: 'Ronald Richards', role: 'Tran Trong Huu', phone: '(302) 555-0107', email: 'ronald@adobe.com', status: 'Inactive' },
    { id: 4, name: 'Marvin McKinney', role: 'Nguyen Tuan Hung', phone: '(252) 555-0126', email: 'marvin@tesla.com', status: 'Active' },
    { id: 5, name: 'Jerome Bell', role: 'Nguyen Anh Tuan', phone: '(629) 555-0129', email: 'jerome@google.com', status: 'Inactive' },
    { id: 6, name: 'Kathryn Murphy', role: 'Tran Trong Huu', phone: '(406) 555-0120', email: 'kathryn@microsoft.com', status: 'Active' },
    { id: 7, name: 'Jacob Jones', role: 'Nguyen Anh Tuan', phone: '(208) 555-0112', email: 'jacob@yahoo.com', status: 'Active' },
    { id: 8, name: 'Kristin Watson', role: 'Trainee', phone: '(704) 555-0127', email: 'kristin@facebook.com', status: 'Inactive' },
  ];

  export default function List(){
    const [data, setData] = useState(mockData);
    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <div className='content'>
                <h2>All Subjects</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                    <label className="me-2">Sort by:</label>
                    <select className="form-select d-inline-block w-auto">
                        <option value="name">Name</option>
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
                            <th>Subject</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.role}</td>
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