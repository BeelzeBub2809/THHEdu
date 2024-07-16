import React, { useState } from 'react';
import './css/create.css';
import { status } from '../../core/constants/config'
import { ValidatorsControl } from '../../core/services/validators-control';
import { Rules } from '../../core/constants/rules'
import { AuthService } from '../../core/services/auth.service';
import { SubjectService } from '../../core/services/subject.service';
import Swal from 'sweetalert2'

function CreateSubjectComponent({ showModal, handleCloseModal }) {
    const [subjectCode, setSubjectCode] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [isActive, setIsActive] = useState(status.ACTIVE);
    const [description, setDiscription] = useState('');
    const userId = AuthService.getUserId();

    let formControl = new ValidatorsControl({
        subjectCode: { value: subjectCode, validators: Rules.code},
        subjectName: { value: subjectName, validators: Rules.subjectName},
        isActive: { value: isActive, validators: Rules.isActivce},
        description: { value: description, validators: Rules.description}
    })

    const handleAddSubject = async (e) => {
        let isSubmit = formControl.submitForm(e);
        if(isSubmit){
            let createConditions = {
                subjectCode: subjectCode,
                subjectName: subjectName,
                description: description,
                isActive: isActive,
                manager: userId,
                price: 0,
                createBy: userId
            }
            Swal.fire({
                title: `Success request`,
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Ok',
                preConfirm: async () => {
                    await SubjectService.createSubject(createConditions)
                    .catch((error) => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
                },
            }).then(() => {
                handleCloseModal();
                window.location.reload()
            })
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
                                        <label className='mb-2' >Subject code</label>
                                        <input type="text" className="form-control" onBlur={(e)=>setSubjectCode(e.target.value)}/>
                                        <div validation="subjectCode" className="error-message" style={{color:'red'}} alias="Subject code"></div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2' >Subject name</label>
                                        <input type="text" className="form-control" onBlur={(e)=>setSubjectName(e.target.value)}/>
                                        <div validation="subjectName" className="error-message" style={{color:'red'}} alias="Subject name"></div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2'>Description: </label>
                                        <textarea type="text" className="form-control" style = {{height:"6em"}} onBlur={(e)=>setDiscription(e.target.value)}/>
                                        <div validation="description" className="error-message" style={{color:'red'}} alias="description"></div>
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
