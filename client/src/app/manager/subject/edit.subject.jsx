import React from 'react';
import './css/create.css';
import { status } from '../../core/constants/config'

function EditSubjectComponent({ showModal, handleCloseModal, item }) {
  return (
    <>
      {showModal &&
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add subject</h5>
                        </div>
                        <div className="modal-body">
                            <div className="flex-direction-column">
                                <form className="">
                                    <div className="form-group mb-3">
                                        <label className='mb-2' >Subject name</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2'>Description: </label>
                                        <textarea type="text" className="form-control" style = {{height:"6em"}}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Status</label>
                                        <select className="form-select">
                                            <option value = {status.ACTIVE} >Active</option>
                                            <option value = {status.INACTIVE} >Inactive</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Back</button>
                            <button type="button" className="btn btn-success" onClick={handleCloseModal}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
      }
    </>
  );
};

export default EditSubjectComponent;
