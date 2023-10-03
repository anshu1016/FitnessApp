import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/action.js";
const LoginComponent = () => {
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    dispatch(loginUser(email, password));
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-header bg-primary text-white text-center">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email address:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg btn-block mb-2 w-100 mt-2"
                  >
                    Login
                  </button>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block mb-2 w-100"
                  >
                    Login as Guest
                  </button>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-info btn-lg btn-block w-100"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
