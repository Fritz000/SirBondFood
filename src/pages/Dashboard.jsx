import React from "react";

const Dashboard = () => {
  // Sample data for dashboard widgets
  const stats = [
    { title: "Total Sales", value: "$24,780", change: "+12%" },
    { title: "Total Orders", value: "356", change: "+8%" },
    { title: "New Users", value: "124", change: "+23%" },
    { title: "Conversion Rate", value: "3.6%", change: "+1.2%" },
  ];

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Monthly Sales</h3>
          <div className="chart-placeholder">
            Chart will be displayed here
          </div>
        </div>
        <div className="chart-container">
          <h3>Popular Categories</h3>
          <div className="chart-placeholder">
            Chart will be displayed here
          </div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          <li>
            <span className="activity-time">10:32 AM</span>
            <span className="activity-description">New order #38295 received</span>
          </li>
          <li>
            <span className="activity-time">09:16 AM</span>
            <span className="activity-description">User John Doe registered</span>
          </li>
          <li>
            <span className="activity-time">08:45 AM</span>
            <span className="activity-description">Payment confirmed for order #38291</span>
          </li>
          <li>
            <span className="activity-time">Yesterday</span>
            <span className="activity-description">New promotion campaign created</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;