// EditBlogPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogEditor from '../components/blogs/BlogEditor';

const EditBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`,updatedBlogData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBlog(res.data))
      .catch((err) => console.error('Failed to load blog:', err));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return <BlogEditor mode="edit"blog={blog} blogId={id} />;
};

export default EditBlogPage;
