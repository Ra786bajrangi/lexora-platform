import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';

const API_URL = '/blogs';

// Async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for creating a blog



export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/blogs',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors || error.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ id, blogData }, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) return thunkAPI.rejectWithValue('No token found');
     


    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
     
      },
    };

    try {
      const response = await axios.put(`/blogs/${id}`, blogData, config);
      return response.data;
    } catch (err) {
      console.error('Update blog failed:', err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || 'Update failed');
    }
  }
);


//Async thunk for deleting a blog
export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
       
      },
    });
    return id; // return the deleted blog id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || 'Delete failed');
  }
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;