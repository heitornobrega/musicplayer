import React from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

class AlbumCard extends React.Component {
  render() {
    const { collectionId, artworkUrl100, collectionName, artistName} =
      this.props;
    const location = window.location.href;
    return (
      <div className="flex flex-wrap p-4 justify-center items-center w-52">
        <div class="rounded-lg bg-gray-800 border border-gray-700 shadow-md flex flex-col justify-center items-center text-center text-ellipsis hover:border-gray-500 hover:scale-150 hover:transition">
          <Link to={`/album/${collectionId}`}>
            <img className="p-2" src={artworkUrl100} alt="" />
          </Link>
          <div class="flex flex-col justify-center px-2">
            <div className="flex flex-col whitespace-nowrap w-36 overflow-hidden text-ellipsis ">
              <h5 class="mb-2 text-2xl font-medium tracking-tight text-white whitespace-nowrap w-36 overflow-ellipsis overflow-hidden">
                {artistName}
              </h5>
            </div>
            <div className="flex flex-col whitespace-nowrap w-36 overflow-hidden text-ellipsis">
              <p class="mb-3 font-normal text-gray-400 whitespace-nowrap w-36 overflow-ellipsis overflow-hidden">
                {collectionName}
              </p>
            </div>
            <div className="whitespace-nowrap w-36 overflow-ellipsis overflow-hidden pb-4">
{              !location.includes('album') && <Link
                data-testid={`link-to-album-${collectionId}`}
                to={`/album/${collectionId}`}
                class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Listen now
                <svg
                  class="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AlbumCard.propTypes = {
  collectionId: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
export default AlbumCard;
