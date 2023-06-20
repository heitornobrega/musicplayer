import React from "react";
import AlbumCard from "../components/AlbumCard";
import Header from "../components/Header";
import searchAlbumsAPI from "../services/searchAlbumsAPI";
import Carregando from "./Carregando";
import { createMemoryHistory } from "history";
import radioIcon from '../radioIcon.svg'

const history = createMemoryHistory();

class Search extends React.Component {
  state = {
    searchedMidia: "",
    isButtonDisabled: true,
    loaded: true,
    hasResult: false,
    reciviedMidia: "",
    storedSearch: "",
  };

  inputHandle = (e) => {
    const { searchedMidia } = this.state;
    this.setState({
      searchedMidia: e.target.value,
    });
    const isButtonEnabled = searchedMidia.length >= 1;
    if (isButtonEnabled) {
      this.setState({
        isButtonDisabled: false,
      });
    }
  };

  onClickHandle = async () => {
    const { searchedMidia } = this.state;
    this.setState({
      loaded: false,
      storedSearch: searchedMidia,
    });

    const fetchMidia = await searchAlbumsAPI(searchedMidia);
    this.setState({
      searchedMidia: "",
      loaded: true,
      hasResult: true,
      reciviedMidia: fetchMidia,
    });
  };

  render() {
    const {
      isButtonDisabled,
      searchedMidia,
      loaded,
      hasResult,
      storedSearch,
      reciviedMidia,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {!loaded ? (
          <Carregando />
        ) : (
          <div>     
              {!reciviedMidia && <div className="flex justify-center items-center mt-10 pb-8">
                <div className="h-36 w-36">
                <img src={radioIcon} alt="Icone" className="h-full w-full"/>
                </div>
              </div>}
            <div className="flex justify-center">
              <form class="flex items-center" onSubmit={this.onClickHandle}>
                <label for="simple-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-full">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    value={searchedMidia}
                    data-testid="search-artist-input"
                    onChange={this.inputHandle}
                    type="text"
                    autoComplete="off"
                    id="simple-search"
                    class="border text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-200 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for your artist"
                    required=""
                  />
                </div>
                <button
                  data-testid="search-artist-button"
                  onClick={this.onClickHandle}
                  disabled={isButtonDisabled}
                  type="button"
                  class="p-2.5 ml-2 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="flex justify-center flex-wrap mt-17 py-3">
          {hasResult && (
            <span className="text-white">{`Resultado de álbuns de: ${storedSearch}`}</span>
          )}
          <div className=" flex justify-center flex-wrap mt-18">
            {reciviedMidia ? (
              reciviedMidia.map(
                ({
                  collectionId,
                  artworkUrl100,
                  collectionName,
                  artistName,
                }) => (
                  <AlbumCard
                    key={collectionId}
                    collectionId={collectionId}
                    artworkUrl100={artworkUrl100}
                    collectionName={collectionName}
                    artistName={artistName}
                  />
                )
              )
            ) : (
              <span className="text-white"></span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
