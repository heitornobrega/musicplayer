import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbumCard from '../components/AlbumCard';
import MusicCard from '../components/MusicCard';
// import Carregando from './Carregando';

class Album extends React.Component {
  state = {
    album: [],
    loaded: false,
    collectionName: '',
    artworkUrl100: '',
    artistName: '',
    favWasClicked: true,
  }

  componentDidMount = () => {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const albuns = await getMusics(id);
    this.setState(
      {
        album: albuns,
        loaded: true,
        collectionName: albuns[0].collectionName,
        artworkUrl100: albuns[0].artworkUrl100,
        artistName: albuns[0].artistName,
      },
    );
  }

  render() {
    const { album, loaded, collectionName,
      artistName, artworkUrl100, favWasClicked } = this.state;

    return (
      <>
        <Header />
        {loaded && (
          <div data-testid="page-album">
            {favWasClicked && (
              album
                .filter(({ trackId }) => trackId)
                .map((element, idx) => (
                  <MusicCard
                    key={idx}
                    artworkUrl100={element.artworkUrl100}
                    collectionName={element.collectionName}
                    trackName={ element.trackName }
                    previewUrl={ element.previewUrl }
                    trackId={ element.trackId }
                    albuns={ element.albuns }
                    // favWasClicked={ element.favWasClicked }
                    objInteiro={ element }
                  />
                ))
            )}
          </div>
        )}
      </>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};
export default Album;
