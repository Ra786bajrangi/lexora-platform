import { useEffect, useState } from 'react';
import axios from 'axios';
import UserManagement from '../components/UserManagement';
import BlogCards from '../components/BlogCard';
import AdminAnalytics from '../components/AdminAnalytics'; 
import UserStatusChart from '../components/UserStatusChart';
import ActivityLog from '../components/ActivityLog';
const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/blogs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <AdminAnalytics />
  <UserStatusChart />
</div>
      <UserManagement />
      <BlogCards blogs={blogs} loading={loading} deleteBlog={deleteBlog} />
      <ActivityLog/>
    </div>
  );
};

export default AdminDashboard;
