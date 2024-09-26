import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser, setUsers } from './redux/actions';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { FaTachometerAlt, FaUser, FaCog, FaTrash } from 'react-icons/fa';
import './App.css';
import ResizeObserver from 'resize-observer-polyfill';

// ResizeObserver polyfill
const resizeObserverLoopErr = () => {
  const err = new Error('ResizeObserver loop completed with undelivered notifications.');
  err.name = 'ResizeObserverError';
  window.addEventListener('error', (e) => {
    if (!window.ResizeObserver) {
      window.ResizeObserver = ResizeObserver;
    }
  });
};
resizeObserverLoopErr();

function App() {
  const users = useSelector((state) => state.users);
  const stats = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sample users
  const sampleUsers = [
    { id: 1, name: 'John Doe', active: true },
    { id: 2, name: 'Jane Smith', active: false },
  ];

  const handleSetUsers = () => {
    dispatch(setUsers(sampleUsers));
  };

  const handleAddUser = () => {
    const newUser = { id: Date.now(), name: 'New User', active: true };
    dispatch(addUser(newUser));
  };

  const handleRemoveUser = (userId) => {
    dispatch(removeUser(userId));
  };

  // Data for the chart
  const chartData = [
    { name: 'Total Users', count: stats.totalUsers },
    { name: 'Active Users', count: users.filter((user) => user.active).length },
    { name: 'Inactive Users', count: users.filter((user) => !user.active).length },
  ];

  // User activity data
  const [activityLog, setActivityLog] = useState([
    { id: 1, message: 'John Doe logged in', time: '2 hours ago' },
    { id: 2, message: 'Jane Smith updated her profile', time: '1 hour ago' },
  ]);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setUsers([...users, { id: Date.now(), name: 'Real-time User', active: Math.random() > 0.5 }]));
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch, users]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      {/* Collapsible Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="toggle-sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '☰' : '❯'}
        </button>
        <nav>
          <ul>
            <li><FaTachometerAlt /> Dashboard</li>
            <li><FaUser /> Users</li>
            <li><FaCog /> Settings</li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Dashboard</h1>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="action-buttons">
          <button className="btn primary" onClick={handleSetUsers}>Set Sample Users</button>
          <button className="btn secondary" onClick={handleAddUser}>Add User</button>
        </div>

        {/* User List */}
        <div className="user-list widget">
          <h2>User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <img src={`https://robohash.org/${user.id}.png`} alt={user.name} className="user-avatar" />
                {user.name} ({user.active ? 'Active' : 'Inactive'})
                <button onClick={() => handleRemoveUser(user.id)} className="btn danger">
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats Section */}
        <div className="stats widget">
          <h2>Statistics</h2>
          <div className="stats-info">
            <p><strong>Total Users:</strong> {stats.totalUsers}</p>
            <p><strong>Active Users:</strong> {users.filter((user) => user.active).length}</p>
            <p><strong>Inactive Users:</strong> {users.filter((user) => !user.active).length}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart widget">
          <h2>User Data Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Activity Widget */}
        <div className="activity-widget widget">
          <h2>Recent Activity</h2>
          <ul>
            {activityLog.map((log) => (
              <li key={log.id}>
                <span>{log.message}</span>
                <span className="time">{log.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
