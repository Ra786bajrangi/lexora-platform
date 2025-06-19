import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 animate-gradient">
      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8 w-full max-w-md text-white animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold drop-shadow-md">🚀 Login</h1>
          <p className="text-sm mt-2 text-white/80">Welcome back! Please login to continue.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
