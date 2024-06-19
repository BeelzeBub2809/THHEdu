import React from 'react';
import './css/create.css';
import { status } from '../../core/constants/config'

function CreateQuestionComponent({ showModal, handleCloseModal }) {
  return (
    <>
      {showModal &&
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add question</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex" style={{ gap: '20px' }}>
                    <form className="w-100">
                      <div className="form-group">
                        <label>Subject</label>
                        <select>
                          <option value="">Select Subject</option>
                          {/* Add options here */}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Lesson</label>
                        <select>
                          <option value="">Select Lesson</option>
                          {/* Add options here */}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Chapter</label>
                        <select>
                          <option value="">Select Chapter</option>
                          {/* Add options here */}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Question name</label>
                        <input type="text" />
                      </div>
                      <div className="form-group">
                        <label>Description questions</label>
                        <input type="number" />
                      </div>
                      <div className="form-group">
                        <label>Duration</label>
                        <input type="number" />
                      </div>
                      <div>
                        <div className="form-group">
                          <label>Status</label>
                          <div>
                            <label htmlFor="active">
                              <input type="radio" id="active" name="status" value = {status.ACTIVE} style={{ width: 'auto' }} />
                              Active
                            </label>
                            <label htmlFor="inactive">
                              <input type="radio" id="inactive" name="status" value= {status.INACTIVE} style={{ width: 'auto' }} />
                              Inactive
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                        </div>
                        <label>Type</label>
                        <div>
                          <label htmlFor="random">
                            <input type="radio" id="random" name="type" value="random" style={{ width: 'auto' }} />
                            Random question
                          </label>
                          <br />
                          <label htmlFor="fixed">
                            <input type="radio" id="fixed" name="type" value="fixed" style={{ width: 'auto' }} />
                            Fixed question
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                  <button type="button" className="btn btn-success">Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default CreateQuestionComponent;
