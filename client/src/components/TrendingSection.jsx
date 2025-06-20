// src/components/TrendingSection.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify"; // install via: npm install dompurify

const TrendingSection = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs/trending");
        setTrendingPosts(res.data);
      } catch (err) {
        console.error("Error fetching trending posts:", err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 bg-white dark:bg-gray-900">
      <h3 className="text-3xl font-bold text-center text-indigo-800 dark:text-indigo-400 mb-12">
        Trending This Week
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingPosts.map((post) => (
          <div
            key={post._id}
            className="border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <span className="text-sm text-indigo-600 dark:text-indigo-400">
                {post.tags?.[0] || "Blog"}
              </span>
              <h4 className="text-xl font-semibold my-2 dark:text-white">
                {post.title}
              </h4>
              <div
                className="text-gray-600 dark:text-gray-300 text-sm mb-3"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content.slice(0, 150) + "...")
                }}
              ></div>
              <Link
                to={`/blog/${post._id}`}
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Read Story →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
