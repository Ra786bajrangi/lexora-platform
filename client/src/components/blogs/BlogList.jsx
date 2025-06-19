import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../../features/blogs/blogSlice';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="text-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50 mx-auto" />
        <p className="text-blue-600 mt-4">Loading blogs...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in">
        🚀 Latest Blog Posts
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog, i) => (
          <div
            key={blog._id}
            className="relative group transition-transform transform hover:scale-105 hover:shadow-xl duration-300 bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
              <Link to={`/blogs/${blog._id}`}>
                {blog.title}
              </Link>
            </h3>

            <p className="text-sm text-gray-500 mb-3">By {blog.author?.username}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-sm font-medium text-gray-800 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div
              className="text-gray-700 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 200) + '...' }}
            />

            <Link
              to={`/blogs/${blog._id}`}
              className="inline-block mt-6 text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all duration-300"
            >
              Read More →
            </Link>

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:h-2 transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
