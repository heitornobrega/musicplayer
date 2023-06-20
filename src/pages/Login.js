import React from "react";
import { Redirect } from "react-router-dom";
import { createUser } from "../services/userAPI";
import Carregando from "./Carregando";
// import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    name: "",
    isLoginButtonDisabled: true,
    loading: false,
    loaded: false,
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    },  this.handleInputChange);
   
  };

  handleInputChange = () => {
    const { name } = this.state;
    const minLength = 2;
    const isInputAllowed = name.length >= minLength;
    if (isInputAllowed) {
      this.setState({
        isLoginButtonDisabled: false,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
      });
    }
  };

  userHandle = async (e) => {
    e.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    this.setState({loaded: true})
  };

  render() {
    const { name, isLoginButtonDisabled, loading, loaded } = this.state;
    return (
      <div className=" bg-gray-800 h-screen min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col">
            <a
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" fill="#4F46E5" />
                <path d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" fill="#4F46E5"/>
                <path d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" fill="#4F46E5"/>
                <path d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0ZM1 3v3h14V3H1Zm14 4H1v7h14V7Z" fill="#4F46E5"/>
              </svg>
            </a>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-50">
              Access your account
            </h2>
            {/* <p className="mt-2 text-center text-sm text-gray-600">
        Ou
        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> registre-se</a>
      </p> */}
          </div>
          <form className="mt-8 space-y-6" onSubmit={this.userHandle}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  // id="email-address"
                  name="name"
                  type="text"
                  value={name}
                  autoComplete="off"
                  onChange={this.onInputChange}
                  // autocomplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              {/* <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
        </div> */}
            </div>

            {/* <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
        </div>
      </div> */}

            <div>
              <button
                type="button"
                data-testid="login-submit-button"
                onClick={this.userHandle}
                disabled={isLoginButtonDisabled}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {loading ? <Carregando /> : "Login"}
              </button>
            </div>
          </form>
        </div>
        {loaded && <Redirect to="/search" />}
      </div>
    );
  }
}
// Login.propTypes = {
//   onInputChange: PropTypes.func.isRequired,
// };

export default Login;
