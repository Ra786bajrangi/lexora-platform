// src/components/UserStatusChart.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#10b981', '#ef4444']; // green, red

const UserStatusChart = () => {
  const [userStats, setUserStats] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const activeCount = res.data.filter(user => user.isActive).length;
        const inactiveCount = res.data.length - activeCount;

        setUserStats([
          { name: 'Active', value: activeCount },
          { name: 'Inactive', value: inactiveCount },
        ]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md mt-10 max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        User Activity Status
      </h3>

      {userStats.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No user data found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userStats}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {userStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserStatusChart;
