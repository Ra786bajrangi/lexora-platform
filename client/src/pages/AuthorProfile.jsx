// src/pages/AuthorProfile.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AuthorProfile = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/author/${username}`);
        setData(res.data);
      } catch (err) {
        console.error("Author fetch failed:", err);
      }
    };
    fetchAuthor();
  }, [username]);

  if (!data) return <div className="text-center py-20">Loading...</div>;

  const { author, blogs } = data;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white dark:bg-gray-900">
      <div className="text-center mb-10">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold dark:text-white">{author.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{author.bio}</p>
      </div>

      <h3 className="text-xl font-semibold mb-6 dark:text-white text-center">
        Blogs by {author.name}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <div
            key={blog._id}
            className="border dark:border-gray-700 rounded-lg p-4 hover:shadow"
          >
            <h4 className="text-lg font-bold dark:text-white">{blog.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
            </p>
            <Link
              to={`/blog/${blog._id}`}
              className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorProfile;
