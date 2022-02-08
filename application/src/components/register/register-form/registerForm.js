import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../../redux/actions/authActions";

const mapActionsToProps = (dispatch) => ({
  commenceRegister(email, password, confirmPassword) {
    return dispatch(registerUser(email, password, confirmPassword));
  },
});

class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    registerSuccess: false,
    registerError: "",
  };

  async register(e) {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ registerError: "Passwords do not match!" });
      return;
    }

    const emailRegex =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!this.state.email.match(emailRegex)) {
      this.setState({ registerError: "Invalid Email Input" });
      return;
    }

    const res = await this.props.commenceRegister(
      this.state.email,
      this.state.password,
      this.state.confirmPassword
    );

    if (!res.success) {
      this.setState({ registerError: res.error });
      return;
    }

    this.setState({ registerSuccess: true });

    // delay onRegister to show success message
    setTimeout(() => {
      this.props.onRegister();
    }, 1000);
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            placeholder="test@test.com"
            value={this.state.email}
            onChange={(e) => this.onChange("email", e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={this.state.password}
            onChange={(e) => this.onChange("password", e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPasswordConfirm">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPasswordConfirm"
            value={this.state.confirmPassword}
            onChange={(e) => this.onChange("confirmPassword", e.target.value)}
          ></input>
        </div>
        <div className="d-flex justify-content-center">
          <button
            onClick={(e) => this.register(e)}
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
        <br />
        {this.state.registerSuccess && (
          <div style={{ color: "green", textAlign: "center" }}>
            Register Success!
          </div>
        )}
        {this.state.registerError && !this.state.registerSuccess && (
          <div style={{ color: "red", textAlign: "center" }}>
            {this.state.registerError}
          </div>
        )}
      </form>
    );
  }
}

export default connect(null, mapActionsToProps)(RegisterForm);
