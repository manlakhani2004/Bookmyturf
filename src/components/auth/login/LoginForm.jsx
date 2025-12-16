import React, { useState } from 'react';
import InputField from './InputField';
import { ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../../services/operations/auth';

const LoginForm = ({ isVisible }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔹 validation state
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 validation logic
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(Login(email, password, navigate));
  };

  return (
    <div className={`bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 transition-all duration-700 delay-900 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
        Welcome Back
      </h2>

      <div className="space-y-4 sm:space-y-6">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(val) => {
            setEmail(val);
            setErrors((prev) => ({ ...prev, email: '' }));
          }}
          placeholder="Enter your email"
          icon="mail"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(val) => {
            setPassword(val);
            setErrors((prev) => ({ ...prev, password: '' }));
          }}
          placeholder="Enter your password"
          icon="lock"
          showPasswordToggle
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">

        </div>

        <button
          onClick={handleSubmit}
          className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group text-sm sm:text-base"
        >
          <span>Sign In</span>
          <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-sm text-gray-600 mt-4 sm:mt-6">
          Don't have an account?{' '}
          <button className="text-green-600 cursor-pointer hover:text-green-700 font-semibold transition-colors">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
