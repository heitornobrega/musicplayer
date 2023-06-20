import React from "react";
// import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import Header from "../components/Header";
import { getUser, updateUser } from "../services/userAPI";
import Carregando from "./Carregando";
import defaultUserPic from '../defaultUserPic.svg'

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    userName: "",
    userEmail: "",
    userImage: "",
    userDescription: "",
    isDisabled: true,
    // userUpdated: false,
  };

  componentDidMount = () => {
    this.callUser();
  };
  buttonCondition = () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    if (userName && userEmail && userImage && userDescription) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }
  inputHandle = (e) => {
    
    this.setState(
      {
        [e.target.name]: e.target.value,
      }, () =>  this.buttonCondition()
    );
  };

  updateUserAndRedirectPage = async () => {
    const { history } = this.props;
    const { userName, userEmail, userImage, userDescription } = this.state;
    const newInfo = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };
    await updateUser(newInfo);
    history.push("/profile");
  };

  callUser = async () => {
    this.setState({ loading: true });
    const { name, email, image, description } = await getUser();
    this.setState({
      loading: false,
      userName: name,
      userEmail: email,
      userImage: image,
      userDescription: description,
    });
  };

  render() {
    const {
      loading,
      userName,
      userEmail,
      userImage,
      userDescription,
      isDisabled,
    } = this.state;
    return (
      <>
        <Header />
        {/* <p>Editar perfil</p> */}
        {/* {userUpdated && <Redirect to="/profile" />} */}  
        {loading &&
          <div className="w-full h-screen flex justify-center">
            <Carregando />
          </div>
        }
        {!loading && (
          <>
            <div className="w-full h-screen flex justify-center">
              <div class="flex justify-center mt-15 h-screen">
                <div class="mt-5 md:mt-0 md:col-span-2">
                  <form action="#" method="POST">
                    <div class="shadow sm:rounded-md sm:overflow-hidden ">
                      <div class="px-4 py-5 bg-white space-y-6 sm:p-6 rounded-3xl ">
                        <div class="grid grid-cols-3 gap-6">
                          <div class="col-span-3 sm:col-span-2">
                            <label
                            class="block text-sm font-medium text-gray-700"
                            >
                              Name
                            </label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                              <input
                                value={userName}
                                type="text"
                                autoComplete="off"
                                name="userName"

                                class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                placeholder="Ex: Maria da Silva"
                                onChange={this.inputHandle}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="grid grid-cols-3 gap-6">
                          <div class="col-span-3 sm:col-span-2">
                            <label
                              class="block text-sm font-medium text-gray-700"
                            >
                              Email
                            </label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                              <input
                                value={userEmail}                         
                                type="text"
                                autoComplete="off"
                                name="userEmail"
                                class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                placeholder="Ex: email@email.com"   
                                onChange={this.inputHandle}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700"
                          >
                            {" "}
                            About{" "}
                          </label>
                          <div class="mt-1">
                            <textarea
                              value={userDescription}
                              id="userDescription"
                              autoComplete="off"
                              name="userDescription"
                              rows="3"
                              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Your bio"
                              onChange={this.inputHandle}
                            ></textarea>
                          </div>

                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">
                            {" "}
                            Photo{" "}
                          </label>
                          <div class="mt-1 flex items-center justify-between">
                            <div className="flex mr-3">
                            <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                              <img src={!userImage ? defaultUserPic : userImage} alt="" className="w-full h-full"/>
                            </span>
                              <input
                                value={userImage}
                                autoComplete="off"
                                name="userImage"
                                placeholder="Insert your profile photo link"
                                type="img"
                                accept="image/*"
                                onChange={this.inputHandle}
                              class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              </input>
                              </div>
                            <button
                              type="button"
                              disabled={isDisabled}
                              onClick={this.updateUserAndRedirectPage}
                              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
