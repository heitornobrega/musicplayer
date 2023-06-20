import React from 'react';

class Carregando extends React.Component {
  render() {
    return (
      < div class="flex justify-center items-center">
      <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-300" role="status">
      <span class="visually-hidden">Loading...</span>
          </div>
    </div>
  );
  }
}

export default Carregando;
