import './userManage.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Pagination } from '../../shared/components/pagination'
import { UserService } from '../../core/services/user.service'
import Swal from 'sweetalert2'

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
  const [passwordError, setPasswordError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let searchConditions = {
          page: page,
          size: size,
          searchString: search,
          roleFilter: filterValue,
          statusFilter: filterStatus,
        }

        const data = await UserService.getAllUsers(searchConditions)
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
          setFullName(data.fullname)
          setEmail(data.email)
          setPhone(data.phone)
          setStatus(data.status)
          setRoles(data.roles)
          if (data.avatar) {
            setImagePreview(`/uploads/avatar/${data.avatar}`)
          } else {
            setImagePreview('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg')
          }
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
    setSelectedUser(null)
    setFullName('')
    setEmail('')
    setPhone('')
    setStatus('Active')
    setRoles([])
    setImagePreview('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentAction('')
    setRoles([])
    setEmailError('')
    setPhoneError('')
    setImagePreview('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg')
  }

  const handleViewUser = (user) => {
    setSelectedUserId(user._id)
    setCurrentAction('view')
    setShowModal(true)
    if(user.avatar){
      setImagePreview(`/uploads/avatar/${user.avatar}`)
    }
  }

  const handleUpdateUser = (user) => {
    setSelectedUserId(user._id)
    setFullName(user.fullname)
    setEmail(user.email)
    setPhone(user.phone)
    setStatus(user.status)
    setRoles(user.roles)
    if(user.avatar){
      setImagePreview(`/uploads/avatar/${user.avatar}`)
    }
    setCurrentAction('update')
    setShowModal(true)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      file.preview = URL.createObjectURL(file)
      setImagePreview(file.preview)
    }
    setAvatar(file)
  }

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
    setEmail(email)
  }
  
  const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9}$/
    if (!phoneRegex.test(phone)) {
      setPhoneError('Phone number must be 10 digits and start with 0')
    } else {
      setPhoneError('')
    }
    setPhone(phone)
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])\S{8,}$/
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain 8-20 characters (no spaces) and at least one number, one letter and one special character')
    } else {
      setPasswordError('')
    }
    setPassword(password)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (emailError !== '' || phoneError !=='' || (currentAction === 'add' && passwordError!=='')) {
      return;
    }
    const formData = new FormData()
    formData.append('email', email)
    if (currentAction === 'add') {
      formData.append('password', password)
    }
    formData.append('fullname', fullName)
    formData.append('phone', phone)
    if (avatar) {
      formData.append('avatar', avatar)
    }
    formData.append('status', status ? 'true' : 'false')
    roles.forEach(role => formData.append('roles', role))
    try {
      let response;
      if (currentAction === 'add') {
        console.log(status);
        response = await fetch('http://localhost:9999/admin/user/create', {
          method: 'POST',
          body:formData
        })
      } else if (currentAction === 'update') {
        response = await fetch(`http://localhost:9999/admin/user/${selectedUserId}`, {
          method: 'POST',
          body:formData
        })
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok')
      }
      handleCloseModal()
      Swal.fire({
        title: 'Success',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        window.location.reload()
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
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
                      {item.status ? 'Active' : 'Inactive'}
                    </span>
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
                      <img src={imagePreview || 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'} alt="User" className="avatar" />
                      <div className="mt-3">
                        {currentAction !== 'view' && (
                        <div className="mt-3">
                          <label className="form-label">Upload Image</label>
                          <input type="file" className="form-control" accept="image/png, image/jpeg" onChange={handleImageChange} />
                        </div>
                      )}
                      </div>
                    </div>
                    <form className="w-100" onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label>Full name</label>
                        <input type="text" className="form-control" onChange={(e) => setFullName(e.target.value)} value={fullName} disabled={currentAction === 'view'}/>
                      </div>
                      <div className="form-group mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} disabled={currentAction === 'view'} 
                        onChange={(e) => validateEmail(e.target.value)}/>
                        {emailError && <div className="text-danger">{emailError}</div>}
                      </div>
                      <div className="form-group mb-3">
                        <label>Phone</label>
                        <input type="text" className="form-control" value={phone} 
                        disabled={currentAction === 'view'} 
                        onChange={(e) => validatePhone(e.target.value)}/>
                        {phoneError && <div className="text-danger">{phoneError}</div>}
                      </div>
                      {currentAction === 'add' && (
                        <div className="form-group mb-3">
                          <label>Password</label>
                          <input type="password" className="form-control" onChange={(e) => {validatePassword(e.target.value)}}/>
                          {passwordError && <div className="text-danger">{passwordError}</div>}
                        </div>
                      )}
                      <div className="form-group mb-3">
                        <label>Status</label>
                        <select className="form-select" value={status ? 'Active' : 'Inactive'} disabled={currentAction === 'view'}
                        onChange={(e) => setStatus(e.target.value === 'Active')}>
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
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Back</button>
                          {currentAction !== 'view' && (
                            <button type="submit" className="btn btn-success" disabled={emailError !== '' || phoneError !== '' || (currentAction === 'add'&&passwordError !== '')}>{currentAction === 'add' ? 'Add' : 'Save'}</button>
                          )}
                        </div>
                    </form>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
