import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { getUser } from "../services/userAPI";
import Carregando from "./Carregando";
import defaultUserPic from '../defaultUserPic.svg'

class Profile extends React.Component {
  state = {
    loading: false,
    userName: "",
    userEmail: "",
    userDescription: "",
    userimage: "",
  };

  componentDidMount = () => {
    this.callUser();
  };

  callUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      loading: false,
      userName: user.name,
      userEmail: user.email,
      userDescription: user.description,
      userimage: user.image,
    });
  };

  render() {
    const { loading, userName, userEmail, userDescription, userimage } =
      this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <div>
            {loading ? (
              <Carregando />
            ) : (
              <>
                <div class="flex items-center mt-15 justify-center h-screen bg-gray-800 ">
                  <div class="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">
                    <img
                      class="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
                      src={!userimage ? defaultUserPic : userimage}
                      alt={userName}
                    />
                    <h1 class="text-lg text-gray-700"> {userName} </h1>
                    <h3 class="text-sm text-gray-400 "> {userEmail} </h3>
                    <p class="text-xs text-gray-400 mt-4">{userDescription}</p>
                    <Link to="/profile/edit">
                      <button class="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">
                        Edit profile
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
