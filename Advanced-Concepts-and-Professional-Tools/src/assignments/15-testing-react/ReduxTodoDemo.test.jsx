import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

import { store } from "../10-redux-toolkit-basics/app/store";
import ReduxTodoDemo from "../10-redux-toolkit-basics/ReduxTodoDemo";

describe("Redux Todo Demo", () => {
  test("renders todo app", () => {
    render(
      <Provider store={store}>
        <ReduxTodoDemo />
      </Provider>
    );

    expect(screen.getByRole("heading", { name: /task manager/i })).toBeInTheDocument();
  });
});