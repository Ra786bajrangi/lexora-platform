import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 animate-gradient">
      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8 w-full max-w-md text-white animate-fade">
        
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
