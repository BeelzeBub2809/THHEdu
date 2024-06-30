import './css/dashboard.manager.css'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const data = [
  { label: 'January', sales: 21, leads: 41 },
  { label: 'February', sales: 35, leads: 79 },
  { label: 'March', sales: 75, leads: 57 },
  { label: 'April', sales: 51, leads: 47 },
  { label: 'May', sales: 41, leads: 63 },
  { label: 'June', sales: 47, leads: 71 },
  { label: 'July', sales: 47, leads: 71 },
  { label: 'August', sales: 47, leads: 71 },
  { label: 'September', sales: 47, leads: 71 },
  { label: 'October', sales: 47, leads: 71 },
  { label: 'November', sales: 47, leads: 71 },
  { label: 'December', sales: 47, leads: 71 }
];

function DashboardManagerPage(){
    return (
        <div className="wrapper">
            <div className="container" style={{ background: '#efefef' }}>
                <header className="header" style={{ background: '#efefef' }}>Manager Dashboard</header>
                <section className="statistics">
                    <article className="stat-item">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb301c9303735da7f3f8bfa731961a52528ce4886752d60ba60279e9d2c51fcf?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                            alt="Trainee Icon"
                            className="stat-image"
                        />
                        <div className="stat-item-content">
                            <h2 className="stat-title">Trainee</h2>
                            <p className="stat-value">5,423</p>
                            <div className="stat-change">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ac67b196153234e7da1c2a98345d2d7c7ad4625f95cff349fe9dd70ec203aa7?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                                alt="Increase Arrow"
                                className="arrow-icon"
                            />
                            <div className="change-text">
                                <span className="positive-change">16%</span> this month
                            </div>
                            </div>
                        </div>
                    </article>
                        <div className="divider" />
                        <article className="stat-item">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d308eaab491a469ca262bda2e6f12499ca399330e67e8af332c7288a9910e0f8?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                            alt="Trainer Icon"
                            className="stat-image"
                        />
                        <div className="stat-item-content">
                            <h2 className="stat-title">Trainer</h2>
                            <p className="stat-value">1,893</p>
                            <div className="stat-change">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0add78dfdee86be2fff5eee92794361f2c607d3dd0e300fc1202e1d4dedcf6cb?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                                alt="Decrease Arrow"
                                className="arrow-icon"
                            />
                            <div className="change-text">
                                <span className="negative-change">1%</span> this month
                            </div>
                            </div>
                        </div>
                    </article>
                        <div className="divider" />
                        <article className="stat-item">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/315dd99f1ed527cc489fa5d1c2b41293228918b8cc95b2e72b597357a36c6157?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                            alt="Active Now Icon"
                            className="stat-image"
                        />
                        <div className="stat-item-content">
                            <h2 className="stat-title">Active Now</h2>
                            <p className="stat-value">189</p>
                        </div>
                    </article>
                </section>
                <section className="statistics">
                    <div className="section col-md-12">
                    <h3 className="section-title">Line Chart</h3>
                    <div className="section-content">
                        <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                            <Tooltip />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Legend/>
                            <Line type="monotone" dataKey="sales" stroke="#FB8833" />
                            <Line type="monotone" dataKey="leads" stroke="#17A8F5" />
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DashboardManagerPage;