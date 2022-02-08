import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";

import RegisterForm from "./registerForm";

describe("Register Form", () => {
  test("form renders", () => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );

    // there should be a properly labelled email field
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    // there should be a password field
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    // there should be a confirm password field
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();

    // there should be a login button
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("register prop fires", () => {
    const onRegister = jest.fn();

    render(
      <Provider store={store}>
        <RegisterForm onLogin={onRegister} />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onRegister).toHaveBeenCalled();
  });
});
