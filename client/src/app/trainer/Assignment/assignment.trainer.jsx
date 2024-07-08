import './style.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const mockData = [
  { id: 1, name: 'Jane Cooper', subject: 'Physic', startDate: '12/4/2024',status: 'Active'},
  { id: 2, name: 'Floyd Miles', subject: 'Physic', startDate: '12/4/2024',status: 'Active'},
  { id: 3, name: 'Ronald Richards', subject: 'Physic', startDate: '12/4/2024',status: 'End'},
  { id: 4, name: 'Marvin McKinney', subject: 'Physic', startDate: '12/4/2024',status: 'End'},
  { id: 5, name: 'Jerome Bell', subject: 'Physic', startDate: '12/4/2024',status: 'Active'},
  { id: 6, name: 'Kathryn Murphy', subject: 'Physic', startDate: '12/4/2024',status: 'Active'},
  { id: 7, name: 'Jacob Jones', subject: 'Physic', startDate: '12/4/2024',status: 'Active'},
  { id: 8, name: 'Kristin Watson', subject: 'Physic', startDate: '12/4/2024',status: 'Active'},
];


function TrainerAssignment() {
  const [data, setData] = useState(mockData)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [currentAction, setCurrentAction] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [sortCriteria, setSortCriteria] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  useEffect(()=>{
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview)
    }
  },[imagePreview])
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleAddUser = () => {
    setCurrentAction('add')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentAction('')
    setSelectedUser(null)
    setImagePreview('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg')
  }

  const handleEditAssignment = (user) => {
    setSelectedUser(user)
    setCurrentAction('view')
    setShowModal(true)
  }

  const handleGradeAssignment = (user) => {
    setSelectedUser(user)
    setCurrentAction('update')
    setShowModal(true)
  }

  const handleSortChange = (event) => {
    const value = event.target.value
    const [criteria, direction] = value.split('-')
    setSortCriteria(criteria)
    setSortDirection(direction)
  }

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.subject.toLowerCase().includes(search.toLowerCase())
  ).sort((a,b)=>{
    if (a[sortCriteria] < b[sortCriteria]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortCriteria] > b[sortCriteria]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      file.preview = URL.createObjectURL(file)
      setImagePreview(file.preview)
    }
  }
  return (
    <Container>
      <div className="container-fluid">
        <div className='content'>
          <h2>
            All Assignment
          </h2>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <label className="me-2">Sort by:</label>
              <select className="form-select d-inline-block w-auto" onChange={handleSortChange}>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
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
              <button className="btn btn-warning w-50" onClick={handleAddUser}>
                Add new
              </button>
            </div>
          </div>
          <div className="table-container">
            <table className="table table-hover table-responsive">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.subject}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>
                        <Link className="btn btn-warning me-2" onClick={() => handleEditAssignment(item)}>
                            Edit
                        </Link>
                        <Link className='btn btn-success' to={"/trainer/studentAssignment"}>
                            Grade
                        </Link>
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
    </Container>
  )
}

export default TrainerAssignment;