import CounterA from "./CounterA";
import CounterB from "./CounterB";

function CustomHooksDemo() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Custom Hook <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Powers</span>
        </h1>
        <p className="text-slate-500 max-w-md mx-auto">
          Demonstrating reusable logic across multiple components using a single custom counter hook.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 items-center w-full max-w-3xl justify-center">
        <CounterA />
        <CounterB />
      </div>

    </div>
  );
}

export default CustomHooksDemo;