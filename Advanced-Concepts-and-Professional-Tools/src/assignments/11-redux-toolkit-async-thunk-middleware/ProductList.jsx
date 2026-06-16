import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiStar, FiShoppingBag } from "react-icons/fi";
import { fetchProducts } from "./features/productSlice";

function ProductList() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <h2 className="text-center text-xl">Loading products...</h2>;
  }

  if (error) {
    return (
      <h2 className="text-center text-red-500 text-xl">
        {error}
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {items.map((product) => (
        <div
          key={product.id}
          className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group p-4 flex flex-col"
        >
          {/* Product Image */}
          <div className="h-48 flex items-center justify-center mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-40 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col">
            {product.rating && (
              <div className="flex items-center gap-1 mb-2 text-amber-500">
                <FiStar
                  className="fill-amber-500 stroke-none"
                  size={14}
                />
                <span className="text-xs font-semibold text-slate-600">
                  {product.rating.rate}
                </span>
                <span className="text-xs text-slate-400">
                  ({product.rating.count})
                </span>
              </div>
            )}

            <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[40px] mb-3 group-hover:text-indigo-600 transition-colors">
              {product.title}
            </h3>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block font-medium">
                  Price
                </span>
                <span className="text-xl font-extrabold text-slate-900">
                  ${product.price}
                </span>
              </div>

              <button className="flex items-center justify-center p-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-200 active:scale-95">
                <FiShoppingBag size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;