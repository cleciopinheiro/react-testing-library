import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste os elementos da componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir os detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);

    const linkDetailsPokemon = screen.getByRole('link', { name: /more details/i });

    expect(linkDetailsPokemon).toBeInTheDocument();
    expect(linkDetailsPokemon.href).toBe('http://localhost/pokemon/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(linkDetailsPokemon).toBeInTheDocument();

    userEvent.click(linkDetailsPokemon);
    expect(history.location.pathname).toBe('/pokemon/25');
  });

  test('Teste se tem um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(linkDetailsPokemon).toBeInTheDocument();

    userEvent.click(linkDetailsPokemon);
    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkFavorite);
    const isFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(isFavorite).toBeInTheDocument();
    expect(isFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(isFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
