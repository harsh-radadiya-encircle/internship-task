import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import ProtectedRoute from "./assignments/14-advanced-routing-code-splitting/ProtectedRoute";

const ThemeAssignment = lazy(() =>
  import("./assignments/8-context-api/ThemeAssignment")
);

const CustomHooksDemo = lazy(() =>
  import("./assignments/9-custom-hooks/CustomHooksDemo")
);

const ReduxTodoDemo = lazy(() =>
  import("./assignments/10-redux-toolkit-basics/ReduxTodoDemo")
);

const AsyncThunkDemo = lazy(() =>
  import("./assignments/11-redux-toolkit-async-thunk-middleware/AsyncThunkDemo")
);

const Parent = lazy(() =>
  import("./assignments/12-performance-optimization/Parent")
);

const MultiStepForm = lazy(() =>
  import("./assignments/13-formik-yup/MultiStepForm")
);

const Login = lazy(() =>
  import("./assignments/14-advanced-routing-code-splitting/Login")
);

const ProductDetails = lazy(() =>
  import("./assignments/14-advanced-routing-code-splitting/ProductDetails")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense
  fallback={
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl flex flex-col items-center">

        <div className="w-16 h-16 border-[6px] border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          Loading...
        </h2>

        <p className="text-slate-500 mt-2 text-center">
          Please wait while we fetch the page content.
        </p>

      </div>

    </div>
  }
>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/context-api"
            element={<ThemeAssignment />}
          />

          <Route
            path="/custom-hooks"
            element={<CustomHooksDemo />}
          />

          <Route
            path="/redux-toolkit-basics"
            element={<ReduxTodoDemo />}
          />

          <Route
            path="/async-thunk"
            element={<AsyncThunkDemo />}
          />

          <Route
            path="/performance-optimization"
            element={<Parent />}
          />

          <Route
            path="/formik-yup"
            element={<MultiStepForm />}
          />

          {/* Assignment 14 */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;