import './style.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap';
const mockData = [
  { id: 1, name: 'Jane Cooper', subject: 'Physic', latest_lesson: 'lesson 1'},
  { id: 2, name: 'Floyd Miles', subject: 'Physic', latest_lesson: 'lesson 2'},
  { id: 3, name: 'Ronald Richards', subject: 'Physic', latest_lesson: 'lesson 3'},
  { id: 4, name: 'Marvin McKinney', subject: 'Physic', latest_lesson: 'lesson 4'},
  { id: 5, name: 'Jerome Bell', subject: 'Physic', latest_lesson: 'lesson 5'},
  { id: 6, name: 'Kathryn Murphy', subject: 'Physic', latest_lesson: 'lesson 6'},
  { id: 7, name: 'Jacob Jones', subject: 'Physic', latest_lesson: 'lesson 7'},
  { id: 8, name: 'Kristin Watson', subject: 'Physic', latest_lesson: 'lesson 8'},
];


function TrainerListComponent() {
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

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setCurrentAction('view')
    setShowModal(true)
  }

  const handleUpdateUser = (user) => {
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
    item.role.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.includes(search) ||
    item.email.toLowerCase().includes(search.toLowerCase())
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
          <h2>Trainee List</h2>
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
              <button className="btn btn-primary" onClick={handleAddUser}>
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </div>
          </div>
          <div className="table-container">
            <table className="table table-hover table-responsive">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Subject</th>
                  <th>Lastest lesson</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.subject}</td>
                    <td>{item.latest_lesson}</td>
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
        {showModal && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Detail User</h5>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex" style={{ gap: '20px' }}>
                      <div className='d-flex' style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={imagePreview || (selectedUser?.avatar || 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg')} alt="User" className="avatar" />
                        <div className="mt-3">
                          {currentAction !== 'view' && (
                            <div className="mt-3">
                              <label className="form-label">Upload Image</label>
                              <input type="file" className="form-control" accept="image/png, image/jpeg" onChange={handleImageChange} />
                            </div>
                          )}
                        </div>
                      </div>
                      <form className="w-100">
                        <div className="form-group mb-3">
                          <label>Full name</label>
                          <input type="text" className="form-control" value={selectedUser?.name || ''} disabled={currentAction === 'view'} />
                        </div>
                        <div className="form-group mb-3">
                          <label>Email</label>
                          <input type="email" className="form-control" value={selectedUser?.email || ''} disabled={currentAction === 'view'} />
                        </div>
                        <div className="form-group mb-3">
                          <label>Phone</label>
                          <input type="text" className="form-control" value={selectedUser?.phone || ''} disabled={currentAction === 'view'} />
                        </div>
                        <div className="form-group mb-3">
                          <label>Password</label>
                          <input type="password" className="form-control" disabled={currentAction === 'view'} />
                        </div>
                        <div className="form-group mb-3">
                          <label>Status</label>
                          <select className="form-select" value={selectedUser?.status || ''} disabled={currentAction === 'view'}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label>Role</label>
                          <select className="form-select" value={selectedUser?.role || ''} disabled={currentAction === 'view'}>
                            <option value="Admin">Admin</option>
                            <option value="Trainer">Trainer</option>
                            <option value="Trainee">Trainee</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Back</button>
                    {currentAction !== 'view' && (
                      <button type="button" className="btn btn-success">{currentAction === 'add' ? 'Add' : 'Save'}</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}

export default TrainerListComponent;