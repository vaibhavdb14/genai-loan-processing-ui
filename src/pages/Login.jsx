import  React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For UI purposes, bypass actual auth and go straight to the Dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-banking-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-banking-card rounded-lg shadow-sm border border-border p-8">
        
        {/* Branding Area */}
        <div className="flex flex-col items-center justify-center mb-8 text-banking-navy">
          <div className="bg-banking-softBlue p-3 rounded-full mb-4">
            <Landmark size={40} className="text-banking-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary text-center tracking-tight">
            Loan Processing System
          </h1>
          <div className="flex items-center gap-1.5 text-text-secondary mt-2 text-sm">
            <ShieldCheck size={16} className="text-banking-success" />
            <span>Secure Enterprise Portal</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Identifier / Employee ID
            </label>
            <input
              type="text"
              placeholder="e.g., EMP-8492"
              className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-banking-primary focus:border-transparent text-sm text-text-primary transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your secure password"
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-banking-primary focus:border-transparent text-sm text-text-primary transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border text-banking-primary focus:ring-banking-primary" />
              <span className="text-text-secondary">Remember me</span>
            </label>
            <a href="#" className="text-banking-primary font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-banking-primary hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors mt-4"
          >
            Manager Login
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;