import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../features/auth/authSlice';
import { deleteBlog } from '../features/blogs/blogSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig'; 

import { motion } from 'framer-motion';

import Pagination from '../components/Pagination';

const UserDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
  });

  const blogCreated = location.state?.newBlog || false;

  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (isAuthenticated) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `/blogs/my-blogs?page=${pagination.currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        setMyBlogs(res.data.blogs);
        setPagination({
          currentPage: res.data.pagination.currentPage,
          totalPages: res.data.pagination.totalPages,
          totalBlogs: res.data.pagination.totalBlogs,
        });
      } catch (err) {
        console.error('Error fetching user blogs:', err);
        setError('Failed to load your blogs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [isAuthenticated, blogCreated, pagination.currentPage]);

  useEffect(() => {
    if (location.state?.newBlog) {
      window.history.replaceState({}, document.title);
    }
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      dispatch(deleteBlog(id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  

return (
  <div className="flex min-h-screen">
    {/* Sidebar */}
    <aside className="w-64 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 border-r shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
          My Panel
        </h2>
        <ul className="space-y-4">
          <li>
            <Link
              to={`/author/${user?.username}`}
              className="text-gray-700 hover:text-pink-600 font-semibold transition duration-300"
            >
              👤 Profile
            </Link>
          </li>
          <li>
            <Link
              to="/create-blog"
              className="text-gray-700 hover:text-indigo-600 font-semibold transition duration-300"
            >
              ✍️ Create Blog
            </Link>
          </li>
          {user?.role === 'admin' && (
            <li>
              <Link
                to="/admin-dashboard"
                className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
              >
                🛠️ Admin Panel
              </Link>
            </li>
          )}
        </ul>
      </div>
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white py-2 px-4 rounded-xl font-bold shadow-lg hover:opacity-90 transition duration-300"
      >
        🚪 Logout
      </motion.button>
    </aside>

    {/* Main Content */}
    <motion.div
      className="flex-1 bg-gradient-to-br from-green-50 to-blue-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Dashboard
            <span className="block w-16 h-1 bg-gradient-to-r from-pink-400 to-green-400 mt-1 rounded-full animate-pulse"></span>
          </h1>
          <div className="text-pink-600 font-semibold text-lg">
            Welcome, {user?.username || 'User'}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-8 px-4 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">📝 My Blogs</h2>
          {pagination.totalBlogs > 0 && (
            <span className="text-sm text-gray-600">
              Showing {(pagination.currentPage - 1) * 10 + 1}–{Math.min(pagination.currentPage * 10, pagination.totalBlogs)} of {pagination.totalBlogs} blogs
            </span>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-lg shadow">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-500"></div>
          </div>
        ) : myBlogs.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-white rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="mt-2 text-xl font-semibold text-gray-800">No blogs yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first blog post.</p>
            <div className="mt-6">
              <Link
                to="/create-blog"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-bold rounded-md shadow-lg hover:scale-105 transition-transform"
              >
                ➕ New Blog
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid gap-6">
              {myBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl border-l-4 border-blue-400 transition-all"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{blog.title}</h3>
                      <div
                        className="prose prose-sm text-gray-600 max-w-none line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 shadow-sm">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-blue-600 font-medium hover:underline flex items-center"
                    >
                      Read more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <div className="flex space-x-4">
                      <Link
                        to={`/edit/${blog._id}`}
                        className="text-sm text-indigo-500 hover:text-indigo-700"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </main>
    </motion.div>
  </div>
);

};

export default UserDashboardPage;
