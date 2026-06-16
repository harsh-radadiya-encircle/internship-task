import ProductList from "./ProductList";

function AsyncThunkDemo() {
  return (
    <div>
      <header className="text-center mb-10">
        <span className="bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 inline-block">
          Redux Toolkit Middleware
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-2 mb-4">
          Async Thunk <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Storefront</span>
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto text-sm">
          Seamlessly fetch, cache, and display asynchronous catalog data utilizing optimized Redux state handlers.
        </p>
      </header>

      <ProductList />
    </div>
  );
}

export default AsyncThunkDemo;