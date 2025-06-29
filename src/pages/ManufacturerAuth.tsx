import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Building, FileText } from 'lucide-react';
import Header from '../components/Header';

const ManufacturerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      navigate('/manufacturer/dashboard');
    } else {
      navigate('/manufacturer/register');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 p-8 rounded-2xl border border-neon-green/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-neon-green/20 rounded-full mb-4">
                <Shield className="h-8 w-8 text-neon-green" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join TraceGreen'}
              </h2>
              <p className="text-gray-400">
                {isLogin ? 'Sign in to your manufacturer account' : 'Create your manufacturer account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Building className="h-4 w-4 inline mr-2" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="Your Company Ltd."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FileText className="h-4 w-4 inline mr-2" />
                      GSTIN Number
                    </label>
                    <input
                      type="text"
                      pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="22AAAAA0000A1Z5"
                      title="Enter valid GSTIN (15 characters)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      15-character GST identification number (optional)
                    </p>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Lock className="h-4 w-4 inline mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Lock className="h-4 w-4 inline mr-2" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-neon-green to-electric-lime text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-neon-green hover:text-electric-lime transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerAuth;