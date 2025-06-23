import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role:'user',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(loginUser(formData))
    .unwrap()
    .then((res) => {
      localStorage.setItem('token', res.token);
  localStorage.setItem('user', JSON.stringify(res.user));

      // Go to dashboard after login, no condition
      navigate('/user-dashboard');
    })
    .catch((err) => console.error(err));
};


  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl px-8 py-10 w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">Welcome Back!</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-white/90 mb-2 font-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400 focus:outline-none transition duration-200"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-white/90 mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-200"
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
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-pink-500 hover:to-purple-500 transition duration-300 shadow-md"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-white/90">
        Don't have an account?{' '}
        <a href="/register" className="text-yellow-300 hover:underline font-semibold">
          Register
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
