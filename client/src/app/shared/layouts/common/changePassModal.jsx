export default function ChangePassModal({ showModal, handleCloseModal }) {
  return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Change Password</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex" style={{ gap: '20px' }}>
                    <form className="w-100">
                      <div className="form-group mb-3">
                        <label>Old pass</label>
                        <input type="password" className="form-control"/>
                      </div>
                      <div className="form-group mb-3">
                        <label>New pass</label>
                        <input type="password" className="form-control"/>
                      </div>
                      <div className="form-group mb-3">
                        <label>Confirm new pass</label>
                        <input type="password" className="form-control"/>
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
      )}
    </>
  )
}