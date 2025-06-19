import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', // default role
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData); // ✅ check role is there

    dispatch(registerUser(formData))
      .unwrap()
      .then(() => navigate('/dashboard'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl px-8 py-10 w-full max-w-md animate-fade-in text-white">
      <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-md">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block mb-2 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition duration-200"
            placeholder="Your username"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-200"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400 focus:outline-none transition duration-200"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
  <label htmlFor="role" className="block mb-2 font-semibold">
    Role
  </label>
  <select
    id="role"
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-200"
  >
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
</div>


        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition duration-300 shadow-md"
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
