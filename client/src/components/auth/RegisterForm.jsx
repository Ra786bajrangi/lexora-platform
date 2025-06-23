import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        navigate(`/author/${user.username}`);
      })
      .catch((err) => console.error('Registration failed:', err));
  };

  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl px-8 py-10 w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/30 text-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-green-500 transition duration-300 shadow-md"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-center text-white/90">
        Already have an account?{' '}
        <a href="/login" className="text-yellow-300 hover:underline font-semibold">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
