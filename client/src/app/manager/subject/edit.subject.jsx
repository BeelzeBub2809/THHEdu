import React, { useState, useEffect } from 'react';
import './css/create.css';
import { status } from '../../core/constants/config';
import { ValidatorsControl } from '../../core/services/validators-control';
import { Rules } from '../../core/constants/rules';
import { AuthService } from '../../core/services/auth.service';
import { SubjectService } from '../../core/services/subject.service';
import Swal from 'sweetalert2';

function EditSubjectComponent({ showModal, handleCloseModal, item }) {
    const [selectedItem, setSelectedItem] = useState({
        subjectCode: '',
        subjectName: '',
        description: '',
        price: 0,
        isActive: '',
    });
    const [isFree, setIsFree] = useState(false);
    const user_detail = AuthService.getUserDetail() || { user_id: '1'};

    useEffect(() => {
        if (item) {
        setSelectedItem(item);
        setIsFree(item.price === 0);
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem((prevItem) => ({
        ...prevItem,
        [name]: value,
        }));
    };

    let formControl = new ValidatorsControl({
        subjectCode: { value: selectedItem.subjectCode, validators: Rules.code},
        subjectName: { value: selectedItem.subjectName, validators: Rules.subjectName},
        isActive: { value: selectedItem.isActive, validators: Rules.isActivce},
        description: { value: selectedItem.description, validators: Rules.description}, 
        price: {value: selectedItem.price, validators: isFree ? Rules.noValidate : Rules.price}
    })

    const handleSaveSubject = async (e) => {
        let isSubmit = formControl.submitForm(e);
        if(isSubmit){
            let updateConditions = {
                _id: item._id,
                subjectCode: selectedItem.subjectCode,
                subjectName: selectedItem.subjectName,
                description: selectedItem.description,
                isActive: selectedItem.isActive,
                manager: user_detail.user_id,
                price: isFree ? 0 : selectedItem.price,
                createBy: user_detail.user_id
            }
            Swal.fire({
                title: `Success request`,
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Ok',
                preConfirm: async () => {
                    await SubjectService.updateSubject(updateConditions)
                    .catch((error) => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
                }}).then(() => {
                    handleCloseModal();
                    window.location.reload()
                })
            }
    }

    return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit subject</h5>
                    </div>
                    <div className="modal-body">
                        <div className="flex-direction-column">
                            <form className="">
                                <div className="form-group mb-3">
                                    <label className="mb-2">Subject code</label>
                                    <input type="text" className="form-control" name="subjectCode" value={selectedItem.subjectCode} onChange={handleChange}/>
                                    <div validation="subjectCode" className="error-message" style={{color:'red'}} alias="Subject code"></div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="mb-2">Subject name</label>
                                    <input type="text" className="form-control" name="subjectName" value={selectedItem.subjectName} onChange={handleChange}/>
                                    <div validation="subjectName" className="error-message" style={{color:'red'}} alias="Subject name"></div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="mb-2">Description</label>
                                    <textarea type="text" className="form-control" name="description" style={{ height: '6em' }} value={selectedItem.description} onChange={handleChange} />
                                    <div validation="description" className="error-message" style={{color:'red'}} alias="description"></div>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status</label>
                                    <select className="form-select" name="isFree" value={isFree} onChange={(e) => setIsFree(e.target.value)}>
                                        <option value={true}>Free</option>
                                        <option value={false}>Paid</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3" >
                                    <label>Price</label>
                                    <input type="number" className="form-control" name="price" value={selectedItem.price} onChange={handleChange}/>
                                    <div validation="price" className="error-message" style={{color:'red'}} alias="Price"></div>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status</label>
                                    <select className="form-select" name="isActive" value={selectedItem.isActive} onChange={handleChange}>
                                        <option value={status.ACTIVE}>Active</option>
                                        <option value={status.INACTIVE}>Inactive</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Back</button>
                        <button type="button" className="btn btn-success" onClick={handleSaveSubject}>Save </button>
                    </div>
                </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EditSubjectComponent;