import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTags, FaTimes } from 'react-icons/fa';

const tagColors = {
  Tech: 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-white',
  News: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-white',
  Info: 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-white',
};

const BlogCards = ({ blogs, loading, deleteBlog }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedBlog ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [selectedBlog]);

  return (
    <section className="mb-12">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        All Blogs
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-2 text-gray-600 dark:text-gray-300">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center col-span-2 text-gray-500">No blogs available.</p>
        ) : (
          blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-5 rounded-xl shadow-lg cursor-pointer transition hover:scale-[1.03] hover:shadow-2xl hover:brightness-105 duration-300
                ${
                  index % 3 === 0
                    ? 'bg-gradient-to-br from-pink-100 to-red-200 dark:from-pink-800 dark:to-red-900'
                    : index % 3 === 1
                    ? 'bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-800 dark:to-indigo-900'
                    : 'bg-gradient-to-br from-green-100 to-teal-200 dark:from-green-800 dark:to-teal-900'
                }`}
              onClick={() => setSelectedBlog(blog)}
            >
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{blog.title}</h4>
              <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Author:</span> {blog.author?.username || 'Unknown'}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {(blog.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${tagColors[tag] || 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'}`}
                  >
                    <FaTags className="text-xs" /> {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-lg w-full shadow-xl relative overflow-y-auto max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
              >
                <FaTimes size={20} />
              </button>

              <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                {selectedBlog.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                <strong>Author:</strong> {selectedBlog.author?.username || 'Unknown'}
              </p>

              {/* Render HTML content properly */}
              <div
                className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: selectedBlog.content || '<p>No content provided.</p>',
                }}
              />

              {/* Tags and Delete */}
              <div className="mt-4 flex justify-between items-center flex-wrap gap-3">
                <div className="flex gap-2 flex-wrap">
                  {(selectedBlog.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${tagColors[tag] || 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'}`}
                    >
                      <FaTags className="text-xs" /> {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    deleteBlog(selectedBlog._id);
                    setSelectedBlog(null);
                  }}
                  className="px-4 py-1.5 rounded bg-red-600 text-white text-xs hover:bg-red-700"
                >
                  Delete Blog
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogCards;
