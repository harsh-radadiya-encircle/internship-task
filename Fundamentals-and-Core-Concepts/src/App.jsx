import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import Portfoliyo from "./assignments/1-react-introduction/Portfolio";
import { TodoApp } from "./assignments/2-state-and-events/TodoApp";
import { BlogPost } from "./assignments/3-component-hierarchy/BlogPost";
import RegistrationForm from "./assignments/4-forms-and-input-handling/RegistrationForm";
import UserCards from "./assignments/5-useeffect-api-integration/UserCards";
import NotFound from "./assignments/6-react-routing/NotFound";

import RoutingBlogPost from "./assignments/6-react-routing/BlogPost";
import BlogDetail from "./assignments/6-react-routing/BlogDetail";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/portfolio"
          element={
            <Portfoliyo
              bio="BCA Graduate and aspiring MERN Stack Developer passionate about building modern web applications."
            />
          }
        />

        <Route
          path="/todo-app"
          element={<TodoApp />}
        />

        <Route
          path="/blog-posts"
          element={<BlogPost />}
        />

        <Route
          path="/registration-form"
          element={<RegistrationForm />}
        />

        <Route
          path="/user-cards"
          element={<UserCards />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

        <Route
  path="/routing-blog"
  element={<RoutingBlogPost />}
/>

<Route
  path="/blog/:id"
  element={<BlogDetail />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;