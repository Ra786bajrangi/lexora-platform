import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import {
  LayoutDashboard,
  Users,
  FileText,
  ActivitySquare,
  BarChart2,
} from 'lucide-react';

import UserManagement from '../components/UserManagement';
import BlogCards from '../components/BlogCard';
import AdminAnalytics from '../components/AdminAnalytics';
import UserStatusChart from '../components/UserStatusChart';
import ActivityLog from '../components/ActivityLog';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (activeTab === 'blogs') fetchBlogs();
  }, [activeTab]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/admin/blogs', {
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
      await axios.delete(`/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 p-6 shadow-md border-r">
        <h2 className="text-2xl font-bold text-green-600 mb-10">Admin Panel</h2>
        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          <li>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition ${
                activeTab === 'analytics' ? 'bg-green-100 dark:bg-green-800 text-green-700' : ''
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              Analytics
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('userStatus')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition ${
                activeTab === 'userStatus' ? 'bg-green-100 dark:bg-green-800 text-green-700' : ''
              }`}
            >
              <Users className="w-5 h-5" />
              User Status
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition ${
                activeTab === 'users' ? 'bg-green-100 dark:bg-green-800 text-green-700' : ''
              }`}
            >
              <Users className="w-5 h-5" />
              Manage Users
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition ${
                activeTab === 'blogs' ? 'bg-green-100 dark:bg-green-800 text-green-700' : ''
              }`}
            >
              <FileText className="w-5 h-5" />
              Blog Posts
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition ${
                activeTab === 'activity' ? 'bg-green-100 dark:bg-green-800 text-green-700' : ''
              }`}
            >
              <ActivitySquare className="w-5 h-5" />
              Activity Log
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>

        {/* Render active tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <AdminAnalytics />
          </div>
        )}

        {activeTab === 'userStatus' && (
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <UserStatusChart />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <UserManagement />
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <BlogCards blogs={blogs} loading={loading} deleteBlog={deleteBlog} />
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <ActivityLog />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
