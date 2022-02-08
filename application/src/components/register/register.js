import React, { Component } from "react";
import RegisterForm from "./register-form/registerForm";

class Register extends Component {
  render() {
    return (
      <div className="main-body">
        <h1 className="text-center">Register Screen</h1>
        <div className="d-flex justify-content-center mt-5">
          <RegisterForm
            onRegister={() => {
              this.props.history.push("/login");
            }}
          />
        </div>
      </div>
    );
  }
}

export default Register;
