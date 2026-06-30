import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MultiStepForm from "../13-formik-yup/MultiStepForm";

describe("MultiStepForm", () => {
  test("completes the multi-step form", async () => {
    // Suppress window.alert during the test
    window.alert = vi.fn();
    
    render(<MultiStepForm />);

    // Step 1
    const firstNameInput = screen.getByPlaceholderText(/e.g. Jane/i);
    const lastNameInput = screen.getByPlaceholderText(/e.g. Doe/i);
    const continueButton = screen.getByRole("button", { name: /Continue/i });

    await userEvent.type(firstNameInput, "Harsh");
    await userEvent.type(lastNameInput, "Radadiya");
    await userEvent.click(continueButton);

    // Step 2
    const cityInput = await screen.findByPlaceholderText(/e.g. New York/i);
    const countryInput = screen.getByPlaceholderText(/e.g. United States/i);
    
    await userEvent.type(cityInput, "Ahmedabad");
    await userEvent.type(countryInput, "India");
    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    // Step 3
    const emailInput = await screen.findByPlaceholderText(/jane.doe@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    
    await userEvent.type(emailInput, "harsh@example.com");
    await userEvent.type(passwordInput, "password123");
    
    const submitButton = screen.getByRole("button", { name: /Complete Setup/i });
    await userEvent.click(submitButton);

    // Wait for form to reset (step 1 should be visible again)
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/e.g. Jane/i)).toBeInTheDocument();
    });
    
    expect(window.alert).toHaveBeenCalledWith("Form Submitted Successfully!");
  });

  test("shows validation errors on empty submission", async () => {
    render(<MultiStepForm />);
    const continueButton = screen.getByRole("button", { name: /Continue/i });
    await userEvent.click(continueButton);

    expect(await screen.findByText(/First Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Last Name is required/i)).toBeInTheDocument();
  });
});