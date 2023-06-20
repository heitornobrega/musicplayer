import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends React.Component {
  state = {
    carregando: false,
    favSongs: [],
  }

  componentDidMount() {
    this.setState({ carregando: true });
    this.recoverySongs();
    this.setState({ carregando: false });
  }

  recoverySongs = async () => {
    const recoveredSongs = await getFavoriteSongs();
    this.setState({ favSongs: recoveredSongs });
  }

  funcaTeste = (paramentro) => {
    const { favSongs } = this.state;
    const novaLista = favSongs
      .filter((elemento) => elemento.trackId !== paramentro.trackId);
    this.setState({ favSongs: novaLista });
  }

  render() {
    const { carregando, favSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {carregando && <Carregando />}
        {!carregando && (
          favSongs
            .map((elemento, idx) => (<MusicCard
              key={idx}
              artworkUrl100={elemento.artworkUrl100}
              collectionName={elemento.collectionName}
              trackName={ elemento.trackName }
              trackId={ elemento.trackId }
              previewUrl={ elemento.previewUrl }
              objInteiro={ elemento }
              funcaTeste={ this.funcaTeste }
            />))
        )}
      </div>
    );
  }
}

export default Favorites;
