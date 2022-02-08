import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/authActions";

const mapActionsToProps = (dispatch) => ({
  commenceLogin(email, password) {
    return dispatch(loginUser(email, password));
  },
});

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    loginSuccess: false,
    loginError: "",
  };

  async login(e) {
    e.preventDefault();

    if (!this.state.email || !this.state.password) {
      this.setState({ loginError: "Email and password are required fields" });
      return;
    }

    const res = await this.props.commenceLogin(
      this.state.email,
      this.state.password
    );

    if (!res.success) {
      this.setState({ loginError: res.error });
      return;
    }

    this.setState({ loginSuccess: true });

    // delay onLogin to show success message
    setTimeout(() => {
      this.props.onLogin();
    }, 1000);
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    return (
      <div
        style={{ display: "flex", flexFlow: "column nowrap", maxWidth: 250 }}
      >
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
          <div className="d-flex justify-content-center">
            <button
              onClick={(e) => this.login(e)}
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
        </form>
        <br />
        {this.state.loginSuccess && (
          <span style={{ color: "green", textAlign: "center" }}>
            Login Success!
          </span>
        )}
        {this.state.loginError && !this.state.loginSuccess && (
          <span style={{ color: "red", textAlign: "center" }}>
            {this.state.loginError}
          </span>
        )}
      </div>
    );
  }
}

export default connect(null, mapActionsToProps)(LoginForm);
