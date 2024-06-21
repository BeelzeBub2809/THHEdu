import React from 'react';

function EditQuizComponent({ showModal, handleCloseModal }) {
  return (
    <>
      {showModal &&
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">General</h5>
                  <h5 className="modal-title">Question</h5>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Quiz name</label>
                        <input
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Type quiz</label>
                        <input
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Chapter</label>
                        <input
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </form>
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

export default EditQuizComponent;
