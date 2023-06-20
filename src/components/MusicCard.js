import React from "react";
import PropTypes from "prop-types";
import indigoHeart from '../indigoHeart.svg'
import whiteHeart from '../whiteHeart.svg'

import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from "../services/favoriteSongsAPI";
import Carregando from "../pages/Carregando";

class MusicCard extends React.Component {
  state = {
    favWasClicked: true,
    favorito: false,
  };

  componentDidMount() {
    this.recoverySongs();
    this.setState({ favWasClicked: true });
  }

  recoverySongs = async () => {
    const { trackId } = this.props;
    this.setState({ favWasClicked: false });
    const favList = await getFavoriteSongs();
    this.setState({
      favorito: favList.some((element) => element.trackId === trackId),
    });
  };

  onInputChange = (e) => {
    const { favorito } = this.state;
    const { objInteiro, funcaTeste } = this.props;
    this.setState(
      {
        favorito: !favorito,
      },
      async () => {
        if (!favorito) {
          this.setState({ favWasClicked: false });
          await addSong(objInteiro);
          this.setState({ favWasClicked: true });
        } else {
          this.setState({ favWasClicked: false });
          await removeSong(objInteiro);
          this.setState({ favWasClicked: true });
          if (funcaTeste) {
            funcaTeste(objInteiro);
          }
        }
      }
    );
  };

  render() {
    const { trackName, previewUrl, trackId, artworkUrl100, collectionName} = this.props;
    const { favorito, favWasClicked } = this.state;
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-2">
        <div className="flex w-full justify-around items-center border rounded-md">
        <div className='w-12'>
          <img src={artworkUrl100} alt={collectionName} className='rounded-md w-full'/>
        </div>
          <div className=" w-1/5 text-white">
          <span>{trackName}</span>
          </div>
          <div className="flex items-center p-1">
          <audio data-testid="audio-component" src={previewUrl} controls>
            <track kind="captions" className="bg-indigo-600" />
            <code className="bg-indigo-600">audio</code>
          </audio>
          {!favWasClicked ? (
            <Carregando />
          ) : (
            <label
              htmlFor={`checkbox-music-${trackId}`}
                data-testid={`checkbox-music-${trackId}`}
                className='text-white p-1'
            >
              <input
                    type="image"
                    alt="favorito"
                name={`checkbox-music-${trackId}`}
                id={`checkbox-music-${trackId}`}
                src={!favorito ? whiteHeart : indigoHeart}
                onClick={this.onInputChange}
              />
            </label>
            )}
            </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  funcaTeste: PropTypes.func,
  objInteiro: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
};

MusicCard.defaultProps = {
  funcaTeste: () => {},
};
export default MusicCard;
