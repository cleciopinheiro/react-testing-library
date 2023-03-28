import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const textOne = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    expect(textOne).toBeInTheDocument();

    const textTwo = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/);
    expect(textTwo).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma pokedex.', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toBeInTheDocument();

    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
