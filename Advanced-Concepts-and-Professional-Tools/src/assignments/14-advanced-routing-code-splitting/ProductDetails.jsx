import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiLogOut, FiShoppingCart, FiStar, FiCheck } from "react-icons/fi";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Navigation / Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Store<span className="text-indigo-600">Front</span>
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-red-600 transition-all duration-200 active:scale-95 shadow-sm"
          >
            <FiLogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Product Image Section */}
          <div className="md:w-1/2 bg-slate-100 p-12 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-transparent opacity-50 mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600" 
              alt="Premium Product" 
              className="relative z-10 w-full max-w-sm object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out rounded-2xl"
            />
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full uppercase tracking-wider">
                New Release
              </span>
              <span className="flex items-center text-amber-400 text-sm">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <span className="text-slate-400 ml-1 text-xs font-medium">(128)</span>
              </span>
            </div>

            <h2 className="text-4xl font-black text-slate-900 mb-2 leading-tight">
              Premium Wireless Headphones {id ? `(ID: ${id})` : ''}
            </h2>
            
            <p className="text-slate-500 mb-8 leading-relaxed">
              Experience the ultimate sound quality with our next-generation wireless headphones. Featuring active noise cancellation and 40-hour battery life. This content is loaded via React.lazy() and protected route.
            </p>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">$299</span>
              <span className="text-lg text-slate-400 line-through font-medium mb-1">$399</span>
            </div>

            <div className="space-y-3 mb-8">
              {['Active Noise Cancellation', '40-Hour Battery Life', 'Premium Comfort Fit'].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <FiCheck size={12} strokeWidth={3} />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 group">
              <FiShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;