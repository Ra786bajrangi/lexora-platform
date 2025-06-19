// src/components/AdminAnalytics.jsx
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const blogsRes = await axios.get('http://localhost:5000/api/admin/blogs', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Count blogs per user
        const countMap = {};
        blogsRes.data.forEach(blog => {
          const username = blog.author?.username || 'Unknown';
          countMap[username] = (countMap[username] || 0) + 1;
        });

        const formattedData = Object.entries(countMap).map(([username, count]) => ({
          username,
          blogs: count,
        }));

        setAnalyticsData(formattedData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md mt-10 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        Blog Count per User
      </h3>

      {analyticsData.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No blog data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="username" stroke="#8884d8" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="blogs" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AdminAnalytics;
