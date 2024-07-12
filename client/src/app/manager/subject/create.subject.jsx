import React, { useState } from 'react';
import './css/create.css';
import { status } from '../../core/constants/config'
import { ValidatorsControl } from '../../core/services/validators-control';
import { Rules } from '../../core/constants/rules'

function CreateSubjectComponent({ showModal, handleCloseModal }) {
    const [subjectName, setSubjectName] = useState('');
    const [isActive, setIsActive] = useState(1);
    const [discription, setDiscription] = useState('');

    let formControl = new ValidatorsControl({
        subjectName: { value: subjectName, validators: Rules.subjectName},
        isActive: { value: isActive, validators: Rules.isActivce},
        discription: { value: discription, validators: Rules.discription}
    }) 

    const handleAddSubject = (e) => {
        let isSubmit = formControl.submitForm(e);
        if(isSubmit){
            
        }
    }

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
                                        <input type="text" className="form-control" onBlur={(e)=>setSubjectName(e.target.value)}/>
                                        <div validation="subjectName" className="error-message" style={{color:'red'}} alias="Subject name"></div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2'>Description: </label>
                                        <textarea type="text" className="form-control" style = {{height:"6em"}} onBlur={(e)=>setDiscription(e.target.value)}/>
                                        <div validation="discription" className="error-message" style={{color:'red'}} alias="Discription"></div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Status</label>
                                        <select className="form-select" value={status.ACTIVE} onBlur={(e)=>setIsActive(e.target.value)}>
                                            <option value = {status.ACTIVE} >Active</option>
                                            <option value = {status.INACTIVE} >Inactive</option>
                                        </select>
                                        <div validation="isActive" className="error-message" style={{color:'red'}} alias="Status"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Back</button>
                            <button type="button" className="btn btn-success" onClick={(e) => handleAddSubject(e)}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
      }
    </>
  );
};

export default CreateSubjectComponent;
