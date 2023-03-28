import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

const pokemon = {
  id: 10,
  name: 'Caterpie',
  type: 'Bug',
  averageWeight: {
    value: '2.9',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/8/83/Spr_5b_010.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 30',
      map: 'https://archives.bulbagarden.net/media/upload/7/76/Johto_Route_30_Map.png',
    },
    {
      location: 'Johto Route 31',
      map: 'https://archives.bulbagarden.net/media/upload/2/2b/Johto_Route_31_Map.png',
    },
    {
      location: 'Ilex Forest',
      map: 'https://archives.bulbagarden.net/media/upload/a/ae/Johto_Ilex_Forest_Map.png',
    },
    {
      location: 'Johto National Park',
      map: 'https://archives.bulbagarden.net/media/upload/4/4e/Johto_National_Park_Map.png',
    },
  ],
  summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
};

describe('Teste os elementos da componente FavoritePokemons', () => {
  test('Teste se a página contém um titulo h2 com o texto "Favorite pokémons".', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [pokemon] } />);
    const title = screen.getByRole('heading', {
      name: 'Favorite Pokémon',
      level: 2,
    });
    const pokemonName = screen.getByText(pokemon.name);
    const pokemonType = screen.getByText(pokemon.type);

    expect(title).toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
  });

  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFavorite = screen.getByText(/No favorite Pokémon found/i);
    expect(notFavorite).toBeInTheDocument();
  });
});
