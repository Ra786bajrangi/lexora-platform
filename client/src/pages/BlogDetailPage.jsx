import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data);
        setLikes(res.data.likes?.length || 0);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog details.');
      }
    };
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    if (!token) {
      alert('You must be logged in to like this blog.');
      return;
    }

    setIsLiking(true);
    try {
      const res = await axios.post(
        `/blogs/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(res.data.likes);
    } catch (err) {
      console.error('Like error:', err);
      alert(err.response?.data?.message || 'Failed to like the blog.');
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!token) {
      alert('You must be logged in to comment.');
      return;
    }

    setIsCommenting(true);
    try {
      const res = await axios.post(
        `/blogs/${id}/comments`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Add new comment to the top of the list
      setComments(prev => [res.data, ...prev]);
      setCommentText('');
    } catch (err) {
      console.error('Comment error:', err);
      alert(err.response?.data?.msg || 'Failed to post comment.');
    } finally {
      setIsCommenting(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          By {blog.author?.username || 'Unknown'} • {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        {blog.image && (
  <img
  src={`/uploads/${blog.image?.split('/').pop()}`}
  alt="Blog"
  className="w-full max-h-[400px] object-cover rounded mb-6"
/>

)}
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: blog.content }} />

        <div className="mb-6">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`bg-blue-100 text-blue-700 px-4 py-1 rounded hover:bg-blue-200 ${
              isLiking ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLiking ? '...' : '❤️'} Like ({likes})
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Comments ({comments.length})</h3>

          <form onSubmit={handleCommentSubmit} className="mb-4 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-grow border rounded px-3 py-2"
              placeholder="Write a comment..."
              required
              disabled={isCommenting}
            />
            <button
              type="submit"
              disabled={isCommenting}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                isCommenting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isCommenting ? 'Posting...' : 'Post'}
            </button>
          </form>

          <ul className="space-y-3">
            {comments.map((comment) => (
              <li key={comment._id || comment.id} className="bg-gray-100 p-3 rounded shadow-sm">
                <p className="font-medium text-sm text-gray-800">{comment.username}</p>
                <p className="text-gray-700 text-sm">{comment.text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;