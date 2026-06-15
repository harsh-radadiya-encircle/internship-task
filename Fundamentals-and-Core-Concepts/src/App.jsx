import React from "react";
import Portfoliyo from "./assignments/1-react-introduction/Portfolio";
import { Practice } from "./assignments/2-state-and-events/Practice";
import { TodoApp } from "./assignments/2-state-and-events/TodoApp";
import { BlogPost } from "./assignments/3-component-hierarchy/BlogPost";

function App() {
  return (
    <>
      <Portfoliyo
        bio="BCA Graduate and aspiring MERN Stack Developer passionate about building modern web applications."
      />

        {/* <Practice /> */}

        <TodoApp />

        <BlogPost />

    </>
  )
}

export default App;