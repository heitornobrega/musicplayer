import React from "react";
import { Link } from "react-router-dom";
import Carregando from "../pages/Carregando";
import { getUser } from "../services/userAPI";
import defaultUserPic from "../defaultUserPic.svg";
// import logo from '../logo.svg '

class Header extends React.Component {
  state = {
    userName: "",
    drawerIsOpen: false,
    onSearch: true,
    onFavorites: false,
    userImage: "",
    toggleUserMenu: false,
  };

  componentDidMount() {
    this.fetchUser();
    this.toggleSelected();
  }

  fetchUser = async () => {
    const { name, image } = await getUser();
    this.setState({
      userName: name,
      userImage: image,
    });
  };

  toggleDrawer = () => {
    const { drawerIsOpen } = this.state;
    drawerIsOpen
      ? this.setState({ drawerIsOpen: false })
      : this.setState({ drawerIsOpen: true });
  };

  toggleSelected = () => {
    const pathname = window.location.pathname;
    console.log(pathname);
    switch (pathname) {
      case "/favorites":
        this.setState({
          onSearch: false,
          onFavorites: true,
        });
        break;
      case "/profile":
        this.setState({
          onSearch: false,
          onFavorites: false,
        });
        break;
      default:
        this.setState({
          onSearch: true,
          onFavorites: false,
        });
    }
  };
  displayUserMenu = () => {
    const { toggleUserMenu } = this.state;
    this.setState({ toggleUserMenu: !toggleUserMenu });
  };
  render() {
    const {
      userName,
      drawerIsOpen,
      onFavorites,
      onSearch,
      userImage,
      toggleUserMenu,
    } = this.state;
    return (
      userName && (
        <nav class="bg-gray-800">
          <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-20">
            <div class="relative flex items-center justify-between h-16">
              <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  onClick={this.toggleDrawer}
                  type="button"
                  class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span class="sr-only">Open main menu</span>

                  <svg
                    class="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    class="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                  {/* <
              class="block lg:hidden h-8 w-auto"
              href="/search"
                  > */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0ZM1 3v3h14V3H1Zm14 4H1v7h14V7Z"
                      fill="#4F46E5"
                    />
                  </svg>

                  {/* <Link
                    class="hidden lg:block h-8 w-auto"
                    href="/musicplayer/#/search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                        fill="#4F46E5"
                      />
                      <path
                        d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                        fill="#4F46E5"
                      />
                      <path
                        d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
                        fill="#4F46E5"
                      />
                      <path
                        d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0ZM1 3v3h14V3H1Zm14 4H1v7h14V7Z"
                        fill="#4F46E5"
                      />
                    </svg>
                  </Link> */}
                  {/* <img
                  class="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                /> */}
                </div>
                <div class="hidden sm:block sm:ml-6">
                  <div class="flex space-x-4">
                    <Link
                      data-testid="link-to-search"
                      to="/search"
                      className={
                        onSearch
                          ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      {" "}
                      Search{" "}
                    </Link>
                    <Link
                      data-testid="link-to-favorites"
                      to="/favorites"
                      className={
                        onFavorites
                          ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      {" "}
                      Favorites{" "}
                    </Link>
                  </div>
                </div>
              </div>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                type="button"
                class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span class="sr-only">View notifications</span>

                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button> */}

                <div class="ml-3 relative">
                  {/* <div> */}
                  <button
                    data-testid="link-to-profile"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={this.displayUserMenu}
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      src={!userImage ? defaultUserPic : userImage}
                      alt=""
                    />
                  </button>
                  {/* </div> */}

                  <div
                    className={
                      !toggleUserMenu
                        ? "hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        : "block origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    }
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabindex="-1"
                  >
                    <Link
                      to="/profile"
                      class="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/"
                      class="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {drawerIsOpen && (
            <div className="sm:hidden" id="mobile-menu">
              <div class="px-2 pt-2 pb-3 space-y-1">
                <Link
                  data-testid="link-to-search"
                  to="/search"
                  href="#"
                  className={
                    onSearch
                      ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                  aria-current="page"
                >
                  Search
                </Link>
                <Link
                  data-testid="link-to-favorites"
                  to="/favorites"
                  href="#"
                  className={
                    onFavorites
                      ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                >
                  Favorites
                </Link>
              </div>
            </div>
          )}
        </nav>
      )
    );
  }
}

export default Header;
