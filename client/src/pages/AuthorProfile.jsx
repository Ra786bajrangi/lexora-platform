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
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, [username]);
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    alert('Please upload a JPEG, PNG, or WebP image');
    return;
  }

  // Validate file size (2MB max)
  if (file.size > 2 * 1024 * 1024) {
    alert('Image must be smaller than 2MB');
    return;
  }

  setSelectedImage(file);
  setPreview(URL.createObjectURL(file));
};

 const handleUpload = async () => {
  // Get fresh authentication data
  const authToken = localStorage.getItem('token');
  const freshUser = JSON.parse(localStorage.getItem('user'));

  if (!selectedImage) {
    alert('Please select an image first');
    return;
  }

  if (!authToken || !freshUser?.id) {
    alert('Please login to update your avatar');
    return;
  }

  const formData = new FormData();
  formData.append('avatar', selectedImage);
  setUploading(true);

  try {
    const res = await axios.patch(
      `http://localhost:5000/api/users/avatar/${freshUser.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Update all states
    setData(prev => ({
      ...prev,
      author: { ...prev.author, avatar: res.data.avatar }
    }));

    // Update local storage and state
    const updatedUser = { 
      ...freshUser, 
      avatar: res.data.avatar 
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    // Reset selection
    setSelectedImage(null);
    setPreview(null);

    alert('Avatar updated successfully!');

  } catch (err) {
    console.error('Upload error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });

    let errorMessage = 'Failed to update avatar';
    if (err.response) {
      if (err.response.status === 403) {
        errorMessage = 'You are not authorized to update this profile';
      } else if (err.response.status === 400) {
        errorMessage = err.response.data.message || 'Invalid file format';
      }
    }
    alert(errorMessage);

  } finally {
    setUploading(false);
  }
};
  if (!data) return <div className="text-center py-20">Loading...</div>;
  
  const { author, blogs } = data;
  
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