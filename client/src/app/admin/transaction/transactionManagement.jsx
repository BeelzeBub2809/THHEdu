import { useEffect, useState } from "react"
import '../user/userManage.css'
export default function TransactionManagement() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch('http://localhost:9999/admin/transaction/list', {
          method: 'GET',
          credentials: 'include'
        })
        
        // Check if the response is OK before parsing JSON
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTransaction()
  }, [])
  return (
    <div className="container-fluid">
      <div className='content'>
        <h2>All Transaction</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
        </div>
        <div className="table-container">
          <table className="table table-hover table-responsive">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Amount</th>
                <th>Order Type</th>
                <th>Partner Code</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.orderId}</td>
                  <td>{item.amount}</td>
                  <td>{item.orderType}</td>
                  <td>{item.partnerCode}</td>
                  <td>
                    <span className={`badge ${item.resultCode == 0 ? 'bg-success' : 'bg-danger'}`}>
                      {item.message}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}