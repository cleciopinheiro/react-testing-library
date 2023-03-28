import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const btnNextTestId = 'next-pokemon';

describe('Teste os elementos do componente Pokedex', () => {
  test('Teste se a página contém um titulo h2 com o texto Encountered Pokémons.', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: /Encountered Pokémon/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Teste se os botões de cada tipo tem o data-testid="pokemon-type-button"', () => {
    renderWithRouter(<App />);
    const btnFindTestId = screen.getAllByTestId('pokemon-type-button');
    const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(btnFindTestId.length).toBe(allTypes.length);
  });

  test('Teste o botão para ir para o próximo pokemon.', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByTestId(btnNextTestId);
    expect(btnNextPokemon).toBeInTheDocument();
    expect(btnNextPokemon.innerHTML).toBe('Próximo Pokémon');
  });

  test('Ao clicar no botão, os próximos pokemons devem ser mostrados sucessivamente.', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);

    const btnNextPokemon = screen.getByTestId(btnNextTestId);
    userEvent.click(btnNextPokemon);

    const altTextImageChamander = screen.getByAltText('Charmander sprite');
    expect(altTextImageChamander).toBeInTheDocument();
    expect(altTextImageChamander.src).toBe('https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png');
  });

  test('Verifica se tem os botões de filtro dos tipos de pokemons o botão "Próximo pokémon" deve ficar desabilitado.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const typePokemon = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    typePokemon.forEach((type) => {
      const btnType = getByRole('button', { name: type });
      expect(btnType).toBeInTheDocument();
    });
  });

  test('Ao clicar nos filtros de "Electric", "Bug", "Poison", "Normal", "Dragon", verifica o botão "Próximo pokémon" deve ficar desabilitado.', () => {
    renderWithRouter(<App />);
    const typePokemon = ['Electric', 'Bug', 'Poison', 'Normal', 'Dragon'];
    const btnNextPokemon = screen.getByTestId(btnNextTestId);
    typePokemon.forEach((type) => {
      const btnType = screen.getByRole('button', { name: type });
      userEvent.click(btnType);
      expect(btnNextPokemon).toBeDisabled();
    });
  });

  test('Testa se tem um botão para resetar os filtros.', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    const btnDragon = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(btnDragon);
    expect(pokemonType).toHaveTextContent('Dragon');

    userEvent.click(btnAll);
    expect(pokemonType).toHaveTextContent('Electric');
  });
});

// describe('Testa a funcionalidade dos botões de filtragem', () => {
// });
