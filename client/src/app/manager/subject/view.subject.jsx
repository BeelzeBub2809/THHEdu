import React from 'react';
import './css/create.css';
import { status } from '../../core/constants/config'

function ViewSubjectComponent({ showModal, handleCloseModal, item }) {
    
    return (
    <>
      {showModal &&
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View subject</h5>
                        </div>
                        <div className="modal-body">
                            <div className="flex-direction-column">
                                <form className="">
                                    <div className="form-group mb-3">
                                        <label className='mb-2' >Subject code</label>
                                        <input type="text" className="form-control" disabled value={item.subjectCode}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2' >Subject name</label>
                                        <input type="text" className="form-control" disabled value={item.subjectName}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2'>Description: </label>
                                        <textarea type="text" className="form-control" style = {{height:"6em"}} disabled value={item.description}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Status</label>
                                        <select className="form-select" disabled value={item.isActive}>
                                            <option value = {status.ACTIVE} >Active</option>
                                            <option value = {status.INACTIVE} >Inactive</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2'>Manage by: </label>
                                        <input type="text" className="form-control" disabled value={item.manager.fullname}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2'>Create by: </label>
                                        <input type="text" className="form-control" disabled value={item.createBy.fullname}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
      }
    </>
  );
};

export default ViewSubjectComponent;
