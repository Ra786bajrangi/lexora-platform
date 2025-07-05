import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 animate-gradient">
      {/* Overlay for fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 opacity-80 blur-sm"></div>

      {/* Login Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-xl p-8 w-full max-w-md mx-4 text-white animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold drop-shadow-sm">🚀 Login</h1>
          <p className="text-sm mt-2 text-white/80">Welcome back! Please login to continue.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
