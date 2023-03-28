import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testa os elementos da componente FavoritePokemons', () => {
  test('Teste se a página contém um titulo h2 com o texto "Favorite pokémons".', () => {
    const { getByRole } = renderWithRouter(<FavoritePokemon />);
    const tittle = getByRole('heading', {
      name: 'Favorite Pokémon',
      level: 2,
    });
    expect(tittle).toBeInTheDocument();
  });

  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFavorite = screen.getByText(/No favorite Pokémon found/i);
    expect(notFavorite).toBeInTheDocument();
  });
});
