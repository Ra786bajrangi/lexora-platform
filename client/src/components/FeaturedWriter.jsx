import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../utils/axiosConfig'; 


const FeaturedWriter = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axios.get("/blogs/authors");
        setAuthors(res.data);
      } catch (err) {
        console.error("Failed to load authors:", err);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 bg-white dark:bg-gray-900 transition-colors duration-500">
      <h3 className="text-3xl font-bold text-center text-indigo-800 dark:text-indigo-400 mb-12">
        Featured Writers
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {authors.map(author => (
          <div
            key={author.id}
            className="text-center bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300"
          >
            <img
              src={author.avatar}
              alt={author.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-indigo-400 dark:ring-indigo-600"
            />
            <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
              {author.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {author.bio}
            </p>
            <Link
              to={`/author/${author.username}`}
              className="text-indigo-600 dark:text-indigo-300 text-sm font-medium hover:underline"
            >
              View Profile →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWriter;
