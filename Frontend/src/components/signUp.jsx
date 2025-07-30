import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const API_URL = "http://localhost:4000";
const INITIAL_FORM = { name: "", email: "", password: "" };

const FIELDS = [
  { name: "name", type: "text", placeholder: "Full Name", icon: User },
  { name: "email", type: "email", placeholder: "Email Address", icon: Mail },
  { name: "password", type: "password", placeholder: "Password", icon: Lock }
];

const INPUT_WRAPPER = "flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500";
const BUTTON_CLASSES = "w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50";
const MESSAGE_SUCCESS = "text-green-600 text-sm text-center mb-3";
const MESSAGE_ERROR = "text-red-600 text-sm text-center mb-3";

function SignUp({ onSwitchMode }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { data } = await axios.post(`${API_URL}/api/user/register`, formData);
      console.log("Signup Successful", data);
      setMessage({
        text: "Registration Successful! You can now login",
        type: "success"
      });
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error("Signup error", error);
      setMessage({
        text: error.response?.data?.message || "An error occurred. Please try again.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8'>
      <div className='mb-6 text-center'>
        <div className='w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4'>
          <UserPlus className='w-8 h-8 text-white' />
        </div>
        <h2 className='text-2xl font-bold text-gray-800'>Create Account</h2>
        <p className='text-gray-500 text-sm mt-1'>Join TaskFlow to manage your tasks</p>
      </div>

      {message.text && (
        <div className={message.type === 'success' ? MESSAGE_SUCCESS : MESSAGE_ERROR}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
          <div key={name} className={INPUT_WRAPPER}>
            <Icon className='text-purple-500 w-5 h-5 mr-2' />
            <input
              type={type}
              placeholder={placeholder}
              value={formData[name]}
              onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
              className='w-full focus:outline-none text-sm text-gray-700'
              required
            />
          </div>
        ))}

        <button type='submit' className={BUTTON_CLASSES} disabled={loading}>
          {loading ? "Signing Up..." : (
            <>
              <UserPlus className='w-4 h-4 mr-1 inline' /> Sign Up
            </>
          )}
        </button>
      </form>

      <p className='text-center text-sm text-gray-600 mt-6'>
        Already have an account?{' '}
        <button
          onClick={onSwitchMode}
          className='text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors'
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default SignUp;
