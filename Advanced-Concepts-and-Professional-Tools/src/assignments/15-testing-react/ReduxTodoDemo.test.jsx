import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../10-redux-toolkit-basics/app/store";
import ReduxTodoDemo from "../10-redux-toolkit-basics/ReduxTodoDemo";

describe("ReduxTodoDemo", () => {
  test("renders correctly and shows empty state", () => {
    render(
      <Provider store={store}>
        <ReduxTodoDemo />
      </Provider>
    );

    expect(screen.getByText(/Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/All caught up!/i)).toBeInTheDocument();
  });

  test("adds a new task and then deletes it", async () => {
    render(
      <Provider store={store}>
        <ReduxTodoDemo />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/What needs to be done\?/i);
    const addButton = screen.getByRole("button", { name: /Add project task/i });

    // Add a task
    await userEvent.type(input, "Learn React Testing");
    await userEvent.click(addButton);

    // Verify task is added
    expect(screen.getByText("Learn React Testing")).toBeInTheDocument();

    // Verify empty state is gone
    expect(screen.queryByText(/All caught up!/i)).not.toBeInTheDocument();

    // Delete the task
    const deleteButton = screen.getByRole("button", { name: /Delete task item/i });
    await userEvent.click(deleteButton);

    // Verify task is deleted
    expect(screen.queryByText("Learn React Testing")).not.toBeInTheDocument();
  });
});