import { Eye, EyeOff, LogIn } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const INITIAL_FORM = { email: "", password: "" };

// ✅ Define your own FIELDS, INPUTWRAPPER, BUTTON_CLASSES since you're avoiding dummy.jsx
const FIELDS = [
  { name: "email", type: "email", placeholder: "Enter your email", icon: LogIn, isPassword: false },
  { name: "password", type: "password", placeholder: "Enter your password", icon: Eye, isPassword: true },
];

const INPUTWRAPPER = "flex items-center gap-2 border rounded px-3 py-2";
const BUTTON_CLASSES = "w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50";

function Login({ onSubmit, onSwitchMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const url = 'http://localhost:4000';

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
      (async () => {
        try {
          const response = await axios.get(`${url}/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const result = response.data;
          if (result.success) {
            onSubmit?.({ token, userId, ...result.user });
            toast.success("Session restored. Redirecting...");
            navigate('/');
          } else {
            localStorage.clear();
          }
        } catch (error) {
          localStorage.clear();
        }
      })();
    }
  }, [navigate, onSubmit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rememberMe) {
      toast.error('You must enable "Remember Me" to login.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/user/login`, formData);
      const result = response.data;

      if (!result.token) throw new Error(result.message || "Login failed");

      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.user.id);
      setFormData(INITIAL_FORM);
      onSubmit?.({ token: result.token, userId: result.user.id, ...result.user });
      toast.success("Login successful. Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchMode = () => {
    toast.dismiss();
    onSwitchMode?.();
  };

  return (
    <div className='max-w-md bg-white w-full shadow-lg border border-purple-100 rounded-xl p-8'>
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar />
      <div className='mb-6 text-center'>
        <div className='w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4'>
          <LogIn className='w-8 h-8 text-white' />
        </div>
        <h2 className='text-2xl font-bold text-gray-800'>Welcome Back</h2>
        <p className='text-gray-500 text-sm mt-1'>Sign in to continue to TaskFlow</p>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {FIELDS.map(({ name, type, placeholder, icon: Icon, isPassword }) => (
          <div key={name} className={INPUTWRAPPER}>
            <Icon className='text-purple-500 w-5 h-5' />
            <input
              type={isPassword && !showPassword ? "password" : "text"}
              placeholder={placeholder}
              value={formData[name]}
              onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
              className='w-full focus:outline-none text-sm text-gray-700'
              required
            />
            {isPassword && (
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='ml-2 text-gray-500 hover:text-purple-500 transition-colors'
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            )}
          </div>
        ))}
        <div className='flex items-center'>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className='h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded'
            required
          />
          <label htmlFor='rememberMe' className='ml-2 block text-sm text-gray-700'>
            Remember Me
          </label>
        </div>
        <button type='submit' className={BUTTON_CLASSES} disabled={loading}>
          {loading ? (
            "Logging in..."
          ) : (
            <>
              <LogIn className='w-4 h-4' />
              Login
            </>
          )}
        </button>
      </form>
      <p className='text-center text-sm text-gray-600 mt-6'>
        Don't have an account?{' '}
        <button
          type='button'
          className='text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors'
          onClick={handleSwitchMode}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;