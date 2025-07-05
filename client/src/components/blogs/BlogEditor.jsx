import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { createBlog, updateBlog } from '../../features/blogs/blogSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

const BlogEditor = ({ mode = 'create' }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null); // ✅ image file
  const [imagePreview, setImagePreview] = useState(null); // ✅ preview
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Edit mode: Fetch existing blog
  useEffect(() => {
    if (mode === 'edit' && id) {
      axios
        .get(`/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setTags(Array.isArray(res.data.tags) ? res.data.tags.join(', ') : '');
          if (res.data.image) {
            setImagePreview(`http://localhost:5000/${res.data.image}`);
          }
        })
        .catch((err) => console.error('Failed to load blog for edit:', err));
    }
  }, [mode, id]);

  // ✅ Preview image when user selects one
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    if (image) formData.append('image', image);

    try {
      if (mode === 'edit') {
        await dispatch(updateBlog({ id, blogData: formData })).unwrap();
      } else {
        await dispatch(createBlog(formData)).unwrap();
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Blog submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {mode === 'edit' ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content</label>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blog Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-full max-h-64 object-cover rounded-lg border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {loading ? 'Saving...' : mode === 'edit' ? 'Update Blog' : 'Publish'}
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
