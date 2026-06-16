import { useMemo } from "react";

function ExpensiveCalculation({ number }) {
    const result = useMemo(() => {
        console.log("Calculating...");

        let total = 0;

        for (let i = 0; i < 100000000; i++) {
            total += i;
        }

        return number * 2;
    }, [number]);

    return (
        <>
            <p className="text-sm text-slate-500 mb-6">
                The heavy calculation is memoized for optimal performance.
            </p>

            {/* Result Display */}
            <div className="bg-slate-900 text-white text-2xl font-black py-4 px-6 rounded-2xl flex items-center justify-between shadow-inner">
                <span className="text-slate-400 text-sm font-normal">Output:</span>
                <span className="tabular-nums">{result}</span>
            </div>
        </>
    );
}

export default ExpensiveCalculation;