import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AuthorProfile = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    const user = JSON.parse(localStorage.getItem("user")); // { token, id, username }
    setCurrentUser(user);
  }, [username]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedImage || !currentUser?.token) return;

    const formData = new FormData();
    formData.append("avatar", selectedImage);
    setUploading(true);

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/users/avatar/${currentUser.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update UI
      setData((prev) => ({
        ...prev,
        author: { ...prev.author, avatar: res.data.avatar },
      }));
      setSelectedImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  if (!data) return <div className="text-center py-20">Loading...</div>;
  const { author, blogs } = data;
  console.log("currentUser:", currentUser);
console.log("username from URL:", username);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white dark:bg-gray-900">
      <div className="text-center mb-10">
        <img
          src={preview || author.avatar || "/default-avatar.png"}
          alt={author.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-blue-500"
        />
        <h2 className="text-2xl font-bold dark:text-white">{author.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{author.bio}</p>

        {/* Show upload section only if user is owner */}
        {currentUser?.username === username && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-2 file:mr-4"
            />
            {preview && (
              <button
                onClick={handleUpload}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Avatar"}
              </button>
            )}
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-6 dark:text-white text-center">
        Blogs by {author.name}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition"
          >
            <h4 className="text-lg font-bold dark:text-white">{blog.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {blog.content?.replace(/<[^>]+>/g, "").slice(0, 100)}...
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
