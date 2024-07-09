import './userManage.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function UserManagement() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [currentAction, setCurrentAction] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [filterValue, setFilterValue] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [size, setSize] = useState(15)
  const [roles, setRoles] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:9999/admin/user/list?page=${page}&size=${size}&searchString=${search}&roleFilter=${filterValue}&statusFilter=${filterStatus}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setData(data.users)
        setMaxPage(data.maxPage)
        setSize(parseInt(data.size))
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers()
  }, [page, size, search, filterValue, filterStatus])
  useEffect(() => {
    if(selectedUserId){
      const fetchUserDetail = async () => {
        try {
          const response = await fetch(`http://localhost:9999/admin/user/${selectedUserId}`)
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const data = await response.json()
          setSelectedUser(data)
        } catch (err) {
          console.log(err)
        }
      }
      fetchUserDetail()
    }
  }, [selectedUserId])
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
    setRoles([])
    setEmailError('')
    setPhoneError('')
  }

  const handleViewUser = (user) => {
    setSelectedUserId(user._id)
    setCurrentAction('view')
    setShowModal(true)
  }

  const handleUpdateUser = (user) => {
    setSelectedUser(user)
    setRoles(user.roles)
    setCurrentAction('update')
    setShowModal(true)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      file.preview = URL.createObjectURL(file)
      setImagePreview(file.preview)
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
  }
  
  const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9}$/
    if (!phoneRegex.test(phone)) {
      setPhoneError('Phone number must be 10 digits and start with 0')
    } else {
      setPhoneError('')
    }
  }
  return (
    <div className="container-fluid">
      <div className='content'>
        <h2>All Users</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <label className="me-2">Filter by role:</label>
            <select className="form-select d-inline-block w-auto" onChange={(e) => setFilterValue(e.target.value)}>
              <option value="">All</option>
              <option value="trainee">Trainee</option>
              <option value="trainer">Trainer</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <label className="me-2 ms-2">Filter by status:</label>
            <select className="form-select d-inline-block w-auto" onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Banned</option>
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
                <th>Name</th>
                <th>Role</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.fullname}</td>
                  <td>{item.roles.join(', ')}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    <button className="btn btn-link p-0 me-2">
                      <FontAwesomeIcon icon={faEye} onClick={()=>handleViewUser(item)}/>
                    </button>
                    {!item.roles.includes('admin') && (
                        <button className="btn btn-link p-0 me-2">
                          <FontAwesomeIcon icon={faEdit} onClick={()=>handleUpdateUser(item)}/>
                        </button>
                    )
                    }
                  </td>
                  <td>
                    <span className={`badge ${item.status ? 'bg-success' : 'bg-danger'}`}>
                      {item.status ? 'Active' : 'Banned'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <span>Showing {size} data in a page</span>
          <Pagination
            totalPages={maxPage}
            currentPage={page}
            setPage={setPage}
          />
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
                  <div className="d-flex" style={{gap:'20px'}}>
                    <div className='d-flex' style={{width:'80%', flexDirection:'column', alignItems:'center'}}>
                      <img src={imagePreview || (selectedUser?.avatar|| 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg')} alt="User" className="avatar" />
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
                        <input type="text" className="form-control" value={selectedUser?.fullname || ''} disabled={currentAction === 'view'}/>
                      </div>
                      <div className="form-group mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" value={selectedUser?.email || ''} disabled={currentAction === 'view'} 
                        onChange={(e) => {
                          const email = e.target.value
                          validateEmail(email);
                          setSelectedUser({ ...selectedUser, email });}}/>
                        {emailError && <div className="text-danger">{emailError}</div>}
                      </div>
                      <div className="form-group mb-3">
                        <label>Phone</label>
                        <input type="text" className="form-control" value={selectedUser?.phone || ''} disabled={currentAction === 'view'} onChange={(e) => {validatePhone(e.target.value)}}/>
                        {phoneError && <div className="text-danger">{phoneError}</div>}
                      </div>
                      {currentAction === 'add' && (
                        <div className="form-group mb-3">
                          <label>Password</label>
                          <input type="password" className="form-control" />
                        </div>
                      )}
                      <div className="form-group mb-3">
                        <label>Status</label>
                        <select className="form-select" value={selectedUser?.status || ''} disabled={currentAction === 'view'}>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      {currentAction !== 'view' && (
                        <div className="form-group mb-3">
                          <label>Role</label>
                          <select 
                          multiple={true} 
                          onChange={e => {
                            const option = [...e.target.selectedOptions]
                            const values = option.map(option => option.value)
                            setRoles(values)
                          }}
                          className="form-select" value={roles}>
                            <option value="admin">Admin</option>
                            <option value="trainer">Trainer</option>
                            <option value="trainee">Trainee</option>
                            <option value="manager">Manager</option>
                          </select>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Back</button>
                  {currentAction !== 'view' && (
                    <button type="button" className="btn btn-success" disabled={emailError !== '' || phoneError !== ''}>{currentAction === 'add' ? 'Add' : 'Save'}</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const Pagination = ({ totalPages, currentPage, setPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-end">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => setPage(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}