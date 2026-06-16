import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiStepForm from "../13-formik-yup/MultiStepForm";

describe("Multi Step Form", () => {
  test("renders form heading", () => {
    render(<MultiStepForm />);

    expect(
      screen.getByText(/account/i)
    ).toBeInTheDocument();
  });
});