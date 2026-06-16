import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to="/product/1" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/product/1");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
                  placeholder="jane@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FiLock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-md shadow-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200 group"
            >
              <span>Sign In</span>
              <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;